import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from '../config/connection.js';
import CropJournal from "./CropJournal.js";

// interfaces to create user table/db 
interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// More info on https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/ 
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
}

// Validation for each category: id, username, email, and password. This initialize the User.
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'User',
    }
);

// Associations
User.hasMany(CropJournal, { foreignKey: 'user_id' });
CropJournal.belongsTo(User, { foreignKey: 'user_id' });

export default User;