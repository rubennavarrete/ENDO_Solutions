import { paginarDatos } from "../utils/paginacion.utils.js";
import { Odontograma } from "../models/odontograma.js";
import Utils from "../utils/index.util.js"
import { QueryTypes } from "sequelize"

export const createOdontograma = async (req, res) =>{
    try {

        const odonto =await Odontograma.create (req.body);
        if (odonto){
            return res.json({
                status: true,
                message: 'Odontograma creado exitosamente',
                body: odonto
            });
        }else{
            return res.json({
                status: false,
                message: 'No se pudo crear el odontograma',
                body: {}
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal al crear el odontograma'
        });
    }
}

export const updateOdontograma = async (req, res) =>{
    try {

        const odonto =await Odontograma.findByPk (req.params.id_odo_odontograma);
        if (odonto){
            await odonto.update(req.body);
            return res.json({
                status: true,
                message: 'Odontograma actualizado exitosamente',
                body: odonto
            });
        }else{
            return res.json({
                status: false,
                message: 'No se pudo actualizar el odontograma',
                body: {}
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal al crear el odontograma'
        });
    }
}

// Eliminar un registro por ID
export const deleteOdontograma = async (req, res) => {
    const { id } = req.params;

    try {
        const rowsDeleted = await Odontograma.destroy({
            where: { id_odo_odontograma: id }
        });

        if (rowsDeleted === 0) {
            return res.status(404).json({ message: 'No se encontró el registro para eliminar.' });
        }

        res.status(200).json({ message: 'Registro eliminado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el registro del odontograma.' });
    }
};

// Obtener un registro específico por ID
export const getOdontogramaById = async (req, res) => {
    const { id } = req.params;

    try {
        const odontograma = await Odontograma.findByPk(id);

        if (!odontograma) {
            return res.status(404).json({ message: 'Registro no encontrado.' });
        }

        res.status(200).json(odontograma);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el registro del odontograma.' });
    }
};

// Obtener todos los registros por ID del paciente
export const getOdontogramaByPaciente = async (req, res) => {

    try {
        const { pagination, id_odo_paciente } = req.query;
        console.log(req.query);

    const { query, parameters } = Utils.pagination.getFilterAndPaginationQuery(req.query, "public.tb_odontogramas", id_odo_paciente);

    const result = await Odontograma.sequelize.query(query, {
        replacements: parameters,
        type: QueryTypes.SELECT,
    })
    const count = await Odontograma.count();
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
            message: "Odontograma obtenido exitosamente",
            body: result,
            ...paginationMetaResult
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal recuperando del odontograma'
        });
    }
};