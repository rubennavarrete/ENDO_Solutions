import app from './app.js';
import variableConfig from './config/variables.config.js';
import sequelize from './database/database.js';

/*
CREACION DE LA TABLA	

*/
import './models/persona.js';
import './models/especialidad.js';
import './models/medico.js';
import './models/paciente.js';
import './models/info_medica.js';
import './models/references.js';
import './models/ubicacion.js';

async function main(port) {
    try {
        // Comprobacion y alerta de la conexion con la base de datos.
        await sequelize.sync({ force: false, logging: false, alter: true });
        sequelize
            .authenticate()
            .then(() => {

                // configura el puerto para escuchar peticiones
                console.log("Servidor: ", process.env.NODE_ENV)
                app.listen(port);
                console.log('Server is listening on port 🚀📡☄️', port);
                console.log('Connection has been established successfully 👽🪄');

            })
    } catch (error) {
        console.log('No se pudo establecer la conexión =>', error.message);
    }
}

main(variableConfig.port);

export default app;