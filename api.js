require('express');
require('mongodb');

exports.setApp = function (app, client) {
    app.post('/api/login', async (req, res, next) => {
        // incoming: login, password
        // outgoing: id, firstName, lastName, error
        var error = '';
        const { login, password } = req.body;
        const db = client.db('Test');
        const results = await db.collection('Users').find({ login: login, password: password }).toArray();
        var id = -1;
        var fn = '';
        var ln = '';
        if (results.length > 0) {
            id = results[0]._id;
            fn = results[0].firstName;
            ln = results[0].lastName;
        }

        // Create a JWT token to store login data
        const token = require("./createJWT.js");
        ret = token.createToken( fn, ln, id );

        res.status(200).json(ret);
    });

    app.post('/api/signup', async (req, res) => {
        // Incoming: username, password, firstName, lastName
        const { login, password, firstName, lastName } = req.body;

        const db = client.db('Test');
        // Check if the username already exists in the database (assuming you want unique usernames).
        const existingUser = await db.collection('Users').findOne({ login });

        if (existingUser) {
            // If a user with the same username already exists, return an error.
            return res.status(400).json({ error: 'Username already exists' });
        }

        const newUser = {
            login,
            password, // Assuming 'password' is a plain text password
            firstName,
            lastName
        };

        try {
            // Insert the new user into the 'Users' collection.
            await db.collection('Users').insertOne(newUser);
            var ret = {}
            return res.status(201).json({ message: "Added to register Successfully" });
        } catch (err) {
            return res.status(500).json({ error: "failed to register data" });
        }

    });
}