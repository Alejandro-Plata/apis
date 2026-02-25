import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

// Modelo de Usuario - mapea a la tabla 'users' existente
const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombreUsuario: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
        field: 'username' // Nombre real de la columna en la BD
    },
    contrasena: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'password' // Nombre real de la columna en la BD
    }
}, {
    tableName: 'users', // Mantener compatibilidad con la tabla existente
    timestamps: false   // No usar columnas createdAt/updatedAt
});

export default Usuario;
