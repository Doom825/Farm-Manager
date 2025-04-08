import React, { useState } from 'react';
import { signUpUser } from '../utils/userApi';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try { 
            const data = await signUpUser(username, email, password);
            alert(data.message);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder='Username'
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
            <button onClick={handleSubmit}>Sign Up</button>
        </form>
    );
};

export default SignUp;