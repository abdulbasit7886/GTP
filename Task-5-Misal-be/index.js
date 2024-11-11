const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const mongoose = require('mongoose')
const User = require('./Models/userSchema')
const Task = require('./Models/taskSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'Paki47tan'
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.listen(3000, () => {
    console.log('port running')
})

mongoose.connect('mongodb://localhost:27017/task-5-be')
    .then(() => {
        console.log('Database connection successful');
    })
    .catch((err) => {
        console.log('Database connection error:', err);
    });

async function authenticateToken(req, res, next) {
    let token = req.headers.token
    let parsedToken = JSON.parse(token)
    console.log('helllo', parsedToken)
    if (parsedToken) {
        let decoded = jwt.verify(parsedToken, secretKey)
        console.log('decode', decoded)
        let user = await User.findOne({ email: decoded.email })
        console.log('user', user)
        if (!user) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user
        console.log('authentication completed')
        next()
    }
    else {
        return res.status(401).json({
            message: 'Token is required'
        })
    }
}
app.post('/signup', async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists with this email" });
        }
        password = await bcrypt.hash(password, 10);
        user = new User({ name, email, password });
        await user.save();
        return res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    console.log(user.password, password.toString())
    if (user) {
        const matchPassword = await bcrypt.compare(password.toString(), user.password);
        console.log(matchPassword, '======')
        if (user.email === email && matchPassword) {
            const token = jwt.sign({ email: email }, secretKey);
            await user.updateOne({ authToken: token })
            return res.status(200).json({
                message: 'Logged in successfully',
                token
            })
        } else {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }
    } else {
        return res.status(401).json({
            message: "Email doesn't exist"
        })
    }
}) 

app.post('/createTodo', authenticateToken, async (req, res) => {
    try {
        let user = req.user;
        console.log(user, '=====')
        let { taskName, taskDescription } = req.body;
        let task = new Task({ taskName, taskDescription, author: user._id });
        await task.save();
        return res.status(201).json({ message: "Task created successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
})

app.get('/taskList', authenticateToken, async (req, res) => {
    try {
        const user = req.user
        let tasks = await Task.find({ author: user._id });
        return res.status(200).json(tasks);
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}) 

app.patch('/updateTask/:taskId', authenticateToken, async(req,res)=>{
    try{
        const user = req.user
        const taskId = req.params.taskId
        let {taskName, taskDescription} = req.body
        await Task.updateOne({_id:taskId, author:user._id},{$set:{taskName,taskDescription}})
        return res.status(200).json({message:"Task updated successfully"})
    }catch(err){
        return res.status(500).json({message:"Server error", error:err.message})
    }
 
})

app.delete('/deleteTask/:taskId',authenticateToken,async(req,res)=>{
    try{
        const user = req.user
        const taskId = req.params.taskId
        await Task.deleteOne({_id:taskId, author:user._id})
        return res.status(200).json({message:"Task deleted successfully"})
    }catch(err){
        return res.status(500).json({message:"Server error", error:err.message})
    }
})

