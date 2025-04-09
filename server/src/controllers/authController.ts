import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

// Sign-Up 
export const signUp = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await User.findOne({ 
            where: { email }
        });
        if (userExists) {
            return res.status(400).json({ message: "Farm's email already in use." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({ message: "Farmer user created successfully!", userId: newUser.id 
        });  

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error'});
    }
};

// Log-In
export const logIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // This verify: Is the right user?
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Incorrect email' });
        }
        // This verify: Is the correct password?
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Incorrect password'})
        }

        const token = jwt.sign({ userId: user.id },  process.env.JWT_SECRET || '', {
            expiresIn: '1h' 
        });
        // do an interface above, convert userId: string

        return res.json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error'});
    }
};