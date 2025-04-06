import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const signUpUser = async (username, email, password) => {
    try { 
        const response = await axios.post(`${API_URL}/signup`, { username, email, password });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const logInUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

