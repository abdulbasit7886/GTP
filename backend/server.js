import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';


// Importing Necessary Files

import connectionToDb from './controllers/db-connect.js';
import taskRoutes from './routes/createTasks.js'
import dbCleaner from './middleware/cron.js';
import userRoutes from './routes/auth.js'

// Setting Cors Options

const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
};

// Generating App and setting middlewares

const app = express();
app.use(express.json());
dotenv.config();
app.use(cookieParser());
app.use(cors(corsOptions));


// Necessary Variables

const port = process.env.PORT;

// Database Connection

connectionToDb();


// Database Cleaner Middleware

dbCleaner.start();


// Routes goes here

app.use('/auth', userRoutes);
app.use('/tasks', taskRoutes);


// Port Listening Server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
