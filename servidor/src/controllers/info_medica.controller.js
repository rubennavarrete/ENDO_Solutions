import { InfoMedica } from "../models/info_medica.js";
import { paginarDatos } from "../utils/paginacion.utils.js";

export async function getInfoMedicas(req, res) {
    try {
        const paginationDatos = req.query;
        if(paginationDatos.page == "undefined"){
        const {datos, total} = await paginarDatos(1, 10, InfoMedica, '', '');
        return res.json({
            status: true,
            message: 'Información médica obtenida exitosamente',
            body: datos,
            total,
        });
        }
        const infoMedicas = await InfoMedica.findAll({limit:5});
        if(infoMedicas.lenght === 0 || !infoMedicas){
        return res.json({
            status: false,
            message: 'No se encontraron información médica',
            body: []
        });
        }else{
        const {datos, total} = await paginarDatos(paginationDatos.page, paginationDatos.size, InfoMedica, paginationDatos.parameter, paginationDatos.data);
        return res.json({
            status: true,
            message: 'Información médica obtenida exitosamente',
            body: datos,
            total,
        });
        }
    } catch (error) {
        return res.status(500).json({
        message: error.message || 'Algo salio mal recuperando la informacion medica'
    });
    }
    }

export async function getInfoMedicaById(req, res) {
    try {
        const infoMedica = await InfoMedica.findByPk(req.params.id);
        if(infoMedica){
        return res.json({
            status: true,
            message: 'Información médica obtenida exitosamente',
            body: infoMedica
        });
        }
        else{
        return res.json({
            status: false,
            message: 'No se encontro la información médica',
            body: {}
        });
        }
    
    } catch (error) {
        return res.status(500).json({
        message: error.message || 'Algo salio mal recuperando la información médica'
    });
    }
    }

export async function createInfoMedica(req, res) {
    try {
        const infoMedica = await InfoMedica.create(req.body);
        return res.json({
        status: true,
        message: 'Información médica creada exitosamente',
        body: infoMedica
    });
    } catch (error) {
        return res.status(500).json({
        message: error.message || 'Algo salio mal creando la Información médica'
    });
    }
    }

export async function updateInfoMedica(req, res) {
    try {
        const infoMedica = await InfoMedica.findByPk(req.params.id);
        if(infoMedica){
        await infoMedica.update(req.body);
        return res.json({
            status: true,
            message: 'Información médica actualizada exitosamente',
            body: infoMedica
        });
        }
        else{
        return res.json({
            status: false,
            message: 'No se encontro la Información médica',
            body: {}
        });
        }
    } catch (error) {
        return res.status(500).json({
        message: error.message || 'Algo salio mal actualizando la Información médica'
    });
    }
    }

export async function deleteInfoMedica(req, res) {
    try{
        const infoMedica = await InfoMedica.findByPk(req.params.id);
        if(!infoMedica){
        return res.json({
            status: false,
            message: 'No se encontro la Información médica',
            body: {}
        });
        }else{
            if(infoMedica.str_inf_estado === 'Activo'){
                await infoMedica.update({
                    str_inf_estado: 'Inactivo'
                });
                await infoMedica.save();
                return res.json({
                    status: true,
                    message: 'Información médica desactivada exitosamente',
                    body: infoMedica
                });
        }else{
            await infoMedica.update({
                str_inf_estado: 'Activo'
            });
            await infoMedica.save();
            return res.json({
                status: true,
                message: 'Información médica activada exitosamente',
                body: infoMedica
            });
        }
    }

    }catch (error) {
        return res.status(500).json({
        message: error.message || 'Algo salio mal eliminando la Información médica'
    });
    }
}

