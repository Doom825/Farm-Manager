import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    Association,
    BelongsToManyAddAssociationMixin,
  } from 'sequelize';
  import { sequelize } from '../config/connection.js';
  import Crop from './Crop.js';
  import CropJournal from './CropJournal.js';
  
  class User extends Model<
    InferAttributes<User, { omit: 'Crops' | 'CropJournals' }>,
    InferCreationAttributes<User, { omit: 'Crops' | 'CropJournals' }>
  > {
    declare user_id: CreationOptional<number>;
    declare user_name: string;
    declare email: string;
    declare user_password: string;
  
    // Associations
    declare Crops?: Crop[];
    declare CropJournals?: CropJournal[];
  
    declare addCrop: BelongsToManyAddAssociationMixin<Crop, number>;
  
    declare static associations: {
      Crops: Association<User, Crop>;
      CropJournals: Association<User, CropJournal>;
    };
  }
  console.log(User.rawAttributes);
  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
},
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false, // This automatically includes createdAt & updatedAt
    },
  );
  
  export default User;
  