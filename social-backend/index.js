const express = require('express');
const authRoutes = require('./routes/authRoutes');
const dbConfig = require('./config/db');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');





const app = express();
const path = require('path');

// Serve static files (images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json()); // To parse JSON payloads
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded payloads


app.use(cors({
  origin: 'http://localhost:4200', // Replace with your frontend's URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Authorization,Content-Type'
}));



app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); 
app.use('/uploads', express.static('uploads'));


const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/api/posts', upload.single('postPicture'), (req, res) => {
  console.log('Generated filename:', req.file.filename);
  console.log('File received:', req.file);
  console.log('Request body:', req.body); 

  const post = {
    title: req.body.title,
    description: req.body.description,
    picture: `uploads/${req.file.filename}`, 
  };

  
  Post.create(post)
    .then((createdPost) => {
      res.status(201).json({
        success: true,
        message: 'Post created successfully',
        post: createdPost,
      });
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: 'Error creating post', error });
    });
});



dbConfig();

// Global error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Handle multer-specific errors
        console.error('Multer Error:', err.message);
        res.status(400).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
        // Handle general errors
        console.error('Error:', err.message);
        res.status(400).json({ message: err.message });
    } else {
        next();
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
