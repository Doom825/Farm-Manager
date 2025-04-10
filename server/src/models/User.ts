import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';
import { sequelize } from '../config/connection.js';
import bcrypt from 'bcrypt';

class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare user_id: CreationOptional<number>;
    declare user_name: string;
    declare email: string;
    declare user_password: string;

    //method to check password
    async checkPassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.user_password);
    }
}

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
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
        timestamps: false, // Disable Sequelize's automatic createdAt and updatedAt
        hooks: {
            // ✅ Automatically hash password before save
            beforeCreate: async (user: User) => {
                user.user_password = await bcrypt.hash(user.user_password, 10);
            },
            beforeUpdate: async (user: User) => {
                if (user.changed('user_password')) {
                    user.user_password = await bcrypt.hash(user.user_password, 10);
                }
            },
        },
    }
);

export default User;
