import utils from "./index.util.js"
describe("Utils POPULATE", () => {
  it("Get Database name of COBERTURAS", async () => {
    const populateResult = utils.populateData(
      ["id", "descripcion", "estado"],
      "cobertura",
      false
    )

    expect(populateResult).toEqual([
      "int_id_cobertura",
      "str_descripcion_cobertura",
      "enum_estado_cobertura",
    ])
  })

  // it("Get Database name of POLIZAS", async () => {
  //   const populateResult = utils.populateData(
  //     ["id", "descripcion", "estado"],
  //     "polizas",
  //     false
  //   )

  //   expect(populateResult).toEqual([
  //     "int_id_cobertura",
  //     "str_descripcion_cobertura",
  //     "enum_estado_cobertura",
  //   ])
  // })

  it("Get Database name of PLAZOS with ID", async () => {
    const populateResult = utils.populateData(
      ["per_id_resp", "fechaNuevo", "fechaFin", "numeroNotificacion", "estado"],
      "plazos",
      true
    )

    expect(populateResult).toEqual([
      "int_per_id",
      "dt_fecha_inicio_plazo",
      "dt_fecha_fin_plazo",
      "int_num_dia_notificacion",
      "enum_estado_plazo",
      "int_id_plazo",
    ])
  })

  it("Get Database name of PLAZOS without ID", async () => {
    const populateResult = utils.populateData(
      ["per_id_resp", "fechaNuevo", "fechaFin", "numeroNotificacion", "estado"],
      "plazos",
      false
    )

    expect(populateResult).not.toContain("int_id_plazo")
  })
})
