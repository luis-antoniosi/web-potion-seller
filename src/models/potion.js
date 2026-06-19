import { DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";

const Potion = sequelize.define(
    "Potion",
    {
        // id is apparently added by default
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    }
);

export default Potion;