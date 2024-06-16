import { Op } from 'sequelize';

// funcion general para hacer paginacion de los diferentes models de la BD
async function paginarDatos(page, size, modelo, columna, parametro) {
    const skip = (page - 1) * size;
    let where = {}; // Define una condición de filtro vacía por defecto
    // Si columna y parametro tienen valores distintos de cero, crea la condición del filtro
    if(parametro=='ACTIVO'|| parametro=='INACTIVO'){
      where = { [columna]: parametro };
    }else if (columna && parametro) {
      where = { [columna]: { [Op.like]: `%${parametro}%` } };
    }
    const [datos, total] = await Promise.all([
      modelo.findAll({
        limit: size,
        offset: skip,
        order: [['updatedAt', 'DESC']],
        //obtener los últimos datos modificados
        // order: [['updatedAt', 'DESC']],
        where, // Incluye la condición del filtro en el objeto de opciones
      }),
      modelo.count({ where }), // También debes incluir la condición en el conteo
    ]);
    return { datos, total };
  }


  






  export { paginarDatos };