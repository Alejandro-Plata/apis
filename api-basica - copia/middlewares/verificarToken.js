import jwt from 'jsonwebtoken';

/**
 * Middleware verificarToken
 * 
 * Verifica que el JWT en el header Authorization sea válido.
 * Si es válido, decodifica el payload y continúa.
 * Si es inválido/expirado, rechaza con 403.
 * 
 * Uso en rutas protegidas:
 * router.get('/perfil', verificarToken, (req, res) => {
 *   // req.usuario tiene: id, username, iat, exp
 * });
 * 
 * Cliente debe enviar:
 * Authorization: Bearer eyJhbGciOi...
 * 
 * Ver: JWT_GUIDE.md
 */
export function verificarToken(req, res, next) {
    // Obtener header Authorization: "Bearer token_aqui"
    const authHeader = req.headers.authorization;

    // Si no existe el header
    if (!authHeader) {
        return res.status(403).json({ 
            message: 'Token no proporcionado' 
        });
    }

    try {
        // Extraer token de "Bearer token_aqui"
        const partes = authHeader.split(' ');
        
        if (partes.length !== 2 || partes[0] !== 'Bearer') {
            return res.status(403).json({ 
                message: 'Formato de token inválido. Use: Bearer <token>' 
            });
        }

        const token = partes[1];

        // Verificar y decodificar JWT
        const JWT_SECRET = process.env.JWT_SECRET || 'cambiar-en-produccion';
        
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Guardar datos decodificados en req
        // Disponible en: req.usuario.id, req.usuario.username, etc.
        req.usuario = decoded;
        
        next(); // Continuar a la ruta

    } catch (err) {
        // Errores comunes en verificación
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: 'Token expirado',
                expiredAt: err.expiredAt
            });
        }
        
        if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ 
                message: 'Token inválido',
                error: err.message
            });
        }

        // Error desconocido
        res.status(500).json({ 
            message: 'Error al verificar token',
            error: err.message 
        });
    }
}

export default verificarToken;
