import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connection.js'; // ensure you're exporting `sequelize` properly

interface CropAttributes {
  crop_id: number;
  crop_name: string;
  slug: string;
}

// crop_id will be provided by the API, so we don't mark it optional in creation
type CropCreationAttributes = CropAttributes;

class Crop extends Model<CropAttributes, CropCreationAttributes> implements CropAttributes {
  public crop_id!: number;
  public crop_name!: string;
  public slug!: string;
}

Crop.init(
  {
    crop_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    crop_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'crops',
    modelName: 'Crop',
    timestamps: false,
  }
);

export default Crop;