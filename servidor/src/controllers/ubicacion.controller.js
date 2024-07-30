import { Ubicacion } from "../models/ubicacion.js";
import Utils from "../utils/index.util.js"
import { QueryTypes } from "sequelize"

export async function getUbicaciones(req, res) {
    try {
        const { pagination } = req.query;
        const { query, parameters } = Utils.pagination.getFilterAndPaginationQuery(req.query, "public.tb_ubicacions");

        const result = await Ubicacion.sequelize.query(query, {
            replacements: parameters,
            type: QueryTypes.SELECT,
        })
        const count = await Ubicacion.count();
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
            message: "Ubicaciones obtenidas exitosamente",
            body: result,
            ...paginationMetaResult
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal recuperando las ubicaciones'
        });
    }
}

export async function getUbicacionesActivas(req, res) {
    try {
        // Definir los campos que queremos seleccionar
        const attributes = ['id_ubi_ubicacion', 'str_ubi_nombre'];

        // Consultar la base de datos usando Sequelize
        const procesosActivos = await Ubicacion.findAll({
            attributes: attributes,
            where: {
                str_ubi_estado: 'ACTIVO'
            }
        });

        // Responder con los datos obtenidos
        res.json({
            status: true,
            message: "Ubicaciones activas obtenidas exitosamente",
            body: 
            procesosActivos
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal recuperando las ubicaciones'
        });
    }
}

export async function getUbicacionById(req, res) {
    try {
        const ubicacion = await Ubicacion.findByPk(req.params.id);
        if (ubicacion) {
            return res.json({
                status: true,
                message: 'Ubicaciónn obtenida exitosamente',
                body: ubicacion
            });
        }
        else {
            return res.json({
                status: false,
                message: 'No se encontro la ubicación',
                body: {}
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal recuperando la ubicación'
        });
    }
}

export async function createUbicacion(req, res) {
    try {
        const ubicacion = await Ubicacion.create(req.body);
        if(ubicacion){
            return res.json({
                status: true,
                message: 'Ubicación creada exitosamente',
                body: ubicacion
            });
        }else{
            return res.json({
                status: false,
                message: 'No se pudo crear la ubicación',
                body: {}
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal creando la ubicación'
        });
    }
}

export async function updateUbicacion(req, res) {
    try {
        const ubicacion = await Ubicacion.findByPk(req.params.id);
        if(ubicacion){
            await ubicacion.update(req.body);
            return res.json({
                status: true,
                message: 'Ubicación actualizada exitosamente',
                body: ubicacion
            });
        }else{
            return res.json({
                status: false,
                message: 'No se encontro la ubicación',
                body: {}
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal actualizando la ubicación'
        });
    }
}

export async function deleteUbicacion(req, res) {
    try{

        const ubicacion = await Ubicacion.findByPk(req.params.id);
        if(!ubicacion){
            return res.json({
                status: false,
                message: 'No se encontro la ubicación',
                body: {}
            });
        }
        else{
            if(ubicacion.str_ubi_estado == 'ACTIVO'){
                ubicacion.str_ubi_estado = 'INACTIVO';
                await ubicacion.save();
                return res.json({
                    status: true,
                    message: 'Ubicación destivada exitosamente',
                    body: ubicacion
                });
            }else{
                await ubicacion.update({
                    str_ubi_estado: 'ACTIVO'
                });
                await ubicacion.save();
                return res.json({
                    status: true,
                    message: 'Ubicación activada exitosamente',
                    body: ubicacion
                });
            }
        }
            
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal eliminando la ubicación'
        });
    }
}
