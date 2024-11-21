const express = require('express');
const { createPost, getUserPosts, UserUpdatePost, deletePost, getAllUserPosts } = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');
const upload = require('../multer'); // Import multer configuration

const router = express.Router();

// Create Post Route
// router.post('/create', protect, upload.single('postPicture'), createPost);
router.post('/create', protect, upload.single('postPicture'), createPost);

router.get('/my-posts', protect, getUserPosts);
router.get('/allPosts', protect, getAllUserPosts);
router.put('/my-posts/update/:id', protect, UserUpdatePost);
router.delete('/my-posts/delete/:id', protect, deletePost);

module.exports = router;
