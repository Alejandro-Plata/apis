import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const router = express.Router();
const claveSecreta = 'your-secret-key';

// Ruta de registro
router.post('/registro', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Se requieren nombre de usuario y contraseña' });
    }

    try {
        // Comprobar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ where: { nombreUsuario: username } });
        if (usuarioExistente) {
            return res.status(409).json({ message: 'El nombre de usuario ya existe' });
        }

        // Encriptar contraseña
        const contrasenaEncriptada = await bcrypt.hash(password, 10);

        // Crear usuario
        const nuevoUsuario = await Usuario.create({
            nombreUsuario: username,
            contrasena: contrasenaEncriptada
        });

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            user: { id: nuevoUsuario.id, username: nuevoUsuario.nombreUsuario }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Se requieren nombre de usuario y contraseña' });
    }

    try {
        // Buscar usuario
        const usuario = await Usuario.findOne({ where: { nombreUsuario: username } });

        if (!usuario) {
            return res.status(401).json({ message: 'Nombre de usuario o contraseña inválidos' });
        }

        // Validar contraseña
        const contrasenaValida = await bcrypt.compare(password, usuario.contrasena);
        if (!contrasenaValida) {
            return res.status(401).json({ message: 'Nombre de usuario o contraseña inválidos' });
        }

        // Generar token
        jwt.sign(
            { id: usuario.id, username: usuario.nombreUsuario },
            claveSecreta,
            { expiresIn: '30m' },
            (err, token) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al generar el token' });
                }
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

export default router;
