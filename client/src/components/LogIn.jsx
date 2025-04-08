import React, { useState } from 'react';
import { logInUser } from '../utils/userApi';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await logInUser(email, password);
            localStorage.setItem('token', data.token);
            alert('Welcome back, Farmer!');
        } catch (error) {
            alert(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button onClick={handleSubmit}>Log In</button>
        </form>
    );
};

export default LogIn;