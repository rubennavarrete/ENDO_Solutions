export function paginate(pageSize, pageLimit, count) {
  const _limit = parseInt(pageLimit) || 10
  const _page = parseInt(pageSize) || 1
  return {
    metadata: {
      pagination: {
        previousPage: getPreviousPage(_page),
        currentPage: _page,
        nextPage: getNextPage(_page, _limit, count),
        total: count,
        limit: _limit,
      },
    },
  }
}

const getOffset = (page, limit) => {
  return page * limit - limit
}

const getNextPage = (page, limit, total) => {
  if (total / limit > page) {
    return page + 1
  }

  return null
}

const getPreviousPage = (page) => {
  if (page <= 1) {
    return null
  }
  return page - 1
}

function getFilterAndPaginationQuery(params, from, dato = null) {
  const { filter, order, pagination } = params
  let query = "SELECT * FROM " + from
  let queryToParse = query
  const parameters = {}

  let whereAdded = false;

  if (from === "public.tb_consulta" && dato) {
    query += " WHERE id_con_paciente =" + dato;
    queryToParse += " WHERE id_con_paciente =" + dato;
    parameters.dato = dato;
    whereAdded = true;
  }

  if (from === "public.tb_personas" && dato) {
    // query += " WHERE str_per_tipo = 'Médico'";
    // queryToParse += " WHERE str_per_tipo = 'Médico'";
    query = "SELECT p.id_per_persona, p.str_per_nombre, p.str_per_apellido, p.str_per_cedula, p.str_per_correo, p.str_per_contrasenia, p.str_per_telefono, p.str_per_direccion, p.str_per_estado, p.str_per_tipo, p.int_per_rol, e.id_esp_especialidad, e.str_esp_nombre FROM public.tb_personas p inner join public.tb_medicos m on p.id_per_persona = m.id_med_medico inner join public.tb_especialidad e on m.id_med_especialidad= e.id_esp_especialidad  WHERE str_per_tipo = 'Médico'";
    queryToParse = " SELECT p.id_per_persona, p.str_per_nombre, p.str_per_apellido, p.str_per_cedula, p.str_per_correo, p.str_per_contrasenia, p.str_per_telefono, p.str_per_direccion, p.str_per_estado, p.str_per_tipo, p.int_per_rol, e.id_esp_especialidad, e.str_esp_nombre FROM public.tb_personas p inner join public.tb_medicos m on p.id_per_persona = m.id_med_medico inner join public.tb_especialidad e on m.id_med_especialidad= e.id_esp_especialidad  WHERE str_per_tipo = 'Médico'";
    parameters.dato = dato;
    whereAdded = true;
  }

  if (filter) {
    // const joinFilter = JSON.parse(filter)
    // query = query + " WHERE "
    // queryToParse = queryToParse + " WHERE "

    const joinFilter = JSON.parse(filter);
    query += whereAdded ? " AND " : " WHERE ";
    queryToParse += whereAdded ? " AND " : " WHERE ";
    whereAdded = true;

    if (joinFilter.date) {
      query =
        query +
        joinFilter.date.parameter +
        " BETWEEN '" +
        joinFilter.date.data.date_start +
        "' AND '" +
        joinFilter.date.data.date_end +
        "'"
      queryToParse =
        queryToParse +
        joinFilter.date.parameter +
        " BETWEEN :filterDateStart AND :filterDateEnd"

      parameters.filterDateParam = joinFilter.date.parameter
      parameters.filterDateStart = joinFilter.date.data.date_start
      parameters.filterDateEnd = joinFilter.date.data.date_end
    }

    if (joinFilter.status) {
      const startWithAnd = joinFilter.date ? " AND " : " "
      query =
        query +
        startWithAnd +
        joinFilter.status.parameter +
        " = '" +
        joinFilter.status.data +
        "'"
      queryToParse =
        queryToParse +
        startWithAnd +
        joinFilter.status.parameter +
        " = :filterStatusData"
      parameters.filterStatusParam = joinFilter.status.parameter
      parameters.filterStatusData = joinFilter.status.data
    }

    if (joinFilter.like) {
      const startWithAnd = joinFilter.date || joinFilter.status ? " AND " : " "
      query =
        query +
        startWithAnd +
        "LOWER(" +
        joinFilter.like.parameter +
        ") " +
        " LIKE '%" +
        joinFilter.like.data.toLowerCase() +
        "%'"
      queryToParse =
        queryToParse +
        startWithAnd +
        "LOWER(" +
        joinFilter.like.parameter +
        ") " +
        " LIKE :filterLikeData"
      parameters.filterLikeParam = joinFilter.like.parameter
      parameters.filterLikeData = "%" + joinFilter.like.data.toLowerCase() + "%"
    }
  }

  if (order) {
    const joinFilter = JSON.parse(order)
    query = query + " ORDER BY "
    queryToParse = queryToParse + " ORDER BY "
    joinFilter.forEach((item, index) => {
      const direction = item.direction === "DESC" ? " DESC" : ""
      const finalComma = joinFilter.length - 1 !== index ? "," : ""
      query = query + " " + item.parameter + direction + finalComma
      queryToParse =
        queryToParse + " " + item.parameter + direction + finalComma
      parameters["orderParam_" + index] = item.parameter
    })
  }

  if (pagination) {
    const joinFilter = JSON.parse(pagination)
    const defaultLimit = joinFilter.limit || 10
    const defaultOffset = getOffset(joinFilter.page || 1, defaultLimit)
    query = query + " LIMIT " + defaultLimit + " OFFSET " + defaultOffset
    queryToParse =
      queryToParse + " LIMIT :paginationLimit OFFSET :paginationoffset"

    parameters.paginationLimit = defaultLimit
    parameters.paginationoffset = defaultOffset
  }

  return {
    query: queryToParse,
    queryToParse: query,
    parameters,
    queryCount: queryToParse
      .replace("*", "COUNT(*)")
      .split("LIMIT")[0]
      .split("ORDER BY")[0],
  }
}

export default { paginate, getFilterAndPaginationQuery }
