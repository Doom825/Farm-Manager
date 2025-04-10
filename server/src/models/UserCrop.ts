
  import { sequelize } from '../config/connection.js';
  import Sequelize from 'sequelize';

const UserCrop = sequelize.define('user_crop', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true, // Mark user_id as part of the composite primary key
      allowNull: false,
    },
    crop_id: {
      type: Sequelize.INTEGER,
      primaryKey: true, // Mark crop_id as part of the composite primary key
      allowNull: false,
    },
    // Other fields like body, entry_date, etc.
  }, {
    tableName: 'user_crop',
    timestamps: false,  // Set to true if you want timestamps like createdAt and updatedAt
  });

  export default UserCrop;
  