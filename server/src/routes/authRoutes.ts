import express from 'express';
import { signUp, logIn } from '../controllers/authController.js';

const router = express.Router();

// Register a new user
router.post('/signup', signUp);

// Log in an existing user
router.post('/login', logIn);

export default router;