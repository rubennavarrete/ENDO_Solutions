import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Agenda = sequelize.define('tb_agenda', {
    id_age_agenda: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_age_medico: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_age_proceso: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_age_ubicacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_age_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dt_age_fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    tm_age_hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    tm_age_hora_fin: {
        type: DataTypes.TIME,
        allowNull: false
    },
    str_age_estado: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
})