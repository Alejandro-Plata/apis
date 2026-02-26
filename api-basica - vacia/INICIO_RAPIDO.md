# 🎯 API Autenticación - Guía de Inicio Rápido

Bienvenido al proyecto de **API con Registro, Login y JWT**.

---

## 📚 ¿Por Dónde Empezar?

### Opción A: Quiero ver cómo funciona YA
```bash
npm install
npm run init-db
npm start
```

Luego prueba los endpoints con curl o Postman (ver `README.md`).

---

### Opción B: Quiero entender todo primero

Lee las guías en este orden:

1. **`README.md`** (10 min)
   - Descripción general
   - Setup rápido
   - Endpoints

2. **`BCRYPT_GUIDE.md`** (20 min)
   - Cómo encriptar contraseñas
   - Seguridad
   - Código en contexto

3. **`JWT_GUIDE.md`** (20 min)
   - Qué son los tokens
   - Cómo generar y verificar
   - Flujo completo

4. **`SEQUELIZE_GUIDE.md`** (20 min)
   - Modelos de BD
   - Operaciones CRUD
   - Validaciones

5. **Revisa el código:**
   - `models/Usuario.js` - Modelo de tabla
   - `routes/auth.js` - Lógica de registro y login
   - `middlewares/verificarToken.js` - Verificación JWT
   - `db.js` - Configuración Sequelize

---

## 🏃 Setup en 5 Minutos

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Copiar .env.example a .env
```bash
cp .env.example .env
```

Edita `.env` con tu información:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/mi_api
JWT_SECRET=tu-clave-super-secreta
```

### 3. Crear Base de Datos PostgreSQL
```bash
createdb mi_api
# O en psql:
# psql -U postgres -c "CREATE DATABASE mi_api;"
```

### 4. Inicializar BD (crear tabla users)
```bash
npm run init-db
```

### 5. Iniciar Servidor
```bash
npm start
```

Deberías ver:
```
Conexión a la base de datos establecida correctamente.
Servidor iniciado en http://localhost:3000
```

---

## 🧪 Prueba Los Endpoints

### Registrar Usuario
```bash
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"username":"juan","password":"123456"}'
```

### Login (obtener JWT)
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"juan","password":"123456"}'

# Respuesta:
# {
#   "token": "eyJhbGciOi....."
# }
```

Copia el token.

### Usar Token en Ruta Protegida (si la hay)
```bash
curl http://localhost:3000/api/datos \
  -H "Authorization: Bearer <tu-token-aqui>"
```

---

## 📁 Estructura del Proyecto

```
api-basica - copia/
│
├── 📖 Guías Educativas:
│   ├── README.md              ← Overview completo
│   ├── BCRYPT_GUIDE.md        ← Encriptación de contraseñas
│   ├── JWT_GUIDE.md           ← Tokens de autenticación
│   └── SEQUELIZE_GUIDE.md     ← ORM para bases de datos
│
├── 🔧 Configuración:
│   ├── .env                   ← Variables de entorno (NO versionado)
│   ├── .env.example           ← Template para .env
│   ├── package.json           ← Dependencias
│   └── db.js                  ← Conexión a Sequelize
│
├── 💻 Código Principal:
│   ├── index.js               ← Servidor Express
│   ├── models/
│   │   └── Usuario.js         ← Modelo Sequelize
│   ├── routes/
│   │   ├── auth.js            ← POST /registro y /login
│   │   └── datos.js           ← Ejemplo de ruta privada
│   └── middlewares/
│       └── verificarToken.js  ← Verificación JWT
│
└── 🚀 Inicialización:
    ├── init_db.js             ← Crear tablas
    └── inspect_db.js          ← Ver estructura BD
```

---

## 🎯 Plan de Aprendizaje (2-3 horas)

| Tiempo | Actividad | Archivo |
|--------|-----------|---------|
| 5 min | Setup | Estos pasos |
| 10 min | Leer overview | README.md |
| 20 min | Entender bcrypt | BCRYPT_GUIDE.md |
| 20 min | Entender JWT | JWT_GUIDE.md |
| 20 min | Entender Sequelize | SEQUELIZE_GUIDE.md |
| 30 min | Revisar código | `routes/auth.js` |
| 20 min | Experimentar | Modificar, agregar campos |

**Total:** 2-3 horas para entender profundamente.

---

## 🔨 Tareas para Practicar

Después de entender cómo funciona:

### Nivel 1: Modificar Usuario
- [ ] Agregar campo `email` al modelo Usuario
- [ ] Actualizar `/registro` para pedir email
- [ ] Verificar que email sea único
- [ ] Actualizar JWT para incluir email

**Archivos:** `models/Usuario.js`, `routes/auth.js`

### Nivel 2: Agregar Ruta Privada
- [ ] Crear ruta GET `/api/auth/perfil`
- [ ] Proteger con middleware `verificarToken`
- [ ] Retornar datos del usuario logueado

**Archivos:** `routes/auth.js`, `middlewares/verificarToken.js`

### Nivel 3: Validaciones Mejoradas
- [ ] Password mínimo 8 caracteres
- [ ] Username mínimo 3 caracteres
- [ ] Email válido (regex)
- [ ] Retornar mensajes de error específicos

**Archivo:** `routes/auth.js`

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| `Error: connect ECONNREFUSED` | PostgreSQL no está corriendo. Inicia: `brew services start postgresql` |
| `Error: database does not exist` | Crear BD: `createdb mi_api` |
| `Cannot find module 'bcrypt'` | Ejecutar: `npm install` |
| `SequelizeConnectionRefusedError` | Verifica DATABASE_URL en .env |
| `jwt malformed` | Token inválido o expirado. Haz login de nuevo |

---

## 📚 Recursos Recomendados

- [Sequelize Docs](https://sequelize.org/)
- [bcrypt Documentation](https://www.npmjs.com/package/bcrypt)
- [JWT.io - Debugger](https://jwt.io)
- [Express JS Guide](https://expressjs.com/)
- [OWASP Authentication](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

---

## ✅ Checklist de Competencias

Después de completar este proyecto, debes poder:

- [ ] Explicar por qué se necesita encriptar contraseñas
- [ ] Descripción cómo funciona bcrypt (hash + salt)
- [ ] Explicar estructura de JWT (Header.Payload.Signature)
- [ ] Crear un modelo Sequelize
- [ ] Hacer CRUD con Sequelize
- [ ] Implementar autenticación JWT
- [ ] Crear middleware de verificación
- [ ] Validar datos en backend
- [ ] Manjar errores HTTP correctamente
- [ ] Proteger rutas con tokens

---

## 🚀 Siguientes Pasos (Después de Dominar Esto)

1. **Frontend:** Conectar React/Vue a esta API
   - Login form → POST /registro
   - Guardar token en localStorage
   - Enviar token en headers

2. **Refresh Tokens:** Tokens que no expiren tan rápido
   - Token de acceso: 15 min
   - Refresh token: 7 días

3. **Roles:** Agregar autorización
   - Usuario normal vs Admin
   - Middleware para verificar roles

4. **OAuth:** Login con Google/GitHub
   - Passport.js
   - Delegados autenticación

5. **Testing:** Tests automáticos
   - Jest
   - Supertest

6. **Deployment:** Publicar API
   - Heroku, Railway, Fly.io
   - Manejo de secretos en producción

---

¡Bienvenido a la autenticación profesional! 🔐

Cualquier duda, revisa la guía correspondiente. ¡Mucho éxito! 🚀
