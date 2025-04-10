import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { sequelize } from './config/connection.js';
import cropRoutes from './routes/api/cropRoutes.js';
import cropService from './service/cropService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS before defining routes
app.use(cors());  // This will allow cross-origin requests

app.use(express.json());

// API routes
app.use('/api/crops', cropRoutes);
app.use('/api/auth', authRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('User Database connected!');
    await sequelize.sync();
    await cropService.fetchAndSaveCrops();

    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};


startServer();