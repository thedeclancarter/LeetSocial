require('express');
require('mongodb');
const axios = require('axios');
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const { graphql, buildSchema } = require('graphql');
const { ObjectId } = require('mongodb');

exports.setApp = function (app, client) {
    // Define the database to be used
    const db = client.db('leetsocial_db');
    const crypto = require('crypto');

    // *===========================================================*
    // |                            LOGIN                          |
    // *===========================================================*
    // Incoming: { email, password }
    // Outgoing: { firstName, lastName, id }
    app.post('/api/login', async (req, res, next) => {
        const { email, password } = req.body;

        const user = await db.collection('loginInfo').findOne({ email, password });

        // Return Error in the case of invalid credentials/failure to verify
        if (!user)
            return res.status(401).json({ error: 'Invalid credentials' });
        else if (!user.verified)
            return res.status(401).json({ error: 'Account not verified' });

        const nameInfo = await db.collection('userInfo').findOne({ loginInfoId: user._id.toString() });
        if (!nameInfo)
            return res.status(404).json({ error: 'User information not found' });

        // Set the response header to include the JWT token
        const { _id: id } = user;
        const { firstName, lastName } = nameInfo;
        const token = require("./createJWT.js").createToken(firstName, lastName, id);

        res.status(200).json(token);
    });

    // *===========================================================*
    // |                            Sign-Up                        |
    // *===========================================================*
    // Incoming: { email, password, firstName, lastName }
    // Outgoing: { status }
    app.post('/api/signup', async (req, res) => {
        const { email, password, firstName, lastName } = req.body;

        // Check if the email already exists in the database
        const existingUser = await db.collection('loginInfo').findOne({ email });

        // If a user with the same email already exists, return an error.
        if (existingUser)
            return res.status(409).json({ error: 'Email already exists' });

        // Loop until a unique hash is generated
        let hash;
        let existingHash;
        do
        {
            // Generate a random set of bytes
            const randomBytes = crypto.randomBytes(16);

            // Create a SHA-256 hash of the random bytes
            hash = crypto.createHash('sha256').update(randomBytes).digest('hex');

            // Check if the hash exists in the database
            existingHash = await db.collection('loginInfo').findOne({ "verificationToken": hash });
        } while (existingHash);

        const newUser = {
            email,
            password, // Assuming 'password' is a plain text password
            "verified": false,
            "verificationToken": hash
        };

        try {
            // Insert the new user into the 'loginInfo' collection.
            const result = await db.collection('loginInfo').insertOne(newUser);
            const loginInfoId = result.insertedId.toString();

            // Archetype for the 'userInfo' collection
            const userInfo =
            {
                loginInfoId,
                firstName,
                lastName,
                following: [],
                leetCodeUsername: "",
            };

            // Insert the new user into the 'userInfo' collection.
            await db.collection('userInfo').insertOne(userInfo);
        } catch (err) {
            return res.status(500).json({ error: "failed to register data" });
        }

        try{
            // Send a Verification email to the user
            const formData = require('form-data');
            const Mailgun = require('mailgun.js');
            const mailgun = new Mailgun(formData);
            const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

            // Format the email content
            var htmlContent = `
                <h1> Hello, ${firstName}!</h1>
                Please click on the following link to verify your email:
                <a href="http://LeetSocial.com/verify?token=${hash}">Verify Email</a>`;
            // <a href="http://localhost:3000/verify?token=${hash}">Verify Email</a>`;

            await mg.messages.create('leetsocial.com', {
                from: "Post Master General <postmaster@leetsocial.com>",
                to: [email],
                subject: "Verification Email",
                html: htmlContent
            });

            return res.status(201).json({ message: "Added to register Successfully / Email Verification Sent" });
        } catch (err) {
            return res.status(500).json({ error: "failed to send verification email" });
        }

    });

    // *===========================================================*
    // |                     Verify Sign-up Hash API               |
    // *===========================================================*
    // Incoming: { token, leetCodeUsername }
    // Outgoing: { status }
    app.post('/api/verify', async (req, res) => {
        const { token, leetCodeUsername } = req.body;
        let loginInfo;

        try {
            // Fetch the user's loginInfo
            loginInfo = await db.collection('loginInfo').findOne({ "verificationToken": token }, { projection: { _id: 1, verified: 1 } });
            if (!loginInfo) {
                return res.status(500).json({ error: "Failed to Find Verification Hash" });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error occurred" });
        }

        if (loginInfo.verified === true) {
            return res.status(500).json({ error: "User Already Authenticated" });
        }

        try {
            // Update the user's leetCodeUsername
            await db.collection('userInfo').updateOne({ "loginInfoId": loginInfo._id.toString() }, { $set: { leetCodeUsername } });

            // Update the user's verification status
            await db.collection('loginInfo').updateOne({ _id: loginInfo._id }, { $set: { "verified": true } });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to Update User Data" });
        }

        // **** TO-DO: Update leetCodeInfo collection with user's leetCodeUsername and info ****

        res.status(200).json({ message: "Successfully Verified!" });
    });

    // *===========================================================*
    // |                Request Password Change API                |
    // *===========================================================*
    // Incoming: { loginInfoId }
    // Outgoing: { status }
    app.post('/api/requestPasswordChange', async (req, res) => {
        const { loginInfoId } = req.body;

        let document;

        try {
            // Verify the user's exists
            document = await db.collection('loginInfo').findOne({ _id: new ObjectId(loginInfoId) });
            if (!document) {
                return res.status(500).json({ error: "Failed to Find Verification Hash" });
            }
        } catch (err) {
            return res.status(500).json({ error: "Database error occurred" });
        }

        if (document.verified === false) {
            return res.status(500).json({ error: "User Not Verified" });
        }

        try{
            // Send a Forgot Password email to the user
            const formData = require('form-data');
            const Mailgun = require('mailgun.js');
            const mailgun = new Mailgun(formData);
            const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

            // Format the email content
            var htmlContent = `
                <h1> Hello! </h1>
                Please click on the following link to reset your password:
                <a href="http://LeetSocial.com/forgotPassword?token=${document.verificationToken}">Verify Email</a>`;
            // <a href="http://localhost:3000/verify?token=${hash}">Verify Email</a>`;

            await mg.messages.create('leetsocial.com', {
                from: "Post Master General <postmaster@leetsocial.com>",
                to: [document.email],
                subject: "Forgot Password; LeetSocial",
                html: htmlContent
            });

            return res.status(200).json({ message: "Added to Password Reset Sent" });
        } catch (err) {
            return res.status(500).json({ error: "failed to send verification email" });
        }
    });

    // *===========================================================*
    // |                     Forgot Password API                   |
    // *===========================================================*
    // Incoming: { token, newPassword}
    // Outgoing: { status }
    app.post('/api/changePassword', async (req, res) => {
        const { token, newPassword } = req.body;
        let loginInfo;

        try {
            // Fetch the user's loginInfo
            loginInfo = await db.collection('loginInfo').findOne({ "verificationToken": token }, { projection: { _id: 1, verified: 1 } });
            if (!loginInfo) {
                return res.status(500).json({ error: "Failed to Find Verification Hash" });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error occurred" });
        }

        if (loginInfo.verified === false) {
            return res.status(500).json({ error: "User Not Verified" });
        }

        try {
            // Update the user's password
            await db.collection('loginInfo').updateOne({ _id: loginInfo._id }, { $set: { "password": newPassword } });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to Update User Data" });
        }

        res.status(200).json({ message: "Successfully Updated Password!" });
    });

    // *===========================================================*
    // |                     View Profile API                      |
    // *===========================================================*
    // Incoming: { userId }
    // Outgoing: { firstName, lastName, leetCodeUsername, following, topLanguages, solvedCount }
    app.post('/api/viewProfile', async (req, res) => {
        const { userId } = req.body;

        let userInfo;

        try {
            // Fetch the user's userInfo
            userInfo = await db.collection('userInfo').findOne({ "loginInfoId": userId });
            if (!userInfo) {
                return res.status(500).json({ error: "Failed to Find User Info" });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error occurred" });
        }

        // Fetch the user's leetCodeInfo
        const leetCodeInfo = await axios.post('/api/query', { "username": userInfo.leetCodeUsername });
        if (!leetCodeInfo) {
            return res.status(500).json({ error: "Failed to Find LeetCode Info" });
        }
        const leetCodeProblems = await axios.post('/api/userSolvedCount', { "username": userInfo.leetCodeUsername });
        if (!leetCodeProblems) {
            return res.status(500).json({ error: "Failed to Find LeetCode Info" });
        }

        // Fetch the user's following
        const following = userInfo.following;

        // Fetch the user's topLanguages
        const topLanguage = leetCodeInfo.data.languageName;
        const topLanguageCount = leetCodeInfo.data.problemsSolved;

        // Fetch the user's solvedCount
        const solvedCount = leetCodeProblems.data;

        // Format the response
        const response = {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            leetCodeUsername: userInfo.leetCodeUsername,
            following,
            topLanguage,
            topLanguageCount,
            solvedCount
        };

        res.status(200).json(response);
    });

    // *===========================================================*
    // |                     Add Friend API                        |
    // *===========================================================*
    // Incoming: { userId, friendId }
    // Outgoing: { status }
    app.post('/api/addFriend', async (req, res) => {
        const { userId, friendId } = req.body;

        let userInfo;

        try {
            // Fetch the user's userInfo
            userInfo = await db.collection('userInfo').findOne({ "loginInfoId": userId });
            if (!userInfo) {
                return res.status(500).json({ error: "Failed to Find User Info" });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error occurred" });
        }

        // Fetch the user's following
        const following = userInfo.following;

        // If the friend is already in the user's following, return an error
        if (following.includes(friendId)) {
            return res.status(500).json({ error: "Friend Already Added" });
        }

        try {
            // Update the user's following
            await db.collection('userInfo').updateOne({ "loginInfoId": userId }, { $push: { following: friendId } });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to Update User Data" });
        }

        res.status(200).json({ message: "Successfully Added Friend!" });
    });

    // *===========================================================*
    // |                     Search Friend API                     |
    // *===========================================================*
    // Incoming: { userId, searchString } (FirstName, lastName, or leetCodeUsername)
    // Outgoing: { Array of { firstName, lastName, leetCodeUsername, userId } }
    app.post('/api/searchFriends', async (req, res) => {
        const { userId, searchString } = req.body;

        let userInfo;

        try {
            // Fetch the user's userInfo
            userInfo = await db.collection('userInfo').findOne({ "loginInfoId": userId });
            if (!userInfo) {
                return res.status(500).json({ error: "Failed to Find User Info" });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error occurred" });
        }

        // Fetch the user's following
        const following = userInfo.following;
        let response;

        // If the searchString is empty, return the user's following
        if (!searchString || searchString === "") {
            // Fetch the user's friends' info
            const friendsInfo = await db.collection('userInfo').find({ loginInfoId: { $in: following } }).toArray();

            // Format the response
            response = friendsInfo.map((friend) => {
                return {
                    firstName: friend.firstName,
                    lastName: friend.lastName,
                    leetCodeUsername: friend.leetCodeUsername,
                    userId: friend.loginInfoId
                };
            });
        }
        // If the searchString is not empty, return the user's following that match the searchString
        else {
            // Fetch the user's friends' info
            const friendsInfo = await db.collection('userInfo').find({ $and: [{ $or: [{ firstName: { $regex: searchString, $options: 'i' } }, { lastName: { $regex: searchString, $options: 'i' } }, { leetCodeUsername: { $regex: searchString, $options: 'i' } }] }, { loginInfoId: { $in: following } }] }).toArray();

            // Format the response
            response = friendsInfo.map((friend) => {
                return {
                    firstName: friend.firstName,
                    lastName: friend.lastName,
                    leetCodeUsername: friend.leetCodeUsername,
                    userId: friend.loginInfoId
                };
            });
        }

        res.status(200).json(response);
    });


    // *===========================================================*
    // |                     Remove Friend API                     |
    // *===========================================================*
    // Incoming: { userId, friendId }
    // Outgoing: { status }
    app.post('/api/removeFriend', async (req, res) => {
        const { userId, friendId } = req.body;

        let userInfo;

        try {
            // Fetch the user's userInfo
            userInfo = await db.collection('userInfo').findOne({ "loginInfoId": userId });
            if (!userInfo) {
                return res.status(500).json({ error: "Failed to Find User Info" });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error occurred" });
        }

        // Fetch the user's following
        const following = userInfo.following;

        // If the friend is not in the user's following, return an error
        if (!following.includes(friendId)) {
            return res.status(500).json({ error: "Friend Not Found" });
        }

        try {
            // Update the user's following
            await db.collection('userInfo').updateOne({ "loginInfoId": userId }, { $pull: { following: friendId } });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to Update User Data" });
        }

        res.status(200).json({ message: "Successfully Removed Friend!" });
    });

    // *===========================================================*
    // |                     Search Users API                      |
    // *===========================================================*
    // Incoming: { searchString } (FirstName, lastName, or leetCodeUsername)
    // Outgoing: { Array of { firstName, lastName, leetCodeUsername, userId } }
    app.post('/api/searchUsers', async (req, res) => {
        const { searchString } = req.body;
        // If String is empty, return empty array
        if (!searchString || searchString === "") {
            res.status(500).json({ error: "No Search String" });
            return;
        }

        // Fetch the user's userInfo
        const userInfo = await db.collection('userInfo').find({ $or: [{ firstName: { $regex: searchString, $options: 'i' } }, { lastName: { $regex: searchString, $options: 'i' } }, { leetCodeUsername: { $regex: searchString, $options: 'i' } }] }).toArray();

        // Format the response
        const response = userInfo.map((user) => {
            return {
                firstName: user.firstName,
                lastName: user.lastName,
                leetCodeUsername: user.leetCodeUsername,
                userId: user.loginInfoId
            };
        });

        res.status(200).json(response);
    });

    // *===========================================================*
    // |                     Test Email API                        |
    // *===========================================================*
    // app.post('/api/testEmail', async (req, res) => {
    //     const formData = require('form-data');
    //     const Mailgun = require('mailgun.js');
    //     const mailgun = new Mailgun(formData);
    //     const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });
    //     mg.messages.create('leetsocial.com', {
    //         from: "Post Master General <postmaster@leetsocial.com>",
    //         to: ["XXX@gmail.com"],
    //         subject: "Verification Email",
    //         text: "Testing some Mailgun awesomeness!",
    //         html: "<h1>Testing some Mailgun awesomeness!</h1>"
    //     })
    //         .then(msg => console.log(msg)) // logs response data
    //         .catch(err => console.log(err)); // logs any error
    // });


    //---------------------------------------------------------------------------------------------------------------------\\
    // Define your GraphQL schema
    const leetcodeAPI = 'https://leetcode.com/graphql/';

    app.post('/api/query', async (req, res) => {
        try {
            // Get the username from the request body
            const { username } = req.body;

            // Prepare the GraphQL query
            const graphqlQuery = `
                query languageStats($username: String!) {
                    matchedUser(username: $username) {
                        languageProblemCount {
                            languageName
                            problemsSolved
                        }
                    }
                }
            `;

            // Make a request to the other API with the provided username and query
            const response = await axios.post(leetcodeAPI, {
                query: graphqlQuery,
                variables: { username },
            });

            const languageStats = response.data.data.matchedUser.languageProblemCount;
            const maxSolved = Math.max(...languageStats.map(lang => lang.problemsSolved));
            const maxSolvedLanguage = languageStats.find(lang => lang.problemsSolved === maxSolved);

            res.json(maxSolvedLanguage);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to query the API' });
        }
    });


    app.post('/api/userSolvedCount', async (req, res) => {
        try {
            const { username } = req.body;

            const graphqlQuery = `
                query userProblemsSolved($username: String!) {
                    allQuestionsCount {
                        difficulty
                        count
                    }
                    matchedUser(username: $username) {
                        problemsSolvedBeatsStats {
                            difficulty
                            percentage
                        }
                        submitStatsGlobal {
                            acSubmissionNum {
                                difficulty
                                count
                            }
                        }
                    }
                }
            `;

            const response = await axios.post(leetcodeAPI, {
                query: graphqlQuery,
                variables: { username },
            });

            const problemCounts = response.data.data.matchedUser.submitStatsGlobal.acSubmissionNum;

            const answer = {
                all: 0,
                easy: 0, // Set the initial count to 0 for each difficulty level
                medium: 0,
                hard: 0
            };

            // Update counts based on the response
            problemCounts.forEach((difficultyCount) => {
                const { difficulty, count } = difficultyCount;
                if (difficulty === 'Easy') {
                    answer.easy = count;
                } else if (difficulty === 'Medium') {
                    answer.medium = count;
                } else if (difficulty === 'Hard') {
                    answer.hard = count;
                } else if (difficulty === "All") {
                    answer.all = count;
                }
            });

            res.json(answer);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to query the API' });
        }
    });





    };


