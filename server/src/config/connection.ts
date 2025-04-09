import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

if (!process.env.DB_PASSWORD) {
  throw new Error("DB_PASSWORD is not set in .env");
}

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME || '',
      process.env.DB_USER || '',
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

export {sequelize};
