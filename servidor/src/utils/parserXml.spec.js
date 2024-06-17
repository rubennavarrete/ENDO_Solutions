import utils from "./index.util.js"

describe("Parse XML", () => {
  test("Parse correct XML", async () => {
    const mockDataCAS = {
      xmlDatosCas:
        "<cas:serviceResponse xmlns:cas='http://www.yale.edu/tp/cas'>    <cas:authenticationSuccess>        <cas:user>rvalencia@espoch.edu.ec</cas:user>        <cas:attributes>            <cas:sub>Fk2XFjEh0bmSh9nYgpa-y3i7dj7lqDA6-y_88AXjvX4</cas:sub>            <cas:perid>34882</cas:perid>            <cas:isFromNewLogin>true</cas:isFromNewLogin>            <cas:authenticationDate>2022-09-02T20:10:51.048-05:00[America/Guayaquil]</cas:authenticationDate>            <cas:clientName>Institucional</cas:clientName>            <cas:cedula>0803051150</cas:cedula>            <cas:successfulAuthenticationHandlers>ClientAuthenticationHandler</cas:successfulAuthenticationHandlers>            <cas:given_name>Ruben Dario</cas:given_name>            <cas:credentialType>ClientCredential</cas:credentialType>            <cas:upn>rvalencia@espoch.edu.ec</cas:upn>            <cas:authenticationMethod>ClientAuthenticationHandler</cas:authenticationMethod>            <cas:name>Ruben Dario Valencia Navarrete</cas:name>            <cas:longTermAuthenticationRequestTokenUsed>false</cas:longTermAuthenticationRequestTokenUsed>            <cas:family_name>Valencia Navarrete</cas:family_name>            </cas:attributes>    </cas:authenticationSuccess></cas:serviceResponse>",
    }
    const datosCas = await utils.parseXML(mockDataCAS.xmlDatosCas)
    expect(datosCas).toEqual({
      perId: "34882",
      casUpn: "rvalencia@espoch.edu.ec",
      casCedula: "0803051150",
      casUser: "rvalencia@espoch.edu.ec",
      clienteName: "Institucional",
    })
  })
  // test("Parse Bad XML", async () => {
  //   const mockDataCAS = {
  //     xmlDatosCas:
  //       "<cas:serviceResponse xmlns:cas='http://www.yale.edu/tp/cas'    <cas:authenticationSuccess>        <cas:user>rvalencia@espoch.edu.ec</cas:user>        <cas:attributes>            <cas:sub>Fk2XFjEh0bmSh9nYgpa-y3i7dj7lqDA6-y_88AXjvX4</cas:sub>            <cas:perid>34882</cas:perid>            <cas:isFromNewLogin>true</cas:isFromNewLogin>            <cas:authenticationDate>2022-09-02T20:10:51.048-05:00[America/Guayaquil]</cas:authenticationDate>            <cas:clientName>Institucional</cas:clientName>            <cas:cedula>0803051150</cas:cedula>            <cas:successfulAuthenticationHandlers>ClientAuthenticationHandler</cas:successfulAuthenticationHandlers>            <cas:given_name>Ruben Dario</cas:given_name>            <cas:credentialType>ClientCredential</cas:credentialType>            <cas:upn>rvalencia@espoch.edu.ec</cas:upn>            <cas:authenticationMethod>ClientAuthenticationHandler</cas:authenticationMethod>            <cas:name>Ruben Dario Valencia Navarrete</cas:name>            <cas:longTermAuthenticationRequestTokenUsed>false</cas:longTermAuthenticationRequestTokenUsed>            <cas:family_name>Valencia Navarrete</cas:family_name>            </cas:attributes>    </cas:authenticationSuccess></cas:serviceResponse>",
  //   }
  //   expect(await utils.parseXML(mockDataCAS.xmlDatosCas)).toThrow(Error)
  // })
})
