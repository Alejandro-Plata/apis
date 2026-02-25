/**
 * Servidor API - Autenticación con JWT y bcrypt
 * 
 * Stack:
 * - Express: Framework web
 * - Sequelize: ORM para PostgreSQL
 * - bcrypt: Encriptación de contraseñas
 * - JWT: Tokens de autenticación
 * 
 * Endpoints:
 * - POST /api/auth/registro - Crear usuario
 * - POST /api/auth/login - Generar JWT
 * - GET /api/datos - Ejemplo de ruta protegida
 * 
 * Ver guías: INICIO_RAPIDO.md, README.md
 */

import express from 'express';
import cors from 'cors';
import sequelize from './db.js';

// Importar rutas
import rutasAuth from './routes/auth.js';
import rutasDatos from './routes/datos.js';

const app = express();
const puerto = process.env.PORT || 3000;

// ============ MIDDLEWARES GLOBALES ============

// CORS - Permitir requests desde otros dominios
app.use(cors());

// Body Parser - Parsear JSON en requests
app.use(express.json());

// ============ MONTAR RUTAS ============

/**
 * Rutas de autenticación
 * POST /api/auth/registro - Registrar usuario
 * POST /api/auth/login - Login y obtener JWT
 */
app.use('/api/auth', rutasAuth);

/**
 * Rutas de datos (ejemplo)
 * GET /api/datos - Ruta privada protegida con JWT
 */
app.use('/api/datos', rutasDatos);

// ============ INICIAR SERVIDOR ============

/**
 * Función principal:
 * 1. Verificar conexión a BD
 * 2. Sincronizar modelos Sequelize
 * 3. Iniciar servidor Express
 */
async function iniciar() {
    try {
        // Conectar a PostgreSQL y verificar credenciales
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida correctamente.');

        // Sincronizar todos los modelos con la BD
        // Esto crea las tablas si no existen
        await sequelize.sync({ alter: false });
        console.log('✅ Modelos sincronizados con la base de datos.');

        // Iniciar servidor en el puerto
        app.listen(puerto, () => {
            console.log(`✅ Servidor iniciado en http://localhost:${puerto}`);
            console.log('\n📚 Guías de aprendizaje:');
            console.log('   - INICIO_RAPIDO.md (empieza aquí)');
            console.log('   - README.md (overview)');
            console.log('   - BCRYPT_GUIDE.md (encriptación)');
            console.log('   - JWT_GUIDE.md (tokens)');
            console.log('   - SEQUELIZE_GUIDE.md (modelos)\n');
        });
    } catch (err) {
        console.error('❌ Error al iniciar:', err.message);
        process.exit(1);
    }
}

iniciar();
