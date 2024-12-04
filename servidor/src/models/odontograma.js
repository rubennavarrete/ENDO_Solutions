import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Odontograma = sequelize.define('tb_odontograma',{
    id_odo_odontograma: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_odo_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    int_odo_diente:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dt_odo_fecha_registro: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    str_odo_cara:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    str_odo_diagnostico:{
        type: DataTypes.STRING,
        allowNull: false
    }
})