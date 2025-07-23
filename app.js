
require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;


mongoose.set('strictQuery', false);

const uri = "mongodb://localhost:27017";

mongoose.connect(uri,{'dbName':'SocialDB'});

const User = mongoose.model('User', { username: String, email: String, password: String });
const Post = mongoose.model('Post', { userId: mongoose.Schema.Types.ObjectId, text: String });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: SECRET_KEY, resave: false, saveUninitialized: true, cookie: { secure: false } }));


// Insert your authenticateJWT Function code here.
function authenticateJWT(req, res, next) {
    // Get token from session
    const token = req.session.token;

    // If no token, return 401 Unauthorized
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        // Verify token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Attach user data to request
        req.user = decoded;

        // Continue to the next middleware
        next();
    } catch (error) {
        // If invalid token, return 401
        return res.status(401).json({ message: 'Invalid token' });
    }
}

// Insert your requireAuth Function code here.
function requireAuth(req, res, next) {
    const token = req.session.token;  // Retrieve token from session

    if (!token) return res.redirect('/login');  // If no token, redirect to login page

    try {
        const decoded = jwt.verify(token, SECRET_KEY);  // Verify the token using the secret key
        req.user = decoded;  // Attach decoded user data to the request
        next();  // Pass control to the next middleware/route
    } catch (error) {
        return res.redirect('/login');  // If token is invalid, redirect to login page
    }
}



app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
