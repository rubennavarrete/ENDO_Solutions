import { Agenda } from "../models/agenda.js";
/*
export async function getAgendas(req, res) {
    try{
        const agendas = await Agenda.findAll();
        if(agendas){
            return res.json({
                status: true,
                message: 'Citas obtenidas exitosamente',
                body: agendas
            });
        }else{
            return res.json({
                status: false,
                message: 'No se encontró las citas',
                body: []
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal recuperando las citas'
        });
    }
}*/

// export async function getAgendas(req, res) {
//     try {
//         const agendas = await Agenda.findAll();
//         if (agendas) {
//             const events = agendas.map(agenda => ({
//                 id: agenda.id_age_agenda,
//                 start: new Date(`${agenda.dt_age_fecha}T${agenda.tm_age_hora_inicio}`),
//                 end: new Date(`${agenda.dt_age_fecha}T${agenda.tm_age_hora_fin}`),
//                 title: `Evento de ${agenda.id_age_paciente}`,
//                 color: { primary: agenda.str_age_color, secondary: '#D1E8FF' }, // Ajusta los colores según tu lógica
//                 actions: [], // Puedes agregar acciones aquí si lo necesitas
//             }));
//             console.log("EVENTOS-----------------",events);
//             return res.json({
//                 status: true,
//                 message: 'Citas obtenidas exitosamente',
//                 body: events,
//             });
//         } else {
//             return res.json({
//                 status: false,
//                 message: 'No se encontró las citas',
//                 body: [],
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message || 'Algo salió mal recuperando las citas',
//         });
//     }
// }

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
                title: `Paciente: ${agenda.str_pac_nombre} ${agenda.str_pac_apellido} - Proceso: ${agenda.str_proc_nombre} - Ubicación: ${agenda.str_ubi_nombre} - Médico: ${agenda.str_per_nombre} ${agenda.str_per_apellido}` ,
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

export async function createAgenda(req, res) {
    try {
        console.log("Crear agenda-------------------", req.body)
        const agenda = await Agenda.create(req.body);
        if(agenda){
            return res.json({
                status: true,
                message: 'Cita creada exitosamente',
                body: agenda
            });
        }
        else{
            return res.json({
                status: false,
                message: 'No se pudo crear la cita',
                body: {}
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal creando la cita'
        });
    }
}

export async function updateAgenda(req, res) {
    try {
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