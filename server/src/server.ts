// Import express to run server app
import express from 'express';
// Import these packages to create auth
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();  // Create an Express application
const PORT = process.env.PORT || 3001;  // Define the port for the server to listen on

// Serves static files from the client's dist folder, typically for a built React application
app.use(express.static('../client/dist'));

app.use(express.json());  // Middleware to parse JSON request bodies

app.use(cors()); // Allows you to control which origins are allowed to access your resources. More info. https://www.npmjs.com/package/cors 

app.use(routes);  // Use the imported routes for handling API endpoints

const 

app.get('/', (_req, res) => {
  res.send("Welcome to the Farm Management from the Backend side... the dark side!")
});
// Sync the Sequelize models with the database
app.listen(PORT, () => {  // Start the server and listen on the defined port
    console.log(`Server is listening at http://localhost:${PORT}`);  // Log a message when the server starts
  });

