import { Medico } from "../models/medico.js";
import { Persona } from "../models/persona.js";
import { Especialidad } from "../models/especialidad.js";
/*
const paginarMedicos = async (page, size, model, where, data) => {
    const skip = (page - 1) * size;
    let where = {}; // Define una condición de filtro vacía por defecto
    // Si columna y parametro tienen valores distintos de cero, crea la condición del filtro
    if (columna && parametro) {
        where = { [columna]: { [Op.like]: `%${parametro}%` } };
    }
    const [datos, total] = await Promise.all([
        model.findAll({
            limit: size,
            offset: skip,
            order: [['updatedAt', 'DESC']],
            //obtener los últimos datos modificados
            // order: [['updatedAt', 'DESC']],
            where, // Incluye la condición del filtro en el objeto de opciones
        }),
        model.count({ where }), // También debes incluir la condición en el conteo
    ]);
    return { datos, total };
};

export async function getMedicos(req, res) {
  try {
    const paginationDatos = req.query;
    if(paginationDatos.page == "undefined"){
        const {datos, total} = await paginarMedicos(1, 10, Medico, '', '');

    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Algo salio mal recuperando los medicos'
  });
  }
}
*/

// const paginarMedicos = async (page, size, where, data) => {
//     try {
//         const skip = (page - 1) * size;

//         const { rows: medicos, count: total } = await Medico.findAndCountAll({
//             include: [
//                 {
//                     model: Persona,
//                     attributes: ['id_per_persona', 'str_per_nombre', 'str_per_apellido', /* ...otras columnas de Persona */],
//                     association: Medico.Persona,
//                 },
//                 {
//                     model: Especialidad,
//                     attributes: ['id_esp_especialidad', 'str_esp_nombre', 'str_esp_descripcion'],
//                 },
//             ],
//             limit: size,
//             offset: skip,
//             order: [['updatedAt', 'DESC']],
//             where,
//         });

//         return { medicos, total };
//     } catch (error) {
//       console.log("error: ", error);
//         throw error;
//     }
// };

// export async function getMedicos(req, res) {
//     try {
//         // const { page = 1, size = 10 } = req.query;
//         const paginationDatos = req.query;
//         console.log("paginationDatos: ", paginationDatos);

//         if(paginationDatos.page == "undefined"){
//             const {medicos, total} = await paginarMedicos(1, 10, '', '');
//             return res.json({
//                 status: true,
//                 message: 'Medicos obtenidos exitosamente',
//                 body: medicos,
//                 total
//             });
//         }
//         const medicos = await Medico.findAll({limit: 5});
//         if(medicos.length === 0 || !medicos){
//             return res.json({
//                 status: false,
//                 message: 'No se encontraron medicos',
//                 body: {}
//             });
//         }else{
//           const paginationDatos = req.query;

//           const {medicos, total} = await paginarMedicos(paginationDatos.page, paginationDatos.size, paginationDatos.parameter, paginationDatos.data);
//             return res.json({
//                 status: true,
//                 message: 'Medicos obtenidos exitosamente',
//                 body: medicos,
//                 total
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message || 'Algo salió mal recuperando los médicos',
//         });
//     }
// }

// funcion general para hacer paginacion de los diferentes models de la BD
// async function paginarMedicos(page, size, modelo, columna, parametro) {
//   const skip = (page - 1) * size;
//   let where = {}; // Define una condición de filtro vacía por defecto
//   // Si columna y parametro tienen valores distintos de cero, crea la condición del filtro
//   if(parametro=='ACTIVO'|| parametro=='INACTIVO'){
//     where = { [columna]: parametro };
//   }else if (columna && parametro) {
//     console.log("parametro: ", parametro);
//     // Añadir la condición específica para 'Médico' si el parametro es igual a 'Médico'
//     where = parametro === 'Médico'
//         ? { [columna]: { [Op.like]: `%${parametro}%` }, str_per_tipo: 'Médico' }
//         : { [columna]: { [Op.like]: `%${parametro}%` } };
// }
//   const [datos, total] = await Promise.all([
//     modelo.findAll({
//       limit: size,
//       offset: skip,
//       order: [['updatedAt', 'DESC']],
//       //obtener los últimos datos modificados
//       // order: [['updatedAt', 'DESC']],
//       where, // Incluye la condición del filtro en el objeto de opciones
//     }),
//     modelo.count({ where }), // También debes incluir la condición en el conteo
//   ]);
//   return { datos, total };
// }

async function paginarMedicos(page, size, modelo, columna, parametro) {
  const skip = (page - 1) * size;
  let where = {}; // Define una condición de filtro vacía por defecto

  // Si columna y parametro tienen valores distintos de cero, crea la condición del filtro
  if (parametro === 'ACTIVO' || parametro === 'INACTIVO') {
      where = { [columna]: parametro };
  } else if (columna && parametro) {
      // Añadir la condición específica para 'Médico' si el parametro es igual a 'Médico'
      where = parametro === 'Médico'
          ? { [columna]: { [Op.like]: `%${parametro}%` }, str_per_tipo: 'Médico' }
          : { [columna]: { [Op.like]: `%${parametro}%` } };
  }

  const [datos, total] = await Promise.all([
    modelo.findAll({
          limit: size,
          offset: skip,
          order: [['updatedAt', 'DESC']],
          where, // Incluye la condición del filtro en el objeto de opciones
          include: 
          // [{
          //     model: Persona,
          //     attributes: ['id_per_persona', 'str_per_nombre', 'str_per_apellido', 'str_per_cedula', 'str_per_correo', 'str_per_contrasenia', 'str_per_telefono', 'str_per_direccion', 'str_per_estado', 'str_per_tipo'],
          //     // as: 'Persona',
          // }],
          [Persona]
      }),
      modelo.count({ where }), // También debes incluir la condición en el conteo
  ]);
 console.log("datos: ", datos);
  return { datos, total };
}

// Resto del código...

export async function getMedicos(req, res) {
  try {
    const paginationDatos = req.query;
    if(paginationDatos.page == "undefined"){
        const {datos, total} = await paginarMedicos(1, 10, Medico, '', '');

        return res.json({
          status: true,
          message: 'Medicos obtenidos exitosamente',
          body: datos,
          total
      });
    }
    else{
      const {datos, total} = await paginarMedicos(paginationDatos.page, paginationDatos.size, Medico, paginationDatos.parameter, paginationDatos.data);

      return res.json({
        status: true,
        message: 'Medicos obtenidos exitosamente',
        body: datos,
        total
    });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Algo salio mal recuperando los medicos'
  });
  }
}

export async function getMedicoById(req, res) {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if(medico){
      return res.json({
        status: true,
        message: 'Medico obtenido exitosamente',
        body: medico
      });
    }
    else{
      return res.json({
        status: false,
        message: 'No se encontro el medico',
        body: {}
      });
    }
   
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Algo salio mal recuperando el medico'
  });
  }
}

export async function createMedico(req, res) {
  try {
    


    if(medico){
      return res.json({
        status: true,
        message: 'Medico creado exitosamente',
        body: medico
      });
    }
    else{
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
    const { nombre, apellido, matricula, especialidadId } = req.body;
    const medico = await Medico.findByPk(req.params.id);
    if(medico){
      await medico.update({
        nombre,
        apellido,
        matricula,
        especialidadId
      });
      return res.json({
        status: true,
        message: 'Medico actualizado exitosamente',
        body: medico
      });
    }
    else{
      return res.json({
        status: false,
        message: 'No se encontro el medico',
        body: {}
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Algo salio mal actualizando el medico'
  });
  }
}

export async function deleteMedico(req, res) {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if(medico){
      await medico.destroy();
      return res.json({
        status: true,
        message: 'Medico eliminado exitosamente',
        body: medico
      });
    }
    else{
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

