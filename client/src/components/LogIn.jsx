import React, { useState } from 'react';
import { logInUser } from '../utils/api';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await logInUser(email, password);
            localStorage.setItem('token', data.token);
            const payload = JSON.parse(atob(data.token.split('.')[1]));
            localStorage.setItem('user_id', payload.user_id);
            alert('Welcome back, Farmer!');
        } catch (error) {
            alert(error?.response?.data?.message || 'Login failed');
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
            <button type="submit">Log In</button>
        </form>
    );
};

export default LogIn;