const { type } = require('express/lib/response');
const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['teacher', 'student'],
    default: 'student',
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verificationToken: {
    type: String,
  },
  isVerified: {
    type: Boolean, 
    default: false,
  },
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
