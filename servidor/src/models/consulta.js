import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Consulta = sequelize.define('tb_consulta', {
    id_con_consulta: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_con_medico: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_con_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    str_con_motivo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    str_con_exam_general: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    str_con_exam_especifico: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    str_con_diagnostico: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    str_con_tratamiento: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    str_con_recomendaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    str_con_observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    dt_con_fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    tm_con_hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    tm_con_hora_fin: {
        type: DataTypes.TIME,
        allowNull: false
    },
    str_con_estado: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
})