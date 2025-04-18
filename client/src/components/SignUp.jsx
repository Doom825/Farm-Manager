import React, { useState } from 'react';
import { signUpUser } from '../utils/api';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic email validation before submitting
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        try {
            const data = await signUpUser(username, email, password);
            console.log("Sign up success:", data);
            alert(data.message || "Sign up successful!");
        } catch (error) {
            console.error("Sign up error:", error);
            alert("Sign up failed. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Sign Up</button>
        </form>
    );
};

export default SignUp;