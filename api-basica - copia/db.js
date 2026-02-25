/**
 * Configuración de Sequelize - Conexión a Base de Datos PostgreSQL
 * 
 * Sequelize es un ORM (Object-Relational Mapping) que nos permite
 * trabajar con la BD usando objetos JavaScript en lugar de SQL directo.
 * 
 * Documentación: https://sequelize.org/
 */

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

/**
 * Crear instancia de Sequelize
 * 
 * DATABASE_URL debe tener formato:
 * postgresql://usuario:contraseña@host:puerto/base_datos
 * 
 * Ejemplo:
 * postgresql://postgres:123456@localhost:5432/mi_api
 * 
 * Ver .env.example para referencia
 */
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    // dialect: 'postgres' - Usar PostgreSQL como motor de BD
    dialect: 'postgres',
    
    // dialectOptions: Opciones específicas de PostgreSQL
    dialectOptions: {
        // ssl: Requerido para BDs en la nube (AWS RDS, Railway, Render, etc)
        // Para desarrollo local, puede cambiar a: ssl: false
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    
    // logging: false - Desactivar logs de SQL
    // Para debugging, cambiar a: logging: console.log
    logging: false
});

/**
 * Exportar instancia de Sequelize
 * Esta se usará para definir modelos y hacer queries
 */
export default sequelize;
