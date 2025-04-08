// This will check if there is an error on the link. 
// Verifying when the user signup, it success
export const signUpUser = async (userData) => {
    try {
        const response = await fetch('http://localhost:5173/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'applicatioin/json',
            },
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            throw new Error('Network response error');
        }

        const data = await response.json();
        console.log('Sign up successful:', data);
        return data;
    } catch (error) {
        console.error('Sign up error:', error);
        throw error;
    }
};

// Verifying when the user login, it success
export const logInUser = async (userData) => {
    try {
        const response = await fetch('http://localhost:5173/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'applicatioin/json',
            },
            body: JSON.stringify(userData),
        })
        
        if (!response.ok) {
            throw new Error('Network response error');
        }

        const data = await response.json();
        console.log('Login successful:', data);
        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};




