const Post = require('../Models/postModel');
const mongoose = require('mongoose');


// Create Post Controller
exports.createPost = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Ensure the picture exists
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        // Log for debugging
        console.log("File received:", req.file);
        console.log("Request body:", req.body);

        // Create a new post instance
        const post = new Post({
            user: req.user._id,
            username: req.user.username,

            title,
            description,
            picture: `uploads/${req.file.filename}`, // Save the relative path of the uploaded file
        });

        // Save the post to the database
        await post.save();

        // Respond with success message
        res.status(201).json({ success: true, data: post });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: 'Failed to create post' });
    }
};


exports.getUserPosts = async (req, res) => {
    try {
        const userId = req.user._id; // Get user ID from the authenticated request
        const posts = await Post.find({ user: userId}); // Fetch posts for this user

        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};   

exports.getAllUserPosts = async(req, res)=>{
    try {
        const posts = await Post.find();
        res.status(200).json({
            success: true,
            data: posts
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.UserUpdatePost = async(req, res)=>{
    try {
        const postId = req.params.id;
        const updateData = req.body;
        const updatePost = await Post.findByIdAndUpdate(postId, updateData, {new: true});

        if(!updatePost){
            return res.status(404).json({message: "post not found"})
        }

        res.json({message: "post updated successfully", updatePost})

    } catch (error) {
        console.error('Error updating post:', error);
    res.status(500).json({ message: 'Failed to update post' });
    }
}



exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Failed to delete post' });
    }
};




