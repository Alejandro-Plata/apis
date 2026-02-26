# 🔐 API Node + Express + Sequelize + JWT + bcrypt

Sistema de **autenticación profesional** para aprender a implementar:
- **Registro** de usuarios con contraseñas encriptadas
- **Login** con generación de JWT
- **Sequelize** como ORM para PostgreSQL
- **bcrypt** para seguridad
- **Tokens** con expiración

---

## 🗺️ ¿Por Dónde Empiezo?

| Tu Situación | Ir a | Tiempo |
|-------------|------|--------|
| **Acabo de clonar, quiero setup rápido** | [`INICIO_RAPIDO.md`](INICIO_RAPIDO.md) | 5 min |
| **Quiero un plan completo de aprendizaje** | [`HOJA_DE_RUTA.md`](HOJA_DE_RUTA.md) | 3-5 h |
| **Necesito índice de toda la docs** | [`INDICE.md`](INDICE.md) | 5 min |
| **Tengo un error / algo no funciona** | [`DEBUGGING.md`](DEBUGGING.md) | 10-30 min |
| **Quiero probar los endpoints** | [`TESTING.md`](TESTING.md) | 30 min |

---

## 📁 Estructura del Proyecto

```
api-basica - copia/
├── index.js                    ← Servidor Express (punto de entrada)
├── db.js                       ← Configuración Sequelize + PostgreSQL
├── .env                        ← Variables de entorno
├── .env.example                ← Template para .env
├── package.json                ← Dependencias (express, bcrypt, jwt, sequelize)
├── models/
│   └── Usuario.js              ← Modelo Sequelize (tabla users)
├── routes/
│   ├── auth.js                 ← POST /registro y /login
│   └── datos.js                ← Ejemplo de ruta privada
├── middlewares/
│   └── verificarToken.js       ← Verificación de JWT
└── README.md                   ← Este archivo
```

---

## 🎯 Lo Que Aprenderás

### 1. Sequelize (ORM)
- Definir modelos de base de datos
- Validaciones a nivel de modelo
- Queries: create, findOne, findByPk
- Sincronizar con la BD: `sequelize.sync()`

### 2. bcrypt (Encriptación)
- Hash de contraseñas: `bcrypt.hash()`
- Comparación segura: `bcrypt.compare()`
- Salt rounds: qué son y por qué importan
- Por qué NO se deben guardar contraseñas en plain text

### 3. JWT (Tokens)
- Estructura: Header.Payload.Signature
- Generación de tokens: `jwt.sign()`
- Verificación: `jwt.verify()`
- Expiración y refresh tokens

### 4. Arquitectura REST
- Middleware de Express
- Uso de .env para secretos
- Manejo de errores
- Validaciones de input

---

## 🚀 Setup Rápido (5 minutos)

### 1. Instalar Node Modules
```bash
npm install
```

### 2. Configurar Base de Datos PostgreSQL

**Opción A: Local (Recomendado para aprender)**
```bash
# Crear BD en PostgreSQL
createdb mi_api

# O con psql:
psql -U postgres -c "CREATE DATABASE mi_api;"
```

**Opción B: Nube (Supabase, Neon, Railway)**
1. Crea una BD gratuita en [supabase.com](https://supabase.com)
2. Copia la Connection String

### 3. Variables de Entorno

Crea `.env`:
```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/mi_api
JWT_SECRET=tu-super-clave-secreta-cambiar-en-produccion
PORT=3000
```

### 4. Inicializar Base de Datos
```bash
npm run init-db
```

Crea automáticamente la tabla `users` con Sequelize.

### 5. Iniciar Servidor
```bash
npm start
```

✅ Deberías ver:
```
Conexión a la base de datos establecida correctamente.
Servidor iniciado en http://localhost:3000
```

---

## 📡 Endpoints: Pruébalos Ahora

### Registrar Usuario

```bash
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"username":"juan","password":"123456"}'
```

**Response (201):**
```json
{
  "message": "Usuario registrado correctamente",
  "user": {
    "id": 1,
    "username": "juan"
  }
}
```

### Login (Obtener Token)

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"juan","password":"123456"}'
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🔑 Conceptos Clave

### bcrypt - Encriptación de Contraseñas

**¿Por qué?** Las contraseñas NO deben guardarse en texto plano.

**Cómo funciona:**
```javascript
// Registrar:
const hash = await bcrypt.hash("mi_password", 10);
// hash = "$2b$10$iIU8R9EWw5VxMVjqfwrz.e..." (irreversible)

// Login:
const esValida = await bcrypt.compare("mi_password", hash);
// esValida = true (sin desencriptar)
```

**En nuestro código:**
```javascript
// models/Usuario.js - Definir campo password
// routes/auth.js - Hash en registro, compare en login
```

### JWT - Token de Autenticación

**Estructura:** `Header.Payload.Signature`

**Ejemplo decodificado:**
```
Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "id": 1,
  "username": "juan",
  "iat": 1234567890,
  "exp": 1234571890
}

Signature: HMACSHA256(base64(header) + "." + base64(payload), secret)
```

**Cliente → Servidor:**
```
Authorization: Bearer eyJhbGciOi...
```

### `routes/auth.js`
Implementa los dos endpoints principales:
```javascript
// POST /api/auth/registro
// - Valida username/password
// - Verifica que usuario no exista
// - Hash contraseña con bcrypt
// - Crea Usuario en BD con Sequelize
// - Retorna id y username (NO la contraseña)

// POST /api/auth/login
// - Busca usuario por username
// - Compara contraseña con bcrypt.compare()
// - Genera JWT si es válida
// - Retorna token (expira en 30 min)
```

### `middlewares/verificarToken.js`
Valida JWT en rutas protegidas:
```javascript
// - Extrae token de header Authorization
// - Verifica con jwt.verify()
// - Decodifica payload (id, username, etc)
// - Continúa si es válido, rechaza si no
```

### `db.js`
Configuración de Sequelize:
```javascript
// - Conecta a PostgreSQL
// - Lee DATABASE_URL de .env
// - Configura SSL para conexiones seguras
// - Exporta instancia para usar en models
```

### `index.js`
Servidor Express:
```javascript
// - Express app
// - CORS habilitado
// - Middleware express.json()
// - Monta rutas /auth y /datos
// - Sincroniza BD con sequelize.sync()
// - Escucha en puerto 3000
```

---

## 🛠️ Modificaciones Comunes

### Agregar Campo al Usuario

En `models/Usuario.js`, agregar en la definición:
```javascript
email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
    field: 'email'
}
```

Luego:
```bash
npm run init-db
```

### Crear Ruta Protegida

En `routes/auth.js`:
```javascript
import { verificarToken } from '../middlewares/verificarToken.js';

router.get('/perfil', verificarToken, async (req, res) => {
    const usuario = await Usuario.findByPk(req.usuario.id);
    res.json({ usuario });
});
```

### Cambiar Expiración del Token

En `routes/auth.js`:
```javascript
{ expiresIn: '30m' }   // Cambia a lo que necesites
// '30m', '1h', '7d', '30d'
```

---

## ✅ Checklist de Aprendizaje

**Configuración:**
- [ ] npm install completado
- [ ] .env configurado con DATABASE_URL
- [ ] npm run init-db ejecutado
- [ ] npm start funciona sin errores

**Testing:**
- [ ] POST /registro crea usuario
- [ ] Puedo llamarlo con curl/Postman
- [ ] POST /login retorna token válido
- [ ] Token empieza con "eyJ..."

**Conceptos:**
- [ ] Entiendo qué es bcrypt y por qué encripta
- [ ] Entiendo estructura JWT (Header.Payload.Signature)
- [ ] Entiendo diferencia entre hash y encriptación
- [ ] Puedo ver detalles del JWT en [jwt.io](https://jwt.io)

**Sequelize:**
- [ ] Entiendo modelos vs tablas
- [ ] Sé cómo crear nuevo modelo
- [ ] Sé usar findOne, findByPk, create
- [ ] Entiendo validaciones en modelos

---

## 🚀 Próximos Pasos

1. **Agregar validaciones**
   - Email válido (regex)
   - Password fuerte (mayúsculas, números, etc)
   - Username único
   - Campos requeridos

2. **Refresh Tokens**
   - Token de corta duración (15 min)
   - Refresh token de larga duración (7 días)
   - Endpoint para refrescar

3. **Roles y Permisos**
   - Agregar campo `role` al Usuario
   - Middleware para verificar rol
   - Rutas solo para admin

4. **Conectar Frontend**
   - React/Vue llamando a /registro
   - Guardar token en localStorage
   - Próximas requests con Authorization header

5. **Seguridad Extra**
   - Rate limiting
   - HTTPS obligatorio
   - CSRF protection
   - Validaciones más estrictas

---

## 📖 Recursos Educativos

- [Sequelize Documentation](https://sequelize.org/)
- [bcrypt npm package](https://www.npmjs.com/package/bcrypt)
- [JWT.io - Interactive debugger](https://jwt.io)
- [OWASP - Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Express Middleware Guide](https://expressjs.com/en/guide/using-middleware.html)

---

## 🆘 Troubleshooting

| Error | Solución |
|-------|----------|
| `ECONNREFUSED 127.0.0.1:5432` | PostgreSQL no está corriendo. Inicia: `brew services start postgresql` |
| `database does not exist` | Crea la BD: `createdb mi_api` |
| `Cannot find module 'bcrypt'` | Instala: `npm install bcrypt` |
| `jwt malformed` | Token inválido o mal formado. Verifica que no esté expirado |
| `SequelizeConnectionRefusedError` | Revisa DATABASE_URL en .env |

---

**¡Listo para aprender autenticación profesional!** 🎯

### Sequelize - ORM

**Ventajas sobre SQL puro:**
```javascript
// SQL puro:
SELECT * FROM users WHERE username = 'juan';

// Sequelize:
Usuario.findOne({ where: { nombreUsuario: 'juan' } });
```

**Beneficios:**
- No hay SQL injection
- Validaciones en el modelo
- Migraciones automáticas
- Relaciones entre tablas

---

## 📚 Archivos Explicados

### `models/Usuario.js`
Define la estructura de la tabla `users`.
