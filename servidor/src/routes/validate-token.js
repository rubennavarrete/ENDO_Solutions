import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization']


    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        // Tiene token
        try {
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken, process.env.TOKENSECRETO || '3nd050lut10n3s');
            next()
        } catch (error) {
            res.status(401).json({
                message: 'token no valido'
            })
        }

    } else {
        res.status(401).json({
            message: 'Acceso denegado'
        })
    }

}

export default validateToken;