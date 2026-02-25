// Middleware para verificar el token JWT
function verificarToken(req, res, next) {
    const cabecera = req.headers['authorization'];

    if (typeof cabecera !== 'undefined') {
        const partes = cabecera.split(' ');
        const token = partes[1];
        req.token = token;
        next();
    } else {
        res.sendStatus(403);
    }
}

export default verificarToken;
