import { InfoMedica } from "../models/info_medica.js";
import { Paciente } from "../models/paciente.js";
import { paginarDatos } from "../utils/paginacion.utils.js";

export async function getInfoMedicas(req, res) {
    try {
        const paginationDatos = req.query;
        if (paginationDatos.page == "undefined") {
            const { datos, total } = await paginarDatos(1, 10, InfoMedica, '', '');
            return res.json({
                status: true,
                message: 'Información médica obtenida exitosamente',
                body: datos,
                total,
            });
        }
        const infoMedicas = await InfoMedica.findAll({ limit: 5 });
        if (infoMedicas.lenght === 0 || !infoMedicas) {
            return res.json({
                status: false,
                message: 'No se encontraron información médica',
                body: []
            });
        } else {
            const { datos, total } = await paginarDatos(paginationDatos.page, paginationDatos.size, InfoMedica, paginationDatos.parameter, paginationDatos.data);
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
        if (infoMedica) {
            return res.json({
                status: true,
                message: 'Información médica obtenida exitosamente',
                body: infoMedica
            });
        }
        else {
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

        //validar si el paciente existe en tabla paciente
         const pacientePadre = await Paciente.findOne({
            where: {
                id_pac_paciente: req.body.id_inf_paciente

            }
        });
        //validar si el paciente existe en tabla info medica
        const pacienteExiste = await InfoMedica.findOne({
            where: {
                id_inf_paciente: req.body.id_inf_paciente

            }
        });

        if (!pacientePadre) {
            console.log("Paciente no existe, no se puede crear Info medica", req.body)
            return res.status(400).json({
                status: false,
                message: 'La información médica debe estar asociada a un paciente',
                body: {}
            });
        }

        if (pacienteExiste) {
            console.log("Actualizar info medica", req.body)
            //actualizar la información médica
            await pacienteExiste.update({
                str_inf_alergias: req.body.str_inf_alergias,
                str_inf_enfermedades: req.body.str_inf_enfermedades,
                str_inf_medicamentos: req.body.str_inf_medicamentos,
                str_inf_operaciones: req.body.str_inf_operaciones,
                str_inf_tipo_sangre: req.body.str_inf_tipo_sangre,
                str_inf_limitaciones: req.body.str_inf_limitaciones,
                str_inf_habitos_negativos: req.body.str_inf_habitos_negativos,
                str_inf_antecedentes_familiares: req.body.str_inf_antecedentes_familiares,
                str_inf_antecedentes_odontologicos: req.body.str_inf_antecedentes_odontologicos,
                str_inf_antecedentes_personales: req.body.str_inf_antecedentes_personales,
            });
            await pacienteExiste.save();
            const infoMedica = await InfoMedica.findByPk(pacienteExiste.id_inf_info_medica);
            return res.json({
                status: true,
                message: 'Información médica actualizada exitosamente',
                body: infoMedica
            });

        } else {
            console.log("Crear info medica", req.body)
            const infoMedica = await InfoMedica.create(req.body);
            return res.json({
                status: true,
                message: 'Información médica creada exitosamente',
                body: infoMedica
            });
            

        }


    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal creando la Información médica'
        });
    }
}

export async function updateInfoMedica(req, res) {
    try {
        console.log("Actualizar info medica", req.body)
        const infoMedica = await InfoMedica.findByPk(req.params.id);
        if (infoMedica) {
            await infoMedica.update(req.body);
            return res.json({
                status: true,
                message: 'Información médica actualizada exitosamente',
                body: infoMedica
            });
        }
        else {
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
    try {
        const infoMedica = await InfoMedica.findByPk(req.params.id);
        if (!infoMedica) {
            return res.json({
                status: false,
                message: 'No se encontro la Información médica',
                body: {}
            });
        } else {
            if (infoMedica.str_inf_estado === 'Activo') {
                await infoMedica.update({
                    str_inf_estado: 'Inactivo'
                });
                await infoMedica.save();
                return res.json({
                    status: true,
                    message: 'Información médica desactivada exitosamente',
                    body: infoMedica
                });
            } else {
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

    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal eliminando la Información médica'
        });
    }
}

