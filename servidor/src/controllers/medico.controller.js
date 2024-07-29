import { Medico } from "../models/medico.js";
import { Persona } from "../models/persona.js";
import { Especialidad } from "../models/especialidad.js";
import Utils from "../utils/index.util.js"
import { QueryTypes } from "sequelize"


export async function getMedicoById(req, res) {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (medico) {
      const persona = await Persona.findByPk(medico.id);
      if (persona) {
        const combinedData = {
          ...medico.toJSON(), // Convierte el objeto de modelo Medico a un objeto JSON
          ...persona.toJSON() // Convierte el objeto de modelo Persona a un objeto JSON
        };
        return res.json({
          status: true,
          message: 'Médico obtenido exitosamente',
          body: combinedData
        });
      }
    }
    return res.status(404).json({
      status: false,
      message: 'Médico no encontrado'
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error al obtener el médico',
      error: error.message
    });
  }
}

// export async function getMedicos(req, res) {
//   try {
//     const { pagination } = req.query;
//     const { query, parameters } = Utils.pagination.getFilterAndPaginationQuery(req.query, "public.tb_medicos");
//     const result = await Medico.sequelize.query(query, {
//       replacements: parameters,
//       type: QueryTypes.SELECT,
//     });
//     const count = await Medico.count();
//     let pageToMeta = {};
//     if (pagination) {
//       pageToMeta = JSON.parse(pagination);
//     }
//     const paginationMetaResult = Utils.pagination.paginate(
//       pageToMeta.page,
//       pageToMeta.limit,
//       count
//     );
//     return res.json({
//       status: true,
//       message: "Médicos obtenidos exitosamente",
//       body: result,
//       ...paginationMetaResult
//     });

//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || 'Algo salio mal obteniendo los médicos'
//     });
//   }
// }

export async function getMedicos(req, res) {
  try {
    // const { pagination } = req.query;
    // const { query, parameters } = Utils.pagination.getFilterAndPaginationQuery(req.query, "public.tb_medicos");
    // const medicos = await Medico.sequelize.query(query, {
    //   replacements: parameters,
    //   type: QueryTypes.SELECT,
    //   include: [
    //     {
    //       model: Persona,
    //       attributes: ['str_per_nombre', 'str_per_apellido', 'str_per_cedula', 'str_per_correo', 'str_per_telefono', 'str_per_direccion', 'str_per_estado', 'str_per_tipo']
    //     },
    //     {
    //       model: Especialidad,
    //       attributes: ['nombre']
    //     }
    //   ]
    // });

    // console.log("medicos: ", medicos);  

    // const count = await Medico.count();
    // let pageToMeta = {};
    // if (pagination) {
    //   pageToMeta = JSON.parse(pagination);
    // }
    // const paginationMetaResult = Utils.pagination.paginate(
    //   pageToMeta.page,
    //   pageToMeta.limit,
    //   count
    // );

    // return res.json({
    //   status: true,
    //   message: "Médicos obtenidos exitosamente",
    //   body: medicos,
    //   ...paginationMetaResult
    // });

    //obtener los id y nombres de los médicos
    const medicos = await Persona.findAll({
      where: {
        str_per_tipo: 'Médico'
      },
      attributes: ['id_per_persona', 'str_per_nombre', 'str_per_apellido']
    });

    res.json({
      status: true,
      message: "Médicos obtenidos exitosamente",
      body: medicos
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Algo salio mal obteniendo los médicos'
    });
  }
}

export async function createMedico(req, res) {
  try {
    console.log("req.body: ", req.body);


    if (medico) {
      return res.json({
        status: true,
        message: 'Medico creado exitosamente',
        body: medico
      });
    }
    else {
      return res.json({
        status: false,
        message: 'No se pudo crear el medico',
        body: {}
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Algo salio mal creando el medico'
    });
  }
}

export async function updateMedico(req, res) {
  try {
    const { nombre, apellido, cedula, email, contrasenia, telefono, direccion, tipo, especialidadId } = req.body;
    const medico = await Medico.findByPk(req.params.id);
    if (medico) {
      await medico.update({
        nombre,
        apellido,
        matricula,
        especialidadId
      });
      return res.json({
        status: true,
        message: 'Médico actualizado exitosamente',
        body: medico
      });
    }
    else {
      return res.json({
        status: false,
        message: 'No se encontro el médico',
        body: {}
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Algo salio mal actualizando el médico'
    });
  }
}

export async function deleteMedico(req, res) {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (medico) {
      await medico.destroy();
      return res.json({
        status: true,
        message: 'Medico eliminado exitosamente',
        body: medico
      });
    }
    else {
      return res.json({
        status: false,
        message: 'No se encontro el medico',
        body: {}
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Algo salio mal eliminando el medico'
    });
  }
}

