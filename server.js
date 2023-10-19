//MERN A
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//MERN B
const path = require('path');
const PORT = process.env.PORT || 5102;

//MERN A
const app = express();

//MERN B
app.set('port', (process.env.PORT || 5102));

//MERN B
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}


//MERN A
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

//MERN A
app.post('/api/login', async (req, res, next) => {
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
    var error = '';
    const { login, password } = req.body;
    const db = client.db('Test');
    const results = await db.collection('Users').find({ Login: login, Password: password }).toArray();
    var id = -1;
    var fn = '';
    var ln = '';
    if (results.length > 0) {
        id = results[0].id;
        fn = results[0].firstName;
        ln = results[0].lastName;
    }
    var ret = { id: id, firstName: fn, lastName: ln, error: '' };
    res.status(200).json(ret);
});


//ADDED SIGNUP API
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

    // If the username is unique, create a new user in the database.
    const newUser = {
        login,
        password, // You should hash and salt the password for security.
        firstName,
        lastName
    };

    // Insert the new user into the 'Users' collection.
    const result = await db.collection('Users').insertOne(newUser);

    if (result.insertedCount === 1) {
        // User registration was successful.
        res.status(201).json({ message: 'User registered successfully' });
    } else {
        // If the insertion failed, return an error.
        res.status(500).json({ error: 'User registration failed' });
    }
});


//MERN B
require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect();

//MERN B
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});

//MERN B
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}