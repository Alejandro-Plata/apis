import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

/**
 * Modelo Usuario - Mapea a la tabla 'users' en PostgreSQL
 * 
 * Estructura:
 * - id (PK): identificador único
 * - username: nombre de usuario (único)
 * - password: contraseña encriptada con bcrypt (NUNCA plain text)
 * 
 * Ver guías: BCRYPT_GUIDE.md y SEQUELIZE_GUIDE.md
 */
const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Identificador único'
    },
    nombreUsuario: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
        field: 'username', // Nombre real de la columna en la BD
        validate: {
            len: [3, 255],
            msg: 'Username debe tener entre 3 y 255 caracteres'
        },
        comment: 'Nombre de usuario (único)'
    },
    contrasena: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'password',
        comment: 'Contraseña encriptada con bcrypt (hash)'
    }
}, {
    tableName: 'users',
    timestamps: false, // No usar createdAt/updatedAt
    comment: 'Tabla de usuarios con autenticación'
});

export default Usuario;
