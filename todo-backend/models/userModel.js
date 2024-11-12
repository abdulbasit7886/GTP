const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Ensure 'username' is required and unique
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


module.exports = mongoose.model('User', userSchema);
