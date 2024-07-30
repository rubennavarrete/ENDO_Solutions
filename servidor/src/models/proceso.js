import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";


export const Proceso = sequelize.define('tb_procesos', {
    id_proc_proceso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    str_proc_nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    str_proc_descripcion: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    str_proc_estado: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    // num_proc_costo: {
    //     type: DataTypes.BIGINT,
    //     allowNull: false
    // },
    num_proc_costo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

})
