import { Agenda } from "../models/agenda.js";

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
        if(!agenda){
            return res.json({
                status: false,
                message: 'No se encontro el evento',
                body: {}
            });
        }
        else{
            if(agenda.str_age_estado === 'Activo'){
                await agenda.update({
                    str_age_estado: 'Inactivo'
                });
                await agenda.save();
                return res.json({
                    status: true,
                    message: 'Evento eliminado exitosamente',
                    body: agenda
                });
            }else{
                await agenda.update({
                    str_age_estado: 'Activo'
                });
                await agenda.save();
                return res.json({
                    status: true,
                    message: 'Evento activado exitosamente',
                    body: agenda
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal eliminando la agenda'
        });
    }
}