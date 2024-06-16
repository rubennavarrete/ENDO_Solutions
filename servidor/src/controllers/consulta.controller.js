import { Consulta } from "../models/consulta.js";
import { paginarDatos } from "../utils/paginacion.utils.js";

export async function getConsultas(req, res) {
    try {
        const paginationDatos = req.query;
        if(paginationDatos.page == "undefined"){
            const {datos, total} = await paginarDatos(1, 10, Consulta, '', '');
            return res.json({
                status: true,
                message: 'Consultas obtenidas exitosamente',
                body: datos,
                total,
            });
        }
        const consultas = await Consulta.findAll({limit:5});
        if(consultas.lenght === 0 || !consultas){
            return res.json({
                status: false,
                message: 'No se encontraron consultas',
                body: []
            });
        }else{
            const {datos, total} = await paginarDatos(paginationDatos.page, paginationDatos.size, Consulta, paginationDatos.parameter, paginationDatos.data);
            return res.json({
                status: true,
                message: 'Consultas obtenidas exitosamente',
                body: datos,
                total,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal recuperando las consultas'
        });
    }
}

export async function getConsultaById(req, res) {
    try {
        const consulta = await Consulta.findByPk(req.params.id);
        if(consulta){
            return res.json({
                status: true,
                message: 'Consulta obtenida exitosamente',
                body: consulta
            });
        }
        else{
            return res.json({
                status: false,
                message: 'No se encontro la consulta',
                body: {}
            });
        }
    
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal recuperando la consulta'
        });
    }
}

export async function createConsulta(req, res) {
    try {
        const consulta = await Consulta.create(req.body);
        if(consulta){
            return res.json({
                status: true,
                message: 'Consulta creada exitosamente',
                body: consulta
            });
        }else{
            return res.json({
                status: false,
                message: 'No se pudo crear la consulta',
                body: {}
            });
        
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal creando la consulta'
        });
    }
}

export async function updateConsulta(req, res) {
    try {
        const consulta = await Consulta.findByPk(req.params.id);
        if(consulta){
            await consulta.update(req.body);
            return res.json({
                status: true,
                message: 'Consulta actualizada exitosamente',
                body: consulta
            });
        }
        else{
            return res.json({
                status: false,
                message: 'No se encontro la consulta',
                body: {}
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal actualizando la consulta'
        });
    }
}

//cambiar de estado activo / inactivo
export async function deleteConsulta(req, res) {
    try {
        const consulta = await Consulta.findByPk(req.params.id);
        if(!consulta){
            return res.json({
                status: false,
                message: 'No se encontro la consulta',
                body: {}
            });
        }
        else{
            if(consulta.str_con_estado === 'Activo'){
                await consulta.update({str_con_estado: 'Inactivo'});
                await consulta.save();
                return res.json({
                    status: true,
                    message: 'Consulta desactivada exitosamente',
                    body: consulta
                });
            }
            else{
                await consulta.update({str_con_estado: 'Activo'});
                await consulta.save();
                return res.json({
                    status: true,
                    message: 'Consulta activada exitosamente',
                    body: consulta
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal eliminando la consulta'
        });
    }
}