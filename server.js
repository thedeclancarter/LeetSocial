// Imports necessary for setting up the Express application
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Imports for file path manipulation and environment variables
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 5102; // Default port number or from environment variables
const app = express();

// Set up the port for the server
app.set('port', PORT);

// If the application is running in production mode, use the build directory as a static folder
// and handle any other route by sending the React index.html file.
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

// Middleware setup
app.use(cors());  // Enable Cross-Origin Resource Sharing for all routes
app.use(bodyParser.json());  // Parse incoming JSON requests

// Set up headers for CORS to handle security during development
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

// Connect to MongoDB using the connection URI from environment variables
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect();

// Connect API.js to the server
var api = require('./api.js');
api.setApp( app, client );

// Start the server
app.listen(PORT, () => {
    // console.log('Server listening on port ' + PORT); // Debugging
});
