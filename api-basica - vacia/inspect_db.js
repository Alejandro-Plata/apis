import sequelize from './db.js';

async function inspeccionar() {
    try {
        // Describir la tabla 'users' usando la interfaz de consultas de Sequelize
        const columnas = await sequelize.getQueryInterface().describeTable('users');
        console.log('Columnas en la tabla users:', columnas);
    } catch (err) {
        console.error('Error al inspeccionar la tabla:', err);
    } finally {
        await sequelize.close();
        process.exit();
    }
}

inspeccionar();
