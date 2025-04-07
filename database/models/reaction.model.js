import { DataTypes } from "sequelize";
import { sequelizeconn } from "../dbConnention.js";


export const reactionSchema = sequelizeconn.define('reaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.ENUM('up', 'down'),
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "blogs",
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['userId', 'blogId']
        }
    ]
});

