import { Persona } from './persona.js';
import { Especialidad } from './especialidad.js';
import { Medico } from './medico.js';
import { Paciente } from './paciente.js';
import { InfoMedica } from './info_medica.js';

Medico.belongsTo(Especialidad,{foreignKey: 'id_med_especialidad',targetKey: 'id_esp_especialidad'}); 
// Especialidad.hasMany(Medico,{foreignKey: 'id_med_especialidad',sourceKey: 'id_esp_especialidad'});


Medico.belongsTo(Persona, { foreignKey: 'id_med_medico', targetKey: 'id_per_persona' });

//Una persona es un paciente
//Paciente.belongsTo(Persona, { foreignKey: 'id_pac_paciente', targetKey: 'id_per_persona' });

//un paciente tiene una información médica
InfoMedica.belongsTo(Paciente, { foreignKey: 'id_inf_paciente', targetKey: 'id_pac_paciente' });
