# 🗂️ Sequelize - ORM para PostgreSQL

Guía completa para entender **Sequelize** y cómo se usa en nuestro proyecto.

---

## ¿Qué es Sequelize?

Sequelize es un **ORM** (Object-Relational Mapping) que te permite:
- Trabajar con BD sin escribir SQL
- Definir modelos en JavaScript
- Validaciones automáticas
- Relaciones entre tablas

```javascript
// SQL puro:
SELECT * FROM users WHERE id = 1;

// Sequelize:
Usuario.findByPk(1);
```

---

## Ventajas de Sequelize

| Ventaja | Ejemplo |
|---------|---------|
| No hay SQL injection | Sequelize escapa valores automáticamente |
| Validaciones | `allowNull: false`, `unique: true` |
| Migraciones | Cambios en schema versionados |
| Soporta múltiples BD | PostgreSQL, MySQL, SQLite, etc |
| Relaciones | `belongsTo`, `hasMany`, etc |

---

## Conceptos: Modelos vs Tablas

### Tabla (Base de Datos - SQL)
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

### Modelo (Sequelize - JavaScript)
```javascript
const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombreUsuario: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  },
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
});
```

Sequelize sincroniza automáticamente modelo → tabla.

---

## En Nuestro Código: `models/Usuario.js`

### Importar Dependencias
```javascript
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
```

### Definir Modelo
```javascript
const Usuario = sequelize.define('Usuario', {
  // Campo: id
  id: {
    type: DataTypes.INTEGER,          // Tipo: entero
    autoIncrement: true,              // Auto incrementar
    primaryKey: true                  // Clave primaria
  },
  
  // Campo: nombreUsuario
  nombreUsuario: {
    type: DataTypes.STRING(255),      // Tipo: string máximo 255 chars
    unique: true,                     // No repetidos
    allowNull: false,                 // Obligatorio
    field: 'username'                 // Nombre en BD (snake_case)
  },
  
  // Campo: contrasena
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'password'
  }
}, {
  tableName: 'users',                 // Nombre en la BD
  timestamps: false                   // No createdAt/updatedAt
});

export default Usuario;
```

---

## DataTypes: Tipos de Datos

| DataType | PostgreSQL | Ejemplo |
|----------|-----------|---------|
| INTEGER | INT | `{ type: DataTypes.INTEGER }` |
| STRING | VARCHAR | `{ type: DataTypes.STRING(255) }` |
| BOOLEAN | BOOLEAN | `{ type: DataTypes.BOOLEAN }` |
| DATE | DATE | `{ type: DataTypes.DATE }` |
| DECIMAL | DECIMAL | `{ type: DataTypes.DECIMAL(10,2) }` |
| TEXT | TEXT | `{ type: DataTypes.TEXT }` |
| JSON | JSON | `{ type: DataTypes.JSON }` |

---

## Validaciones en Modelos

### Validaciones Comunes

```javascript
const Usuario = sequelize.define('Usuario', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,                      // Obligatorio
    unique: true,                          // No repetidos
    validate: {
      isEmail: true,                       // Validar email
      len: [5, 255]                        // Largo entre 5 y 255
    }
  },
  
  username: {
    type: DataTypes.STRING,
    validate: {
      len: [3, 20],                        // Min 3, max 20 chars
      isAlphanumeric: true                 // Solo letras y números
    }
  },
  
  edad: {
    type: DataTypes.INTEGER,
    validate: {
      min: 18,                             // Mínimo 18
      max: 120                             // Máximo 120
    }
  },
  
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true                     // Valor por defecto
  }
});
```

---

## Operaciones CRUD

### CREATE (Crear)

```javascript
// En routes/auth.js - POST /registro:
const nuevoUsuario = await Usuario.create({
  nombreUsuario: 'juan',
  contrasena: '$2b$10$...' // Hash de bcrypt
});

// Retorna el registro creado con el ID asignado
```

### READ (Leer)

```javascript
// Buscar por ID
const usuario = await Usuario.findByPk(1);

// Buscar uno que coincida
const usuario = await Usuario.findOne({
  where: { nombreUsuario: 'juan' }
});

// Buscar todos
const usuarios = await Usuario.findAll();

// Con condiciones
const usuarios = await Usuario.findAll({
  where: { activo: true }
});

// Con orden y límite
const usuarios = await Usuario.findAll({
  order: [['id', 'DESC']],
  limit: 10
});
```

### UPDATE (Actualizar)

```javascript
// Actualizar un registro
await Usuario.update(
  { nombreUsuario: 'juan_nuevo' },  // Nuevos valores
  { where: { id: 1 } }              // Condición
);

// O actualizar instancia:
const usuario = await Usuario.findByPk(1);
usuario.nombreUsuario = 'juan_nuevo';
await usuario.save();
```

### DELETE (Eliminar)

```javascript
// Eliminar por ID
await Usuario.destroy({
  where: { id: 1 }
});

// Eliminar múltiples
await Usuario.destroy({
  where: { activo: false }
});

// O instancia:
const usuario = await Usuario.findByPk(1);
await usuario.destroy();
```

---

## Métodos Útiles de Sequelize

| Método | Uso |
|--------|-----|
| `create()` | Crear nuevo registro |
| `findByPk()` | Buscar por clave primaria |
| `findOne()` | Buscar un registro |
| `findAll()` | Buscar múltiples |
| `count()` | Contar registros |
| `update()` | Actualizar |
| `destroy()` | Eliminar |
| `sync()` | Sincronizar modelo con BD |

---

## Sincronizar Modelo con BD

### En `index.js`

```javascript
import sequelize from './db.js';
import Usuario from './models/Usuario.js';

async function iniciar() {
  try {
    // Verificar conexión
    await sequelize.authenticate();
    console.log('BD conectada');

    // Sincronizar modelos (crear tablas)
    await sequelize.sync({ alter: true });
    // alter: true = modificar tablas si existen

    app.listen(3000, () => {
      console.log('Servidor en puerto 3000');
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

iniciar();
```

### Con Script (init_db.js)

```javascript
import sequelize from './db.js';
import Usuario from './models/Usuario.js';

async function initDB() {
  try {
    await sequelize.sync({ force: true });
    // force: true = ELIMINA y recrea (solo para testing)
    
    console.log('Base de datos sincronizada');
  } catch (err) {
    console.error('Error:', err);
  }
}

initDB();
```

**Ejecutar:**
```bash
npm run init-db
```

---

## Validación de Datos antes de Guardar

### Manualmente en la Ruta

```javascript
router.post('/registro', async (req, res) => {
  const { username, password } = req.body;

  // Validaciones
  if (!username || !password) {
    return res.status(400).json({ 
      message: 'Username y password requeridos' 
    });
  }

  if (username.length < 3) {
    return res.status(400).json({ 
      message: 'Username mínimo 3 caracteres' 
    });
  }

  try {
    const usuario = await Usuario.create({
      nombreUsuario: username,
      contrasena: password
    });

    res.status(201).json({ usuario });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ 
        message: 'El usuario ya existe' 
      });
    }
    res.status(500).json({ message: 'Error' });
  }
});
```

---

## Relaciones (Avanzado)

Sequelize permite modelar relaciones entre tablas:

### One-to-Many (1:N)

```javascript
// Un usuario tiene muchos posts
Usuario.hasMany(Post, { foreignKey: 'usuarioId' });
Post.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Uso:
const usuario = await Usuario.findByPk(1, {
  include: Post  // Incluir posts
});
```

### Many-to-Many (N:N)

```javascript
// Muchos estudiantes, muchos cursos
Estudiante.belongsToMany(Curso, { through: 'EstudianteCurso' });
Curso.belongsToMany(Estudiante, { through: 'EstudianteCurso' });
```

---

## Manejo de Errores

```javascript
try {
  const usuario = await Usuario.findOne({ where: { ... } });
} catch (err) {
  // Errores Sequelize comunes
  if (err.name === 'SequelizeUniqueConstraintError') {
    // Campo unique violado
    console.log('El usuario ya existe');
  } else if (err.name === 'SequelizeValidationError') {
    // Validación fallida
    console.log(err.errors);
  } else {
    console.error('Error desconocido:', err);
  }
}
```

---

## Logging: Ver SQL Generado

Para debuggear, puedes ver el SQL que genera Sequelize:

```javascript
// En db.js, cambiar logging:
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: { ... },
  logging: console.log  // Ver SQL en consola
  // logging: false     // Desactivar
});
```

**Salida:**
```
Executing (default): SELECT * FROM "users" WHERE "username" = 'juan';
```

---

## ✅ Checklist

- [ ] Entiendo qué es ORM
- [ ] Difer enciía entre Model y Tabla
- [ ] Puedo definir un modelo simple
- [ ] Sé usar findByPk, findOne, create
- [ ] Entiendo validaciones en modelos
- [ ] Sé manjar errores Sequelize
- [ ] Puedo sincronizar BD

---

## Recursos Oficiales

- [Sequelize Official Docs](https://sequelize.org/)
- [DataTypes Reference](https://sequelize.org/api/v6/class/src/data-types.js~DataTypes)
- [Validations Guide](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/)
- [Associations/Relaciones](https://sequelize.org/docs/v6/core-concepts/assocs/)

---

¡Ahora dominas Sequelize! 🚀
