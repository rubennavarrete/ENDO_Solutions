import { Persona } from "../models/persona.js";
import { Medico } from "../models/medico.js";
import { Especialidad } from "../models/especialidad.js";
import { paginarDatos } from "../utils/paginacion.utils.js";
import Utils from "../utils/index.util.js"
import { QueryTypes } from "sequelize"

export const getPersonas = async (req, res) => {
    try{
        const { pagination } = req.query;
        const { query, parameters } = Utils.pagination.getFilterAndPaginationQuery(req.query, "public.tb_personas");
        const result = await Persona.sequelize.query(query, {
            replacements: parameters,
            type: QueryTypes.SELECT,
            
        });
        const count = await Persona.count();
        let pageToMeta = {};
        if (pagination) {
            pageToMeta = JSON.parse(pagination);
        }
        const paginationMetaResult = Utils.pagination.paginate(
            pageToMeta.page,
            pageToMeta.limit,
            count
        );
        return res.json({
            status: true,
            message: "Personas obtenidas exitosamente",
            body: result,
            ...paginationMetaResult,
        });

    }catch(error){
        return res.status(500).json({
            message: error.message || 'Error al obtener las personas'
        });
    }
}

export const getPersonaById = async (req, res) => {
    try {
        const persona = await Persona.findByPk(req.params.id);
        if (persona) {
            return res.json({
                status: true,
                message: "Persona encontrada",
                body: persona,
            });
        } else {
            return res.json({
                status: false,
                message: "Persona no encontrada",
                body: [],
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Error al obtener la persona'
        });
    }
}


export const createPersona = async (req, res) => {
    try {
        const { nombre, apellido, cedula, email, contrasenia, telefono, direccion, tipo, especialidadId } = req.body;
        // Verificar si ya existe una persona con el mismo correo
        const personaExistenteCorreo = await Persona.findOne({
            where: {
                str_per_correo: email,
            },
        });

        // Verificar si ya existe una persona con la misma cédula
        const personaExistenteCedula = await Persona.findOne({
            where: {
                str_per_cedula: cedula,
            },
        });

        if (personaExistenteCorreo && personaExistenteCedula) {
            // Si ya existe una persona con el mismo correo y cédula, responder con un mensaje de error
            return res.status(400).json({
                status: false,
                message: "Ya existe una persona con este correo y cédula",
                body: [],
            });
        }

        if (personaExistenteCorreo) {
            // Si ya existe una persona con el mismo correo, responder con un mensaje de error
            return res.status(400).json({
                status: false,
                message: "Ya existe una persona con este correo electrónico",
                body: [],
            });
        }

        if (personaExistenteCedula) {
            // Si ya existe una persona con la misma cédula, responder con un mensaje de error
            return res.status(400).json({
                status: false,
                message: "Ya existe una persona con esta cédula",
                body: [],
            });
        }

        //buscar si existe especialidad con el id proporcionado
        const especialidad = await Especialidad.findByPk(especialidadId);
        if (!especialidad && tipo === 'Médico') {
            // Si no existe una especialidad con el id proporcionado, responder con un mensaje de error
            return res.status(400).json({
                status: false,
                message: "No existe una especialidad con el id proporcionado",
                body: [],
            });
        }


        if (tipo === 'Médico' && !especialidadId) {
            console.log("es médico y no tiene especialidad")
            // Si el tipo de persona es médico, pero no se proporciona una especialidad, responder con un mensaje de error
            return res.status(400).json({
                status: false,
                message: "Debe proporcionar una especialidad para el médico",
                body: [],
            });
        }

        // Si no hay conflictos, crear la persona utilizando el modelo Persona
        let persona = await Persona.create({
            str_per_nombre: nombre,
            str_per_apellido: apellido,
            str_per_cedula: cedula,
            str_per_correo: email,
            str_per_contrasenia: contrasenia,
            str_per_telefono: telefono,
            str_per_direccion: direccion,
            str_per_estado: 'ACTIVO', // Predeterminado
            str_per_tipo: tipo,
        });

        if (persona) {
            let createdMedico = null;
            // Si se proporciona información de médico, crear el registro correspondiente en la tabla Medico
            if (tipo === 'Médico' && especialidadId) {
                createdMedico = await Medico.create({
                    id_med_medico: persona.id_per_persona, // Asigna el mismo ID que la persona recién creada
                    id_med_especialidad: especialidadId,
                });

                // Actualiza el campo en la entidad Persona con el id_med_especialidad
                //await persona.update({ id_med_especialidad: Medico.id_med_especialidad });
                const personaMedicoInfo = {
                    nombre: persona.str_per_nombre,
                    apellido: persona.str_per_apellido,
                    cedula: persona.str_per_cedula,
                    email: persona.str_per_correo,
                    contrasenia: persona.str_per_contrasenia,
                    telefono: persona.str_per_telefono,
                    direccion: persona.str_per_direccion,
                    tipo: persona.str_per_tipo,
                    id_med_medico: createdMedico ? createdMedico.id_med_medico : null,
                    id_med_especialidad: createdMedico ? createdMedico.id_med_especialidad : null,
                };
                return res.json({
                    status: true,
                    message: "Médico creado exitosamente",
                    body: personaMedicoInfo,
                });
            }
            
            else{
                
                return res.json({
                    status: true,
                    message: "Persona creada exitosamente",
                    body: persona,
                });
            }

        } else {
            return res.json({
                status: false,
                message: "Persona no creada",
                body: [],
            });
        }
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante la creación
        console.log(error);
        res.status(500).json({
            error: 'Error al crear la persona',
        });
    }
};


const validarPersona = async (req, res) => {
    try {
        const { cedula, email } = req.body;
        const personaExistenteCorreo = await Persona.findOne({
            where: {
                str_per_correo: email,
            },
        });

        // Verificar si ya existe una persona con la misma cédula
        const personaExistenteCedula = await Persona.findOne({
            where: {
                str_per_cedula: cedula,
            },
        });

        if (personaExistenteCorreo && personaExistenteCedula) {
            // Si ya existe una persona con el mismo correo y cédula, responder con un mensaje de error
            return res.json({
                status: false,
                message: "Ya existe una persona con este correo y cédula",
                body: [],
            });
        }

        if (personaExistenteCorreo) {
            // Si ya existe una persona con el mismo correo, responder con un mensaje de error
            return res.json({
                status: false,
                message: "Ya existe una persona con este correo electrónico",
                body: [],
            });
        }

        if (personaExistenteCedula) {
            // Si ya existe una persona con la misma cédula, responder con un mensaje de error
            return res.json({
                status: false,
                message: "Ya existe una persona con esta cédula",
                body: [],
            });
        }

    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante la validación
        // console.log(error);
        res.status(500).json({
            error: error.message || 'Error al validar la persona',
        });
        // Si hay un error, devuelve un objeto con status false
        return { status: false };
    }
};


export const updatePersona = async (req, res) => {
    const { nombre, apellido, cedula, email, contrasenia, telefono, direccion, estado, tipo, especialidadId } = req.body;
    let responseBody;

    try {
        // const { id } = req.params;
        const persona = await Persona.findByPk(req.params.id)

        if (persona) {
            await persona.update({
                str_per_nombre: nombre,
                str_per_apellido: apellido,
                str_per_cedula: cedula,
                str_per_correo: email,
                str_per_contrasenia: contrasenia,
                str_per_telefono: telefono,
                str_per_direccion: direccion,
                str_per_estado: estado,
                str_per_tipo: tipo,
            });
            // Actualizar registros relacionados (por ejemplo, Medico)
            if (tipo === 'Médico') {

                const medico = await Medico.findOne({ where: { id_med_medico: persona.id_per_persona } });
                if (medico) {
                    // Actualizar propiedades relacionadas con el médico
                    await medico.update({
                        // Ajusta según las columnas de la tabla Medico
                        id_med_especialidad: especialidadId,
                    });

                    responseBody = {
                        nombre: persona.str_per_nombre,
                        apellido: persona.str_per_apellido,
                        cedula: persona.str_per_cedula,
                        email: persona.str_per_correo,
                        contrasenia: persona.str_per_contrasenia,
                        telefono: persona.str_per_telefono,
                        direccion: persona.str_per_direccion,
                        estado: persona.str_per_estado,
                        tipo: persona.str_per_tipo,
                        id_med_especialidad: medico.id_med_especialidad,
                        id_med_medico: medico.id_med_medico,
                    };
                }
                await persona.save();

                return res.json({
                    status: true,
                    message: "Médico actualizado exitosamente",
                    body: responseBody,
                });

            }else{
                responseBody = await Persona.findByPk(req.params.id);
                await persona.save();
                return res.json({
                    status: true,
                    message: "Persona actualizada exitosamente",
                    body: responseBody,
                });
            }
            
        } else {
            return res.json({
                status: false,
                message: "Persona no encontrada",
                body: [],
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message || 'Error al actualizar la persona',
        });    }
}

export const deletePersona = async (req, res) => {
    try {
        const persona = await Persona.findByPk(req.params.id);
        if (persona) {
            if (persona.str_per_estado == 'ACTIVO') {
                await persona.update({
                    str_per_estado: 'INACTIVO',
                });
                await persona.save();
                return res.json({
                    status: true,
                    message: "Persona desactivada exitosamente",
                    body: persona,
                });
            } else {
                await persona.update({
                    str_per_estado: 'ACTIVO',
                });

                await persona.save();
                return res.json({
                    status: true,
                    message: "Persona activada exitosamente",
                    body: persona,
                });
            }
        }else{
            return res.json({
                status: false,
                message: "Persona no encontrada",
                body: [],
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message || 'Error al eliminar la persona',
        });    }
}
