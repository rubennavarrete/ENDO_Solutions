import { Proceso } from '../models/proceso.js';
import { paginarDatos } from "../utils/paginacion.utils.js";

export async function getProcesos(req, res) {
    try {
        const paginationDatos = req.query;
        if(paginationDatos.page == "undefined"){
            const {datos, total} = await paginarDatos(1, 10, Proceso, '', '');
            return res.json({
                status: true,
                message: 'Procesos obtenidos exitosamente',
                body: datos,
                total,
            });
        }
        const procesos = await Proceso.findAll({limit:5});
        if(procesos.lenght === 0 || !procesos){
            return res.json({
                status: false,
                message: 'No se encontraron procesos',
                body: []
            });
        }else{
            const {datos, total} = await paginarDatos(paginationDatos.page, paginationDatos.size, Proceso, paginationDatos.parameter, paginationDatos.data);
            return res.json({
                status: true,
                message: 'Procesos obtenidos exitosamente',
                body: datos,
                total,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal recuperando los procesos'
        });
    }
}

export async function getProcesoById(req, res) {
    try {
        const proceso = await Proceso.findByPk(req.params.id);
        if(proceso){
            return res.json({
                status: true,
                message: 'Proceso obtenido exitosamente',
                body: proceso
            });
        }
        else{
            return res.json({
                status: false,
                message: 'No se encontro el proceso',
                body: {}
            });
        }
    
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal recuperando el proceso'
        });
    }
}

export async function createProceso(req, res) {
    try {
        const proceso = await Proceso.create(req.body);
        if(proceso){
            return res.json({
                status: true,
                message: 'Proceso creado exitosamente',
                body: proceso
            });
        }
        else{
            return res.json({
                status: false,
                message: 'No se pudo crear el proceso',
                body: {}
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal creando el proceso'
        });
    }
}

export async function updateProceso(req, res) {
    try {
        const proceso = await Proceso.findByPk(req.params.id);
        if(proceso){
            await proceso.update(req.body);
            return res.json({
                status: true,
                message: 'Proceso actualizado exitosamente',
                body: proceso
            });
        }
        else{
            return res.json({
                status: false,
                message: 'No se encontro el proceso',
                body: {}
            });
        }
    
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal actualizando el proceso'
        });
    }
}

export async function deleteProceso(req, res) {
    try {
        const proceso = await Proceso.findByPk(req.params.id);
        if (!proceso) {
            return res.json({
                status: false,
                message: 'No se encontro el proceso',
                body: {}
            });
        }
        else{
            if(proceso.str_proc_estado === 'Activo'){
                await proceso.update({str_proc_estado: 'Inactivo'});
                await proceso.save();
                return res.json({
                    status: true,
                    message: 'Proceso desactivado exitosamente',
                    body: proceso
                });
            }else{

                await proceso.update({str_proc_estado: 'Activo'});
                await proceso.save();
                return res.json({
                    status: true,
                    message: 'Proceso activado exitosamente',
                    body: proceso
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal eliminando el proceso'
        });
    }
}