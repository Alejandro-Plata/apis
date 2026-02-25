import sequelize from './db.js';
import './models/Usuario.js'; // Importar modelo para que Sequelize lo registre

async function iniciarBD() {
    try {
        // Sincronizar todos los modelos con la base de datos
        // { force: false } no borra tablas existentes
        await sequelize.sync({ force: false });
        console.log('Tabla "users" creada correctamente o ya existe.');
    } catch (err) {
        console.error('Error al crear las tablas:', err);
    } finally {
        await sequelize.close();
        process.exit();
    }
}

iniciarBD();
