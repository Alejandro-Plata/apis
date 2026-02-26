import express from 'express';
import jwt from 'jsonwebtoken';
import verificarToken from '../middlewares/verificarToken.js';

const router = express.Router();
const claveSecreta = 'your-secret-key';

// Ruta pública
router.get('/', (req, res) => {
    res.json({ message: 'Estos son datos públicos' });
});

// Ruta protegida
router.get('/protegido', verificarToken, (req, res) => {
    jwt.verify(req.token, claveSecreta, (err, datosAuth) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Estos son datos protegidos',
                datosAuth
            });
        }
    });
});

export default router;
