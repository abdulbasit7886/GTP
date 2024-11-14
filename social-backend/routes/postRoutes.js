const express = require('express');
const { createPost, getUserPosts, UserUpdatePost, deletePost } = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Create Post Route
router.post('/create', protect, createPost);

router.get('/my-posts', protect, getUserPosts);
router.put('/my-posts/update/:id', protect, UserUpdatePost);
router.delete('/my-posts/delete/:id', protect, deletePost);


module.exports = router;

// http://localhost:5000/api/posts/my-posts/update
