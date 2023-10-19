//MERN A
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//MERN B
const path = require('path');

const PORT = process.env.PORT || 5102;
//MERN A
const app = express();


app.set('port', (process.env.PORT || 5102));


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

    const newUser = {
        login,
        password, // Assuming 'password' is a plain text password
        firstName,
        lastName
      };
      
      try {
        // Insert the new user into the 'Users' collection.
        const result = await db.collection('Users').insertOne(newUser);
      
        return res.status(201).json({ message: "Added to register Successfully" });
      } catch (err) {
        return res.status(500).json({ error: "failed to register data" });
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