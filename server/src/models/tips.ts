import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

// This Tip model is responsible for managing the database interaction for the 'tips' table in PostgreSQL
interface TipAttributes {
    id: number;
    username: string;
    topic: string;
    tip: string;
}

// Optional is a TypeScript utility type that makes some properties optional.
// TipCreationAttributes extends Optional to make the 'id' field optional when creating a new Tip entry.
interface TipCreationAttributes extends Optional<TipAttributes, 'id'> { }

// The Tip class extends Sequelize's Model class and implements TipAttributes to enforce the structure of tip records.
export class Tip extends Model<TipAttributes, TipCreationAttributes> implements TipAttributes {
    public id!: number;
    public username!: string;
    public topic!: string;
    public tip!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// The TipFactory function initializes the Tip model with its attributes and configurations.
// This function will be used in the Express.js application to set up the Tip table in the PostgreSQL database.
export function TipFactory(sequelize: Sequelize): typeof Tip {
    Tip.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,  // Automatically incrementing ID for each tip entry.
                primaryKey: true,     // Primary key for the Tip table.
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,     // Username field cannot be null.
            },
            topic: {
                type: DataTypes.STRING,
                allowNull: true,      // Topic can be null, defaults to 'UX'.
                defaultValue: "UX",
            },
            tip: {
                type: DataTypes.TEXT,
                allowNull: false,     // Tip content cannot be null.
            },
        },
        {
            tableName: 'tips',       // Name of the table in PostgreSQL.
            sequelize,               // The Sequelize instance that connects to PostgreSQL.
        }
    );

    return Tip;  // Returns the initialized model to be used in the application.
}
