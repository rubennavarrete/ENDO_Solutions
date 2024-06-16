import { Ubicacion } from "../models/ubicacion.js";
import { paginarDatos } from "../utils/paginacion.utils.js";

export async function getUbicaciones(req, res) {
    try {
        const paginationDatos = req.query;
        if (paginationDatos.page == "undefined") {
            const { datos, total } = await paginarDatos(1, 10, Ubicacion, '', '');
            return res.json({
                status: true,
                message: 'Ubicaciones obtenidas exitosamente',
                body: datos,
                total,
            });
        }
        const ubicaciones = await Ubicacion.findAll({ limit: 5 });
        if (ubicaciones.lenght === 0 || !ubicaciones) {
            return res.json({
                status: false,
                message: 'No se encontraron ubicaciones',
                body: []
            });
        } else {
            const { datos, total } = await paginarDatos(paginationDatos.page, paginationDatos.size, Ubicacion, paginationDatos.parameter, paginationDatos.data);
            return res.json({
                status: true,
                message: 'Ubicaciones obtenidas exitosamente',
                body: datos,
                total,
            });
        }
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
            if(ubicacion.str_ubi_estado == 'Activo'){
                ubicacion.str_ubi_estado = 'Inactivo';
                await ubicacion.save();
                return res.json({
                    status: true,
                    message: 'Ubicación destivada exitosamente',
                    body: ubicacion
                });
            }else{
                await ubicacion.update({
                    str_ubi_estado: 'Activo'
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
