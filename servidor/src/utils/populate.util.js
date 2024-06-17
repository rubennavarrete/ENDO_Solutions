import dicctionaryMap from "../config/dicctionaryDB.config.js"
export function populateData(populate, model, estado) {
  if (estado) {
    if (!populate.includes("id")) {
      populate.push("id")
    }
  }

  const resul = []
  populate.forEach((item) => {
    if (dicctionaryMap[model][item]) resul.push(dicctionaryMap[model][item])
  })

  return resul
}

export default { populateData }
