const express = require('express');
const authRoutes = require('./routes/authRoutes');
const dbConfig = require('./config/db');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');



const app = express();


app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); 

dbConfig();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
