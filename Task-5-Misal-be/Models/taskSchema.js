const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: false,
        minlength:5,
    },
    taskDescription: {
        type: String,
        required: true,
        minlength:5,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;