const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true, // Index for faster queries
    },

    username:{
        type:String,
        ref: 'User'
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    
    picture: {
        type: String,
      
    },
}, { timestamps: true }); 

module.exports = mongoose.model('Post', postSchema);
