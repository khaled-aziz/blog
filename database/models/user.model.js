import { DataTypes } from "sequelize";
import { sequelizeconn } from "../dbConnention.js";

export const userSchema = sequelizeconn.define('User', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(50),
    },
    email:{
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    profilePic:{
        type:DataTypes.STRING(50)
    }
});

