//import { Persona } from "../models/persona.js";
import { paginarDatos } from "../utils/paginacion.utils.js";
import { Paciente } from "../models/paciente.js";
import Utils from "../utils/index.util.js"
import { QueryTypes } from "sequelize"


export const createPaciente = async (req, res) => {
    // const { str_pac_nombre,  } = req.body;
    try {
        // const paciente = await Paciente.create(req.body);

        //validar si existe el paciente
        const pacienteExistente = await Paciente.findOne({
            where: {
                str_pac_cedula: req.body.str_pac_cedula
            }
        });

        if (pacienteExistente) {
            return res.json({
                status: false,
                message: 'Ya existe un paciente con la cédula ingresada',
                body: {}
            });
        }

        const { str_pac_nombre, str_pac_apellido, str_pac_cedula,
            str_pac_correo,
            str_pac_sexo,
            str_pac_telefono,
            str_pac_nombre_familia,
            str_pac_telefono_familia,
            str_pac_relacion_familia,
            dt_pac_fecha_nacimiento,
            str_pac_direccion } = req.body;

        const paciente = await Paciente.create({
            str_pac_nombre,
            str_pac_apellido,
            str_pac_cedula,
            str_pac_correo,
            str_pac_sexo,
            str_pac_telefono,
            str_pac_nombre_familia,
            str_pac_telefono_familia,
            str_pac_relacion_familia,
            dt_pac_fecha_nacimiento,
            str_pac_direccion
        });

        if (paciente) {
            return res.json({
                status: true,
                message: 'Paciente creado exitosamente',
                body: paciente
            });
        } else {
            return res.json({
                status: false,
                message: 'No se pudo crear el paciente',
                body: {}
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal creando el paciente'
        });
    }
}

// export async function createPaciente(req, res) {
//     try {
//         const pacienteData = req.body;
//         //const paciente = await Paciente.create();
//         console.log('Paciente:', pacienteData);

//         // console.log('Paciente creado:', paciente.toJSON());
//        // return paciente;
//     } catch (error) {

//         return res.status(500).json({
//             message: error.message || 'Algo salio mal creando el paciente'
//         });
//     }
// }

export async function getPacientes(req, res) {
    console.log('req.query obgtener pacientes back :', req.query);
    //con paginaciion antigua
    /*
    try {
        const paginationDatos = req.query;
        if (paginationDatos.page == "undefined") {
            const { datos, total } = await paginarDatos(1, 10, Paciente, '', '');
            return res.json({
                status: true,
                message: 'Pacientes obtenidos exitosamente',
                body: datos,
                total,
            });
        }
        const pacientes = await Paciente.findAll({ limit: 5 });
        if (pacientes.lenght === 0 || !pacientes) {
            return res.json({
                status: false,
                message: 'No se encontraron pacientes',
                body: []
            });
        } else {
            const { datos, total } = await paginarDatos(paginationDatos.page, paginationDatos.size, Paciente, paginationDatos.parameter, paginationDatos.data);
            return res.json({
                status: true,
                message: 'Pacientes obtenidos exitosamente',
                body: datos,
                total,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal recuperando los pacientes'
        });
    }
        */

    //con paginacion nueva
    try {
        const { pagination } = req.query;
        const { query, parameters } = Utils.pagination.getFilterAndPaginationQuery(req.query, "public.tb_pacientes");
        
        const result = await Paciente.sequelize.query(query, {
            replacements: parameters,
            type: QueryTypes.SELECT,
        })
        const count = await Paciente.count();
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
            message: "Pacientes obtenidos exitosamente",
            body: result,
            ...paginationMetaResult,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal recuperando los pacientes'
        });
    }
}

export async function getPacienteById(req, res) {
    try {
        const paciente = await Paciente.findByPk(req.params.id);
        if (paciente) {
            return res.json({
                status: true,
                message: 'Paciente obtenido exitosamente',
                body: paciente
            });
        }
        else {
            return res.json({
                status: false,
                message: 'No se encontro el paciente',
                body: {}
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal recuperando el paciente'
        });
    }
}

export async function updatePaciente(req, res) {
    console.log("Actualizar paciente", req.body)
    try {
        const paciente = await Paciente.findByPk(req.params.id);
        if (paciente) {
            await paciente.update(req.body);
            return res.json({
                status: true,
                message: 'Paciente actualizado exitosamente',
                body: paciente
            });
        }
        else {
            return res.json({
                status: false,
                message: 'No se encontro el paciente',
                body: {}
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal actualizando el paciente'
        });
    }
}

export async function deletePaciente(req, res) {
    try {
        const paciente = await Paciente.findByPk(req.params.id);
        if (!paciente) {
            return res.json({
                status: false,
                message: 'No se encontro el paciente',
                body: {}
            });
        }
        else {
            if (paciente.str_pac_estado === 'ACTIVO') {
                await paciente.update({ str_pac_estado: 'INACTIVO' });
                await paciente.save();
                return res.json({
                    status: true,
                    message: 'Paciente desactivado exitosamente',
                    body: paciente
                });
            } else {
                await paciente.update({ str_pac_estado: 'ACTIVO' });
                await paciente.save();
                return res.json({
                    status: true,
                    message: 'Paciente activado exitosamente',
                    body: paciente
                });
            }
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal eliminando el paciente'
        });

    }
}

