import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Ubicacion = sequelize.define('tb_ubicacion', {
    id_ubi_ubicacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    str_ubi_nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    str_ubi_descripcion: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    str_ubi_estado: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
})