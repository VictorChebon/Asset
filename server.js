const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // or 'bcrypt' if you're using bcrypt
const User = require('./models/user'); // Import the User model
const FormDataModel = require('./models/FormData');
const authorize = require('./middlewares/authorize');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dotenv = require('dotenv').config();

const app = express();
const port = 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'grafdksAFCW4564WQW>REFQ890UH56746$N',
  saveUninitialized: true
}));

// Connect to MongoDB
mongoose.connect('mongodb+srv://kibev:GAI9iqIp2OPQhqd4@cluster0.fv5dq.mongodb.net/')
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
// Serve static files 
app.use(express.static(path.join(__dirname, 'public'))); // Use path.join here

app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.get('/signup', (req, res) => {
    res.render('signup', { message: '' }); 
});

app.post('/signup', async (req, res) => {
    try {
        const { username, password, email, role } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('signup', {
                message: 'Username already exists',
                username: username || '',
                role: role || 'student'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const user = new User({ username, password: hashedPassword, role , email, verificationToken, isVerified: false});
        await user.save();

        const verificationUrl = `http://localhost:${port}/verify/${verificationToken}`;
        await transporter.sendMail({
            to: email,
            subject: 'Email Verification',
            html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`
        });

        res.render('message', {
            message: 'A verification email has been sent to your email address. Please click the link in the email to verify your account.'
        });

        const transporter = nodemailer.createTransport({
            service: gmail,
            auth: {
                user: 'victorkibe360@gmail.com',
                pass: 'Mpesa123@'
            }
        });

        req.session.user = user;
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.redirect('/signup?message=An%20error%20occurred%20during%20signup');
    }
});

app.get('/verify/:token', async (req, res) => {
    try {
        const user = await User.findOne({ verificationToken: req.params.token });

        if (!user) {
            return res.status(404).send('User not found or already verified');
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.send('Email verified successfully! You can now log in.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Initial route
app.get('/', (req, res) => {
  res.redirect('/form');
});

// Form route
app.get('/form', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('form', { username: req.session.user.username });
});

app.post('/submit', async (req, res) => {
    try {
        const { name, email, serial } = req.body;
        const newData = new FormDataModel({ name, email, serial });
        await newData.save();
        res.redirect('/table');
    } catch (error) {
        console.error('Error processing form submission', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/table', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const data = await FormDataModel.find();
        res.render('table', { data: data, user: req.session.user });
    } catch (error) {
        console.error('Error fetching data', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/delete/:id', authorize('teacher'), async (req, res) => {
    try {
        await FormDataModel.findByIdAndDelete(req.params.id); 
        res.redirect('/table');
    } catch (error) {
        console.error('Error deleting record', error);
        res.status(500).send('Internal Server Error');
    }
});

// Login page route
app.get('/login', (req, res) => {
  res.render('login', { message: req.query.message || '' });
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.redirect('/login?message=Invalid%20credentials');
        }
        req.session.user = {
            id: user._id,
            username: user.username,
            role: user.role
        }; // Store user in session
        res.redirect('/form');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // Redirect with error message
    }
});

// Route to view data table
app.get('/data', (req, res) => {
  if (req.session.user) {
    res.redirect('/form'); // Redirect to form page if user is logged in
  } else {
    res.redirect('/login'); // Redirect to login page if user is not logged in
  }
});

// Logout page route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/login');
        }
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
