import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Crear instancia de Sequelize con la URL de conexión
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false // Desactivar logs de SQL en consola
});

export default sequelize;
