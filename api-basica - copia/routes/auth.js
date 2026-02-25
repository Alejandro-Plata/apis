import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const router = express.Router();

// Clave secreta para JWT - DEBE estar en .env, NUNCA aquí
const JWT_SECRET = process.env.JWT_SECRET || 'cambiar-en-produccion';

/**
 * POST /api/auth/registro
 * 
 * Registra un nuevo usuario con contraseña encriptada
 * 
 * Body esperado:
 * { "username": "juan", "password": "123456" }
 * 
 * Proceso:
 * 1. Validar que username y password están presentes
 * 2. Verificar que el usuario no existe (unique)
 * 3. Encriptar contraseña con bcrypt
 * 4. Crear usuario en BD con Sequelize
 * 5. Retornar usuario (SIN contraseña)
 * 
 * Ver: BCRYPT_GUIDE.md y SEQUELIZE_GUIDE.md
 */
router.post('/registro', async (req, res) => {
    const { username, password } = req.body;

    // Validar entrada
    if (!username || !password) {
        return res.status(400).json({ 
            message: 'Se requieren nombre de usuario y contraseña' 
        });
    }

    try {
        // Verificar que el usuario no existe
        const usuarioExistente = await Usuario.findOne({ 
            where: { nombreUsuario: username } 
        });
        
        if (usuarioExistente) {
            return res.status(409).json({ 
                message: 'El nombre de usuario ya existe' 
            });
        }

        // Encriptar contraseña con bcrypt
        // 10 rounds = balance entre seguridad y velocidad
        const contrasenaEncriptada = await bcrypt.hash(password, 10);

        // Crear usuario en BD
        const nuevoUsuario = await Usuario.create({
            nombreUsuario: username,
            contrasena: contrasenaEncriptada // Almacenar hash, no plain text
        });

        // Responder (SIN la contraseña)
        res.status(201).json({
            message: 'Usuario registrado correctamente',
            user: { 
                id: nuevoUsuario.id, 
                username: nuevoUsuario.nombreUsuario 
            }
        });
    } catch (err) {
        console.error('Error en registro:', err);
        res.status(500).json({ 
            message: 'Error al registrar el usuario',
            error: err.message 
        });
    }
});

/**
 * POST /api/auth/login
 * 
 * Autentica usuario y retorna JWT token
 * 
 * Body esperado:
 * { "username": "juan", "password": "123456" }
 * 
 * Proceso:
 * 1. Validar que username y password están presentes
 * 2. Buscar usuario en BD
 * 3. Comparar contraseña con bcrypt.compare()
 * 4. Si válido, generar JWT con jwt.sign()
 * 5. Retornar token (expira en 30 minutos)
 * 
 * Ver: JWT_GUIDE.md y BCRYPT_GUIDE.md
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Validar entrada
    if (!username || !password) {
        return res.status(400).json({ 
            message: 'Se requieren nombre de usuario y contraseña' 
        });
    }

    try {
        // Buscar usuario en BD
        const usuario = await Usuario.findOne({ 
            where: { nombreUsuario: username } 
        });

        // Usuario no existe
        if (!usuario) {
            return res.status(401).json({ 
                message: 'Nombre de usuario o contraseña inválidos' 
            });
        }

        // Comparar contraseña (sin desencriptar)
        // bcrypt.compare() verifica password contra hash
        const contrasenaValida = await bcrypt.compare(
            password, 
            usuario.contrasena
        );
        
        if (!contrasenaValida) {
            return res.status(401).json({ 
                message: 'Nombre de usuario o contraseña inválidos' 
            });
        }

        // Contraseña correcta - Generar JWT
        jwt.sign(
            { 
                id: usuario.id, 
                username: usuario.nombreUsuario 
            },
            JWT_SECRET,
            { expiresIn: '30m' }, // Token expira en 30 minutos
            (err, token) => {
                if (err) {
                    return res.status(500).json({ 
                        message: 'Error al generar el token',
                        error: err.message 
                    });
                }
                // Retornar token al cliente
                res.json({ token });
            }
        );
    } catch (err) {
        console.error('Error en login:', err);
        res.status(500).json({ 
            message: 'Error al iniciar sesión',
            error: err.message 
        });
    }
});

export default router;
