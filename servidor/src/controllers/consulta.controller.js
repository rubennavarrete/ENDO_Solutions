import { Consulta } from "../models/consulta.js";
import Utils from "../utils/index.util.js"
import { QueryTypes } from "sequelize"

export async function getConsultas(req, res) {
    try {
    
        const { pagination, id_con_paciente } = req.query;
        // console.log("ID----------------------------",id_con_paciente);
        // console.log(req.query);
        const { query, parameters } = Utils.pagination.getFilterAndPaginationQuery(req.query, "public.tb_consulta", id_con_paciente);
    
        // console.log("QUERY----------------------------",query);
        // console.log("PARAMETERS----------------------------",parameters);
        const result = await Consulta.sequelize.query(query, {
            replacements: parameters,
            type: QueryTypes.SELECT,
        })
        // console.log("RESULT----------------------------",result);
        // console.log("COUNT----------------------------",await Consulta.count());
        const count = await Consulta.count();
        let pageToMeta = {};
        if (pagination) {
            pageToMeta = JSON.parse(pagination);
        }
        const paginationMetaResult = Utils.pagination.paginate(
            pageToMeta.page,
            pageToMeta.limit,
            count
        )
        // console.log("PAGINATION----------------------------",paginationMetaResult);
        
        res.json({
            status: true,
            message: "Consultas obtenidas exitosamente",
            body: result,
            ...paginationMetaResult
        })

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
            if(consulta.str_con_estado === 'ACTIVO'){
                await consulta.update({str_con_estado: 'INACTIVO'});
                await consulta.save();
                return res.json({
                    status: true,
                    message: 'Consulta desactivada exitosamente',
                    body: consulta
                });
            }
            else{
                await consulta.update({str_con_estado: 'ACTIVO'});
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