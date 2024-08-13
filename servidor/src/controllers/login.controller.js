import { Persona } from "../models/persona.js";

export async function login(req, res) {
    try {
        const { correo, contrasena } = req.body;
        const persona = await Persona.findOne({
            where: {
                str_per_correo: correo,
                str_per_contrasena: contrasena
            }
        });
        if (persona) {
            return res.json({
                status: true,
                message: 'Usuario autenticado',
                body: persona
            });
        } else {
            return res.json({
                status: false,
                message: 'Usuario no autenticado',
                body: {}
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Algo salio mal autenticando al usuario'
        });
    }
}