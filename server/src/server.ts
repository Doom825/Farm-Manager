import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import sequelize from './config/db';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// turn on server-routes
app.use('/api/auth', authRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('User Database connected!');
    await sequelize.sync();
    app.listen(process.env.PORT || 5000, () => 
    console.log('Server running on port 5000'));
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

startServer();

// turn on connection to db and server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
});

app.listen(PORT, () => {  // 
// Start the server and listen on the defined port
  console.log(`Server is listening at http://localhost:${PORT}`);  // Log a message when the server starts
});