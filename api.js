require('express');
require('mongodb');
const axios = require('axios');
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


