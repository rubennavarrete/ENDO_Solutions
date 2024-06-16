import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Medico = sequelize.define('tb_medico', {
    id_med_medico: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: 'tb_persona',
        //     key: 'id_per_persona',
        // },
    },
    id_med_especialidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    // Opciones del modelo
    // sequelize,
    // modelName: 'tb_medico',
    // // Indica que Medico "extiende" Persona
    // extends: 'tb_persona',
});



