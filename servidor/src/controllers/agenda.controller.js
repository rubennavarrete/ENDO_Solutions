import { Agenda } from "../models/agenda.js";
import { Op } from 'sequelize';


export async function getAgendas(req, res) {
    try {

        let query = "SELECT a.id_age_agenda, a.id_age_medico, h.str_per_nombre, h.str_per_apellido, a.id_age_proceso, c.str_proc_nombre, a.id_age_ubicacion, u.str_ubi_nombre, a.id_age_paciente, p.str_pac_nombre, p.str_pac_apellido, a.dt_age_fecha, a.tm_age_hora_inicio, a.tm_age_hora_fin, a.str_age_color, a.str_age_estado FROM public.tb_agendas a inner join public.tb_pacientes p on a.id_age_paciente = p.id_pac_paciente	inner join public.tb_procesos c on a.id_age_proceso=c.id_proc_proceso	inner join public.tb_ubicacions u on a.id_age_ubicacion = u.id_ubi_ubicacion	inner join public.tb_medicos m on a.id_age_medico = m.id_med_medico	inner join public.tb_personas h on m.id_med_medico = h.id_per_persona";

        const agendas = await Agenda.sequelize.query(query, {
            type: Agenda.sequelize.QueryTypes.SELECT
        })

        // const agendas = await Agenda.findAll();
        if (agendas) {
            const events = agendas.map(agenda => ({
                id: agenda.id_age_agenda,
                start: new Date(`${agenda.dt_age_fecha}T${agenda.tm_age_hora_inicio}`),
                // end: new Date(`${agenda.dt_age_hora_fin ? agenda.dt_age_fecha + 'T' + agenda.tm_age_hora_fin : agenda.dt_age_fecha}`),
                end: new Date(`${agenda.dt_age_fecha}T${agenda.tm_age_hora_fin}`),
                // title: `Evento de ${agenda.id_age_paciente}`,
                title: `${agenda.str_age_estado} Paciente: ${agenda.str_pac_nombre} ${agenda.str_pac_apellido} - Proceso: ${agenda.str_proc_nombre} - Ubicación: ${agenda.str_ubi_nombre} - Médico: ${agenda.str_per_nombre} ${agenda.str_per_apellido}` ,
                color: { primary: agenda.str_age_color, secondary: '#D1E8FF' },
                actions: [], 
            }));
            return res.json(events);
        } else {
            return res.json([]);
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salió mal recuperando las citas',
        });
    }
}


export async function getAgendaById(req, res) {
    try {
        const agenda = await Agenda.findByPk(req.params.id);
        if(agenda){
            return res.json({
                status: true,
                message: 'Cita obtenida exitosamente',
                body: agenda
            });
        }
        else{
            return res.json({
                status: false,
                message: 'No se encontro la cita',
                body: {}
            });
        }
    
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal recuperando la cita'
        });
    }
}

// export async function createAgenda(req, res) {
//     try {
//         //validar datos
//         const agenda = await Agenda.create(req.body);
//         if(agenda){
//             return res.json({
//                 status: true,
//                 message: 'Cita creada exitosamente',
//                 body: agenda
//             });
//         }
//         else{
//             return res.json({
//                 status: false,
//                 message: 'No se pudo crear la cita',
//                 body: {}
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message || 'Algo salio mal creando la cita'
//         });
//     }
// }


async function checkConflicts({ id_age_medico, id_age_ubicacion, id_age_paciente, dt_age_fecha, tm_age_hora_inicio, tm_age_hora_fin }) {
    const conflicts = await Agenda.findAll({
        where: {
            dt_age_fecha,
            str_age_estado: 'ACTIVO', // Asegúrate de considerar solo las citas activas
            [Op.or]: [
                {
                    id_age_medico,
                    tm_age_hora_inicio: {
                        [Op.lt]: tm_age_hora_fin
                    },
                    tm_age_hora_fin: {
                        [Op.gt]: tm_age_hora_inicio
                    }
                },
                {
                    id_age_ubicacion,
                    tm_age_hora_inicio: {
                        [Op.lt]: tm_age_hora_fin
                    },
                    tm_age_hora_fin: {
                        [Op.gt]: tm_age_hora_inicio
                    }
                },
                {
                    id_age_paciente,
                    tm_age_hora_inicio: {
                        [Op.lt]: tm_age_hora_fin
                    },
                    tm_age_hora_fin: {
                        [Op.gt]: tm_age_hora_inicio
                    }
                }
            ]
        }
    });

    return conflicts.length > 0;
}

export async function createAgenda(req, res) {
    try {
        const { id_age_medico, id_age_ubicacion, id_age_paciente, dt_age_fecha, tm_age_hora_inicio, tm_age_hora_fin } = req.body;

        // Validar conflictos
        const hasConflicts = await checkConflicts({ id_age_medico, id_age_ubicacion, id_age_paciente, dt_age_fecha, tm_age_hora_inicio, tm_age_hora_fin });
        if (hasConflicts) {
            return res.json({
                status: false,
                message: 'Conflicto en la agenda: El médico, ubicación o paciente ya tienen una cita en ese momento.',
                body: {}
            });
        }

        // Crear agenda si no hay conflictos
        const agenda = await Agenda.create(req.body);
        if (agenda) {
            return res.json({
                status: true,
                message: 'Cita creada exitosamente',
                body: agenda
            });
        } else {
            return res.json({
                status: false,
                message: 'No se pudo crear la cita',
                body: {}
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salió mal creando la cita'
        });
    }
}


export async function updateAgenda(req, res) {
    try {
        const { id_age_medico, id_age_ubicacion, id_age_paciente, dt_age_fecha, tm_age_hora_inicio, tm_age_hora_fin } = req.body;

        // Validar conflictos
        const hasConflicts = await checkConflicts({ id_age_medico, id_age_ubicacion, id_age_paciente, dt_age_fecha, tm_age_hora_inicio, tm_age_hora_fin });
        if (hasConflicts) {
            return res.json({
                status: false,
                message: 'Conflicto en la agenda: El médico, ubicación o paciente ya tienen una cita en ese momento.',
                body: {}
            });
        }

        const agenda = await Agenda.findByPk(req.params.id);
        if(agenda){
            await agenda.update(req.body);
            return res.json({
                status: true,
                message: 'Cita actualizada exitosamente',
                body: agenda
            });
        }
        else{
            return res.json({
                status: false,
                message: 'No se encontro la cita',
                body: {}
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal actualizando la cita'
        });
    }
}

export async function deleteAgenda(req, res) {
    try {
        const agenda = await Agenda.findByPk(req.params.id);
        if(agenda){
            await agenda.destroy();
            return res.json({
                status: true,
                message: 'Cita eliminada exitosamente',
                body: agenda
            });
        }
        else{
            return res.json({
                status: false,
                message: 'No se encontro la cita',
                body: {}
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal eliminando la cita'
        });
    }
    // try {
    //     const agenda = await Agenda.findByPk(req.params.id);
    //     if(!agenda){
    //         return res.json({
    //             status: false,
    //             message: 'No se encontro el evento',
    //             body: {}
    //         });
    //     }
    //     else{
    //         if(agenda.str_age_estado === 'Activo'){
    //             await agenda.update({
    //                 str_age_estado: 'Inactivo'
    //             });
    //             await agenda.save();
    //             return res.json({
    //                 status: true,
    //                 message: 'Evento eliminado exitosamente',
    //                 body: agenda
    //             });
    //         }else{
    //             await agenda.update({
    //                 str_age_estado: 'Activo'
    //             });
    //             await agenda.save();
    //             return res.json({
    //                 status: true,
    //                 message: 'Evento activado exitosamente',
    //                 body: agenda
    //             });
    //         }
    //     }
    // } catch (error) {
    //     return res.status(500).json({
    //         message: error.message || 'Algo salio mal eliminando la agenda'
    //     });
    // }
}