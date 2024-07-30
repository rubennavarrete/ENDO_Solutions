import { Proceso } from '../models/proceso.js';
import Utils from "../utils/index.util.js"
import { QueryTypes } from "sequelize"

export async function getProcesos(req, res) {
    try {
        const { pagination } = req.query;
        const { query, parameters } = Utils.pagination.getFilterAndPaginationQuery(req.query, "public.tb_procesos");

        const result = await Proceso.sequelize.query(query, {
            replacements: parameters,
            type: QueryTypes.SELECT,
        })
        const count = await Proceso.count();
        let pageToMeta = {};
        if (pagination) {
            pageToMeta = JSON.parse(pagination);
        }
        const paginationMetaResult = Utils.pagination.paginate(
            pageToMeta.page,
            pageToMeta.limit,
            count
        )

        res.json({
            status: true,
            message: "Procesos obtenidos exitosamente",
            body: result,
            ...paginationMetaResult
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal recuperando los procesos'
        });
    }
}

export async function getProcesosActivos(req, res) {
    try {
        // Definir los campos que queremos seleccionar
        const attributes = ['id_proc_proceso', 'str_proc_nombre'];

        // Consultar la base de datos usando Sequelize
        const procesosActivos = await Proceso.findAll({
            attributes: attributes,
            where: {
                str_proc_estado: 'ACTIVO'
            }
        });

        // Responder con los datos obtenidos
        res.json({
            status: true,
            message: "Procesos activos obtenidos exitosamente",
            body: 
            procesosActivos
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salió mal recuperando los procesos'
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
                body: 
                proceso
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
            if(proceso.str_proc_estado === 'ACTIVO'){
                await proceso.update({str_proc_estado: 'INACTIVO'});
                await proceso.save();
                return res.json({
                    status: true,
                    message: 'Proceso desactivado exitosamente',
                    body: proceso
                });
            }else{

                await proceso.update({str_proc_estado: 'ACTIVO'});
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