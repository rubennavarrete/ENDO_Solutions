import { Persona } from "../models/persona.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'

export async function login(req, res) {
    try {
        const { correo, contrasena } = req.body;

        const user = await Persona.findOne({
            where: {
                str_per_correo: correo,
                str_per_contrasenia: contrasena
            }
        });

        if (!user) {
            return res.status(400).json({
                message: `Usuario o contraseña incorrectos`,
            });
        }

        const token = jwt.sign(
            {
                id: user.id_per_persona, // Información que incluirás en el token
                correo: user.str_per_correo,
                tipo: user.str_per_tipo,
                estado: user.str_per_estado,
                rol: user.int_per_rol

            },
            process.env.TOKENSECRETO || '3nd050lut10n3s', // Clave secreta
            {
                expiresIn: '2h', // Tiempo de expiración (1 hora en este caso)
            }
        );

        // Si las credenciales coincide
        return res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user.id_per_persona,
                correo: user.str_per_correo,
                nombre: user.str_per_nombre,
                apellido: user.str_per_apellido,
                tipo: user.str_per_tipo,
                rol: user.int_per_rol
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal autenticando al usuario'
        });
    }
}

// export async function forgotPassword(req, res) {
//     try {
//         const { correo } = req.body;

//         // Verificar si el correo existe en la base de datos
//         const user = await Persona.findOne({
//             where: { str_per_correo: correo },
//         });

//         if (!user) {
//             return res.status(404).json({
//                 message: `No existe un usuario con el correo ${correo}`,
//             });
//         }

//         // Configuración del transportador de correo
//         const transporter = nodemailer.createTransport({
//             host: "smtp.gmail.com",
//     port: 465, // Cambiado para conexión segura
//             secure: false, // Usa true si estás en puerto 465
//             // service: "gmail",
//             auth: {
//                 user: process.env.EMAIL_USER || 'melas1603@gmail.com', // Correo del remitente
//                 pass: process.env.EMAIL_PASS || 'jstd pzov ylhv fpf', // Contraseña del remitente
//             },
//         });

//         // Configuración del correo
//         const mailOptions = {
//             from: '"ENDO Solutions" <no-reply@endosolutions.com>', // Nombre y correo del remitente
//             to: correo, // Correo del destinatario
//             subject: "Recuperación de contraseña",
//             text: `Hola ${user.str_per_nombre},\n\nTu contraseña es: ${user.str_per_contrasena}\n\nPor favor, guarda esta información en un lugar seguro.\n\nSaludos,\nEquipo de ENDO Solutions`,
//         };

//         // Enviar el correo
//         await transporter.sendMail(mailOptions);

//         // Respuesta exitosa
//         return res.status(200).json({
//             message: `Se ha enviado la contraseña al correo ${correo}`,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message || "Hubo un problema enviando el correo",
//         });
//     }
// }