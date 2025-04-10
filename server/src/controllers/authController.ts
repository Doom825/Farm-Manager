import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();



const secret = process.env.JWT_SECRET; // Secret from the environment

// SignUp function
export const signUp = async (req: Request, res: Response): Promise<Response> => {
    const { user_name, email, user_password } = req.body;

    // Check for a valid email format before attempting to save
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!user_name) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        // Ensure user_name, email, and user_password are provided
        const hashedPassword = await bcrypt.hash(user_password, 10); // 10 is the salt rounds
        const user = await User.create({ user_name, email, user_password: hashedPassword });
        const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET!, { expiresIn: '1h',});

        return res.status(201).json({ token, user });
    } catch (err) {
        console.error('Sign-up error:', err);
        return res.status(500).json({ message: 'Server error during sign-up' });
    }
};

// LogIn function
export const logIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;  // Change user_password to password

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.user_password || typeof user.user_password !== 'string') {
            return res.status(400).json({ message: 'User password is missing or invalid' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.user_password);  // Use password here

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const payload = { user_id: user.user_id, email: user.email };

        if (!secret) {
            return res.status(500).json({ message: 'JWT secret not defined' });
        }

        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        return res.status(200).json({ token, user_id: user.user_id });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};