import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import sequelize from './config/connection';
import cropRoutes from './routes/api/cropRoutes';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/api/crops', cropRoutes)

const PORT = process.env.PORT || 3000;

// turn on server-routes
app.use('/api/auth', authRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('User Database connected!');
    await sequelize.sync();
    app.listen(process.env.PORT || 3000, () => 
    console.log('Server running on port 3000'));
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
