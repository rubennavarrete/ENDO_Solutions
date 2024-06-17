const xml2js = require("xml2js")
const parser = new xml2js.Parser({ attrkey: "ATTR" })

export async function parseXML(xml) {
  const datosUsuariosCAS = {
    perId: "",
    casUpn: "",
    casCedula: "",
    casUser: "",
    clienteName: "",
  }
  return new Promise((resolve, reject) => {
    parser.parseString(xml, (err, result) => {
      if (err) {
        reject(err)
      } else {
        const usuarioSuccessCAS =
          result["cas:serviceResponse"]["cas:authenticationSuccess"][0]
        const atributosCAS = usuarioSuccessCAS["cas:attributes"][0]

        datosUsuariosCAS.casUser = usuarioSuccessCAS["cas:user"][0]
        datosUsuariosCAS.perId = atributosCAS["cas:perid"][0]
        datosUsuariosCAS.casUpn = atributosCAS["cas:upn"][0]
        datosUsuariosCAS.casCedula = atributosCAS["cas:cedula"][0]
        datosUsuariosCAS.clienteName = atributosCAS["cas:clientName"][0]
        resolve(datosUsuariosCAS)
      }
    })
  })
}

export default { parseXML }
