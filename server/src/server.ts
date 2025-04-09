import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import sequelize from './config/connection';
import cropRoutes from './routes/api/cropRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// API routes
app.use('/api/crops', cropRoutes);
app.use('/api/auth', authRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('User Database connected!');
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`🌱 Server is listening on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
  }
};

startServer();