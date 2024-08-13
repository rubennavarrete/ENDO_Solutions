import twilio from 'twilio';

// Configuración del cliente
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

client.messages
  .create({
    body: '¡Hola! Este es un mensaje de prueba enviado desde Node.js utilizando Twilio.',
    from: 'whatsapp: +593981654855', // Número de Twilio desde el cual enviarás el SMS
    to: '+0987654321'    // Número de teléfono de destino
  })
  .then(message => console.log(`Mensaje enviado con SID: ${message.sid}`))
  .catch(error => console.error('Error al enviar el mensaje:', error));
