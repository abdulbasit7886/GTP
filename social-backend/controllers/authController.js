const User = require('../Models/userModel');

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

// Signup Controller
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Login Controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id , username: user.username}, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



//get all that is register
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); 
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        console.error('Error in getAllUsers:', error.message); // Log the error
        res.status(500).json({ success: false, message: error.message });
    }
};




