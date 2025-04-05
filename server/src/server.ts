// Flag to control whether to force a database refresh on server start

import express from 'express';

const app = express();  // Create an Express application
const PORT = process.env.PORT || 3001;  // Define the port for the server to listen on

// Serves static files from the client's dist folder, typically for a built React application
app.use(express.static('../client/dist'));

// app.use(express.json());  // Middleware to parse JSON request bodies
// // app.use(routes);  // Use the imported routes for handling API endpoints
app.get('/', (_req, res) => {
  res.send("Welcome to the Farm Management from the Backend side... the dark side!")
});
// Sync the Sequelize models with the database
app.listen(PORT, () => {  // Start the server and listen on the defined port
    console.log(`Server is listening at http://localhost:${PORT}`);  // Log a message when the server starts
  });

