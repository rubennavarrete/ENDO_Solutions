import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const InfoMedica = sequelize.define('tb_info_medica', {
    id_inf_info_medica: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_inf_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    str_inf_alergias: {
        type: DataTypes.STRING,
        allowNull: false
    },
    str_inf_enfermedades: {
        type: DataTypes.STRING,
        allowNull: false
    },
    str_inf_medicamentos: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    str_inf_operaciones: {
        type: DataTypes.STRING,
        allowNull: false
    },
    str_inf_tipo_sangre: {
        type: DataTypes.STRING(4),
        allowNull: false
    },
    str_inf_limitaciones: {
        type: DataTypes.STRING,
        allowNull: false
    },
    str_inf_habitos_negativos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    str_inf_antecedentes_familiares: {
        type: DataTypes.STRING,
        allowNull: false
    },
    str_inf_antecedentes_odontologicos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    str_inf_antecedentes_personales: {
        type: DataTypes.STRING,
        allowNull: false
    },
    str_inf_estado: {
        type: DataTypes.STRING(20),
        defaultValue: 'ACTIVO'
    },
})