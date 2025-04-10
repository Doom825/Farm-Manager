import axios from 'axios';

const API_URL = '/api/auth';

export const signUpUser = async (user_name, email, user_password) => {
    try { 
        const response = await axios.post(`${API_URL}/signup`, { user_name, email, user_password });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const logInUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        },{ headers: { 'Content-Type': 'application/json' }} );
        return response.data;
    } catch (error) {
        console.error('Error in logInUser:', error);
        throw error;
    }
};

