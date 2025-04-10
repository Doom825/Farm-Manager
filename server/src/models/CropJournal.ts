import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connection.js'; // Ensure sequelize is imported correctly
import Crop from './Crop.js'; // Import Crop model
import User from './User.js'; // Import User model

interface CropJournalAttributes {
  id: number;
  user_id: number;
  crop_id: number;
  body: string;  // You can store body or other details about the crop here
  entry_date: Date;
  //last_watered: Date;
}

type CropJournalCreationAttributes = Omit<
  CropJournalAttributes,
  'id' | 'entry_date' | 'last_watered' | 'body'
> & {
  entry_date?: Date;
  //last_watered?: Date;
  notes?: string;
};

class CropJournal extends Model<CropJournalAttributes, CropJournalCreationAttributes> implements CropJournalAttributes {
  public id!: number;
  public user_id!: number;
  public crop_id!: number;
  public body!: string;
  public entry_date!: Date;
  //public last_watered!: Date;
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
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    crop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Crop, 
        key: 'crop_id',
      },
      onDelete: 'CASCADE',
    },
    body: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    entry_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    // last_watered: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // },
  },
  {
    sequelize,
    tableName: 'user_crop',
    modelName: 'CropJournal',
    timestamps: false,  
  }
);

export default CropJournal;