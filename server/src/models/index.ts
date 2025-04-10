import { Sequelize } from 'sequelize';
import { sequelize } from '../config/connection.js';

import dotenv from 'dotenv';
dotenv.config();

import User from './User.js';
import Crop from './Crop.js';
import CropJournal from './CropJournal.js';

// Set up associations here
User.hasMany(CropJournal, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
  CropJournal.belongsTo(User, {
    foreignKey: 'user_id',
  });
  
  Crop.hasMany(CropJournal, {
    foreignKey: 'crop_id',
    onDelete: 'CASCADE',
  });
  CropJournal.belongsTo(Crop, {
    foreignKey: 'crop_id',
  });

  User.belongsToMany(Crop, {
    through: 'user_crop',  // This is your join table
    foreignKey: 'user_id',
    otherKey: 'crop_id',   // This is the other key for crops
  });
  
  Crop.belongsToMany(User, {
    through: 'user_crop',
    foreignKey: 'crop_id',
    otherKey: 'user_id',
  });

const db = {
  sequelize,
  Sequelize,
  User,
  Crop,
  CropJournal,
};

export default db;