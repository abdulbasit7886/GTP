const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();
connectDB();

app.use(cors({
    origin: 'http://localhost:4200', // Allow only Angular app URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
  }));

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);




const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
