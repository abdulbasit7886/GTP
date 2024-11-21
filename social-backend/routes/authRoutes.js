const express = require('express');
const authController = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Signup Route
router.post('/signup', authController.signup);

// Login Route
router.post('/login', authController.login);

//get all users
// router.get('/allUsers', authController.getAllUsers);
router.get('/allUsers',protect, authController.getAllUsers);



module.exports = router;
