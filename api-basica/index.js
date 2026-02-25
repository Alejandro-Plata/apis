import express from 'express';
import cors from 'cors';
import sequelize from './db.js';

// Importar rutas
import rutasAuth from './routes/auth.js';
import rutasDatos from './routes/datos.js';

const app = express();
const puerto = 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Montar rutas
app.use('/api/auth', rutasAuth);
app.use('/api/datos', rutasDatos);

// Iniciar servidor y verificar conexión a la base de datos
async function iniciar() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    app.listen(puerto, () => {
      console.log(`Servidor iniciado en http://localhost:${puerto}`);
    });
  } catch (err) {
    console.error('Error al conectar con la base de datos:', err);
  }
}

iniciar();
