export async function paginate(
  model,
  pageSize,
  pageLimit,
  search = {},
  order = [],
  atributos = []
) {
  try {
    const _limit = parseInt(pageLimit) || 10
    const _page = parseInt(pageSize) || 1
    let options = {
      offset: getOffset(_page, _limit),
      limit: _limit,
    }

    if (Object.keys(search).length) {
      options = { ...options, ...search }
    }

    if (order && order.length) {
      options.order = order
    }

    if (atributos && atributos.length) {
      options.attributes = atributos
    } else {
      options.attributes = {
        exclude: ["updatedAt", "createdAt"],
      }
    }
    const { count, rows } = await model.findAndCountAll(options)

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
      data: rows,
    }
  } catch (err) {
    return {
      status: "failed",
      message: err.message,
    }
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
export default { paginate }
