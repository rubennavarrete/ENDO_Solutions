import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Especialidad = sequelize.define('tb_especialidad', {
    id_esp_especialidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    str_esp_nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    str_esp_descripcion: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    str_esp_estado: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    // dt_esp_fecha_registro:{
    //     type: DataTypes.DATE,
    //     allowNull: false
    // },
    // dt_esp_fecha_modificacion:{
    //     type: DataTypes.DATE,
    //     allowNull: false  //
    // }

}, {
    // timestamps: false,
    freezeTableName: true
});