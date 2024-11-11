import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    task: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Tasks = mongoose.model('Tasks', taskSchema);
export default Tasks