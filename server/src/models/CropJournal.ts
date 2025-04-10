import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connection.js'; // Ensure sequelize is imported correctly
import Crop from './Crop.js'; // Import Crop model
import User from './User.js'; // Import User model

interface CropJournalAttributes {
  id: number;
  user_id: number;
  crop_id: number;
  notes: string;  // You can store notes or other details about the crop here
  date_planted: Date;
  last_watered: Date;
}

type CropJournalCreationAttributes = CropJournalAttributes;

class CropJournal extends Model<CropJournalAttributes, CropJournalCreationAttributes> implements CropJournalAttributes {
  public id!: number;
  public user_id!: number;
  public crop_id!: number;
  public notes!: string;
  public date_planted!: Date;
  public last_watered!: Date;
}

CropJournal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,  // Make sure this matches the name of your User model
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    crop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Crop,  // Ensure this matches the name of your Crop model
        key: 'crop_id',
      },
      onDelete: 'CASCADE',
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_planted: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    last_watered: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'cropjournal',
    modelName: 'CropJournal',
    timestamps: true,  // This will automatically create createdAt and updatedAt fields
  }
);

export default CropJournal;