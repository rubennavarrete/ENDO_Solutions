import utils from "./index.util.js"
describe("Utils PAGINATION", () => {
  it("Get Metadata PAGE 1", async () => {
    const paginationMetaResult = utils.pagination.paginate(1, 10, 300)

    expect(paginationMetaResult).toEqual({
      metadata: {
        pagination: {
          currentPage: 1,
          limit: 10,
          nextPage: 2,
          previousPage: null,
          total: 300,
        },
      },
    })
  })
  it("Get Metadata PAGE 2", async () => {
    const paginationMetaResult = utils.pagination.paginate(2, 10, 300)

    expect(paginationMetaResult).toEqual({
      metadata: {
        pagination: {
          currentPage: 2,
          limit: 10,
          nextPage: 3,
          previousPage: 1,
          total: 300,
        },
      },
    })
  })
})
