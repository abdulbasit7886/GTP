const multer = require('multer');
const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies



const uploadDir = path.join(__dirname, 'uploads'); // Ensure it's an absolute path
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir); // Create the directory if it doesn't exist
    console.log(`Created directory: ${uploadDir}`);
}




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
});

module.exports = upload;
