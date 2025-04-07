import { DataTypes } from "sequelize";
import { sequelizeconn } from "../dbConnention.js";
import { userSchema } from "./user.model.js";

export const blogSchema = sequelizeconn.define('blog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    auth: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: true,
});


