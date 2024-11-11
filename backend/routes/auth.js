import { Router } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/usersModel.js';

const router = Router();
dotenv.config()
const secret_key = process.env.SECRET_KEY

// Node Mailer Configurations

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

// Signup

router.post('/signup', async(req,res) => {
    const { fullName, username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = crypto.randomInt(100000, 999999).toString();
        const user = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
            otp,
            otpExpires: Date.now() + 10 * 60 * 1000,
        });

        const mailCredentials = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Welcome to Todire.",
            text: `Hello ${fullName},\n\nYour OTP for account verification is ${otp}. It is valid for the next 10 minutes.\n\nThank you! \n\n Regards, \n\n Afaq Shahid \n Admin Social`,
        };
        await transporter.sendMail(mailCredentials);
        await user.save();

        return res.status(200).json({ message: "User created successfully! Please check your email for OTP." });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Server error during signup" });
    }
})

// Confirm Email

router.post('/confirm', async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully!' });
    } catch (error) {
        console.error("Email Confirmation Error:", error);
        res.status(500).json({ message: 'Error in email confirmation' });
    }
});


// Login

router.post('/login', async(req,res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Invalid Credentials !"
            })
        }
        const matchingPassword = await bcrypt.compare(password, user.password);
        if(!matchingPassword){
            res.status(400).json({
                message: "Invalid Credentials"
            })
        }
        const token = jwt.sign({id:user.id}, secret_key, {expiresIn: '1h'})
        res.cookie('token', token, {httpOnly: true});
        return res.status(200).json({
            message:"login successfull",
            token
        })
    } catch(error){
        console.error(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
})

export default router;