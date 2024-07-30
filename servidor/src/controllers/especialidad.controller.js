import e from "express";
import { Especialidad } from "../models/especialidad.js";
import { paginarDatos } from "../utils/paginacion.utils.js";


export async function getEspecialidades(req, res) {
  try {
    const paginationDatos = req.query;
    if(paginationDatos.page == "undefined"){
      const {datos, total} = await paginarDatos(1, 10, Especialidad, '', '');
      return res.json({
        status: true,
        message: 'Especialidades obtenidas exitosamente',
        body: datos,
        total,
      });
    }
    const especialidades = await Especialidad.findAll({limit:5});
    if(especialidades.lenght === 0 || !especialidades){
      return res.json({
        status: false,
        message: 'No se encontraron especialidades',
        body: []
      });
    }else{
      const {datos, total} = await paginarDatos(paginationDatos.page, paginationDatos.size, Especialidad, paginationDatos.parameter, paginationDatos.data);
      return res.json({
        status: true,
        message: 'Especialidades obtenidas exitosamente',
        body: datos,
        total,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Algo salio mal recuperando las especialidades'
  });
  }
}

export async function getEspecialidadesActivas(req, res) {
  try {
    const especialidades = await Especialidad.findAll({
      where: {
        str_esp_estado: 'ACTIVO'
      }
    });
    if(especialidades.lenght === 0 || !especialidades){
      return res.json({
        status: false,
        message: 'No se encontraron especialidades',
        body: []
      });
    }else{
      return res.json({
        status: true,
        message: 'Especialidades obtenidas exitosamente',
        body: especialidades
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Algo salio mal recuperando las especialidades'
  });
  }

}

export async function getEspecialidadById(req, res) {
  try {
    const especialidad = await Especialidad.findByPk(req.params.id);
    if(especialidad){
      return res.json({
        status: true,
        message: 'Especialidad obtenida exitosamente',
        body: especialidad
      });
    }
    else{
      return res.json({
        status: false,
        message: 'No se encontro la especialidad',
        body: {}
      });
    }
   
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Algo salio mal recuperando la especialidad'
  });
  }
}

export async function createEspecialidad(req, res) {
  const { str_esp_nombre, str_esp_descripcion } = req.body;
  try {
    let newEspecialidad = await Especialidad.create({
      str_esp_nombre,
      str_esp_descripcion,
      str_esp_estado : 'ACTIVO'
    }, {
      fields: ['str_esp_nombre', 'str_esp_descripcion', 'str_esp_estado']
    });
    if (newEspecialidad) {
      return res.json({
        status: true,
        message: 'Especialidad creada exitosamente',
        body: newEspecialidad
      });
    }
    else{
      return res.json({
        status: false,
        message: 'No se pudo crear la especialidad',
        body: {}
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      body: {}
    });
  }
}

export async function updateEspecialidad(req, res) {
  const { str_esp_nombre, str_esp_descripcion } = req.body;
  try {
    const especialidad = await Especialidad.findByPk(req.params.id);

    if (!especialidad){
      return res.json({
        status: false,
        message: 'No se encontro la especialidad',
        body: {}
      });
    }else{
      await especialidad.update({
        str_esp_nombre,
        str_esp_descripcion
      });
      await especialidad.save();
      const newEspecialidad = await Especialidad.findByPk(req.params.id);
      return res.json({
        status: true,
        message: 'Especialidad actualizada exitosamente',
        body: newEspecialidad
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteEspecialidad(req, res) {
  
  try {
    const especialidad = await Especialidad.findByPk(req.params.id);
    if (!especialidad){
      return res.json({
        status: false,
        message: 'No se encontro la especialidad',
        body: {}
      });
    }
    else{
      if(especialidad.str_esp_estado == 'ACTIVO'){
        await especialidad.update({
          str_esp_estado: 'INACTIVO'
        });
        await especialidad.save();
        return res.json({
          status: true,
          message: 'Especialidad desactivada exitosamente',
          body: especialidad
        });
      }else{
        await especialidad.update({
          str_esp_estado: 'ACTIVO'
        });
        await especialidad.save();
        return res.json({
          status: true,
          message: 'Especialidad activada exitosamente',
          body: especialidad
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
