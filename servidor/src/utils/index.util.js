import populateData from "./populate.util.js"
import paginate from "./paginate.util.js"
//import parserXML from "./parserXml.util.js"
import pagination from "./pagginattion.util.js"

/* export default { parser: parserXML, ...paginate, ...populateData }
    Funcion para exportar multiples funciones utils en un solo archivo
*/

// Funcion para exportar en un solo archivo todas las funciones de utils
export default {
// ...parserXML,
 ...paginate,
 ...populateData,
  pagination,
}
