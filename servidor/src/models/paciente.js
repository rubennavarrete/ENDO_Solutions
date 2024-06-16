import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Paciente = sequelize.define('tb_paciente', {
    id_pac_paciente: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    str_pac_nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    str_pac_apellido: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    str_pac_cedula: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    str_pac_correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        isEmail: true,
    },
    str_pac_sexo: {
        type: DataTypes.STRING(1),
        allowNull: false
    },
    str_pac_estado: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    str_pac_telefono: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    str_pac_nombre_familia: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    str_pac_telefono_familia: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    str_pac_relacion_familia: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    dt_pac_fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    str_pac_direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // id_pac_info_medica:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
}, {});