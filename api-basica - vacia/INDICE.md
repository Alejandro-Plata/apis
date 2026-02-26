# 🗺️ Índice de Documentación API Autenticación

Encuentra rápidamente la documentación que necesitas según tu situación.

---

## 🚀 Acabo de Clonar - ¿POr Dónde Empiezo?

### Si tienes 5 minutos
👉 Lee: [`INICIO_RAPIDO.md`](INICIO_RAPIDO.md) - Setup en 5 pasos

### Si tienes 30 minutos
👉 Lee en orden:
1. [`README.md`](README.md) - Overview del proyecto
2. [`INICIO_RAPIDO.md`](INICIO_RAPIDO.md) - Setup y primeros tests

### Si tienes 1-2 horas
👉 Lee la **Fase 0-1** de [`HOJA_DE_RUTA.md`](HOJA_DE_RUTA.md)
- Preparación (15 min)
- Entender Conceptos (60-90 min)

### Si tienes 3-5 horas (Completo)
👉 Sigue [`HOJA_DE_RUTA.md`](HOJA_DE_RUTA.md) completo de principio a fin

---

## 📚 Estoy Aprendiendo Específicamente...

### 🔐 bcrypt (Encriptación de Contraseñas)

**Concepto:**
- Por qué hashing (no cifrado)
- Qué es salt y rounds
- Cómo bcrypt protege contraseñas

👉 Lee: [`BCRYPT_GUIDE.md`](BCRYPT_GUIDE.md)

**En la ruta:**
- Fase 1.2 en [`HOJA_DE_RUTA.md`](#fase-1-entender-conceptos)

**En el código:**
- `routes/auth.js` - Línea ~25 (registro hashea contraseña)
- `routes/auth.js` - Línea ~58 (login compara contraseña)

**Testing:**
- Ver "7. Comparación bcrypt siempre falla" en [`DEBUGGING.md`](DEBUGGING.md)

---

### 🎫 JWT (JSON Web Tokens)

**Concepto:**
- Estructura Header.Payload.Signature
- Cómo se generan y validan
- Expiración y refresh
- Stateless authentication

👉 Lee: [`JWT_GUIDE.md`](JWT_GUIDE.md)

**En la ruta:**
- Fase 1.3 en [`HOJA_DE_RUTA.md`](#fase-1-entender-conceptos)

**En el código:**
- `routes/auth.js` - Línea ~65 (jwt.sign en login)
- `middlewares/verificarToken.js` - Validar y decodificar token

**Debugging:**
- Usar https://jwt.io para decodificar
- Ver "5. Token inválido" en [`DEBUGGING.md`](DEBUGGING.md)
- Ver "6. Token expirado" en [`DEBUGGING.md`](DEBUGGING.md)

---

### 🗄️ Sequelize (ORM - Base de Datos)

**Concepto:**
- Qué es un ORM
- Modelos vs Tablas
- DataTypes, validaciones
- CRUD: Create, Read, Update, Delete

👉 Lee: [`SEQUELIZE_GUIDE.md`](SEQUELIZE_GUIDE.md)

**En la ruta:**
- Fase 1.4 en [`HOJA_DE_RUTA.md`](#fase-1-entender-conceptos)

**En el código:**
- `models/Usuario.js` - Definición del modelo
- `routes/auth.js` - `Usuario.create()`, `Usuario.findOne()`
- `db.js` - Configuración de conexión

**Debugging:**
- Ver "8. Unique constraint violated" en [`DEBUGGING.md`](DEBUGGING.md)
- Ver "9. Tabla no existe" en [`DEBUGGING.md`](DEBUGGING.md)

---

## 🧪 Quiero Probar los Endpoints

### Testing Manual (cURL, Postman, etc)

👉 Lee: [`TESTING.md`](TESTING.md)

**Pasos:**
1. Registro (POST /api/auth/registro)
2. Login (POST /api/auth/login) → obtener token
3. Usar token en ruta protegida (GET /api/datos)

**Casos de error:**
- Usuario duplicado
- Contraseña incorrecta
- Sin token
- Token inválido
- Token expirado

---

## 🐛 Tengo un Error / No Funciona

### Primero: Identificar el error

| Error | Ir a |
|-------|------|
| "ECONNREFUSED" | [`DEBUGGING.md`](DEBUGGING.md#1-error-listen-eaddrinuse-3000) |
| "password authentication failed" | [`DEBUGGING.md`](DEBUGGING.md#2-error-password-authentication-failed) |
| "database does not exist" | [`DEBUGGING.md`](DEBUGGING.md#3-database-does-not-exist) |
| "Token requerido" | [`DEBUGGING.md`](DEBUGGING.md#4-error-token-requerido) |
| "Token inválido" | [`DEBUGGING.md`](DEBUGGING.md#5-token-inválido) |
| "Token expirado" | [`DEBUGGING.md`](DEBUGGING.md#6-token-expirado) |
| bcrypt error | [`DEBUGGING.md`](DEBUGGING.md#7-comparación-bcrypt-siempre-falla) |
| SQL error | [`DEBUGGING.md`](DEBUGGING.md#8-unique-constraint-violated) |
| Tabla no existe | [`DEBUGGING.md`](DEBUGGING.md#9-tabla-no-existe) |

👉 Ver [`DEBUGGING.md`](DEBUGGING.md) para soluciones detalladas

### Herramientas de debug

```bash
# Ver logs de SQL
# En db.js cambiar: logging: false → logging: console.log

# Decodificar JWT
node -e "console.log(JSON.parse(Buffer.from('PAYLOAD', 'base64').toString()))"

# Conectar a BD
psql -U postgres -d mi_api

# Ver procesos Node
ps aux | grep node
```

---

## 💪 Quiero Practicar / Modificar el Código

### Tareas Progresivas

👉 Ver [`HOJA_DE_RUTA.md`](HOJA_DE_RUTA.md#-fase-4-modificaciones-y-aprendizaje-práctico-60-minutos)

**Nivel 1:** Agregar campo `email`
- Modificar modelo Usuario
- Actualizar validaciones
- Probar registro con email

**Nivel 2:** Crear ruta protegida `/perfil`
- Usar middleware verificarToken
- Devolver datos del usuario autenticado
- Excluir contraseña

**Nivel 3:** Validaciones mejoradas
- Username: 3-20 caracteres
- Contraseña: mínimo 6 caracteres
- Email: válido con @
- Manejo de errores Sequelize

---

## 🔄 Código: De Arriba a Abajo

```
index.js (servidor principal)
  ├─ db.js (conexión a PostgreSQL)
  ├─ routes/auth.js (POST /registro, /login)
  │   └─ models/Usuario.js (model Sequelize)
  │       └─ bcrypt (hashear/comparar contraseña)
  ├─ routes/datos.js (ejemplo ruta protegida)
  │   └─ middlewares/verificarToken.js (validar JWT)
  │       └─ jsonwebtoken (verificar firma)
  └─ .env (variables de entorno)
```

**Flujo de registro:**
1. Cliente: POST /api/auth/registro con {nombreUsuario, contrasena}
2. routes/auth.js: Validar, hashear con bcrypt
3. models/Usuario.js: Guardar en BD con Sequelize
4. BD: Almacenar usuario con contrasena hasheada

**Flujo de login:**
1. Cliente: POST /api/auth/login con {nombreUsuario, contrasena}
2. routes/auth.js: Buscar usuario, comparar con bcrypt
3. Generar JWT con jwt.sign()
4. Cliente: Guardar token en localStorage
5. Cliente: Enviar token en header "Authorization: Bearer <token>"

**Flujo de ruta protegida:**
1. Cliente: GET /api/datos con header "Authorization: Bearer <token>"
2. Middleware verificarToken: Extraer y validar JWT
3. jwt.verify(): Verificar firma con JWT_SECRET
4. routes/datos.js: Acceso garantizado, req.usuario disponible

---

## 📋 Checklist de Comprensión

Marca conforme avances:

### Básico
- [ ] Entiendo por qué bcrypt es mejor que SHA256
- [ ] Sé qué es un JWT y sus 3 partes
- [ ] Entiendo qué es Sequelize y por qué usarlo

### Intermedio
- [ ] Puedo explicar flujo completo: registro → login → acceso
- [ ] Sé los errores comunes y cómo debuggearlos
- [ ] Puedo probar API con cURL/Postman

### Avanzado
- [ ] Puedo modificar código (agregar campos, validaciones)
- [ ] Puedo crear nuevas rutas protegidas
- [ ] Puedo decodificar y validar JWT manualmente
- [ ] Entiendo cada línea de código en routes/auth.js

---

## 🗂️ Mapa de Archivos

```
api-basica-copia/
├── 📄 README.md                    ← Overview del proyecto
├── 📄 INIT_RAPIDO.md               ← Setup en 5 pasos
├── 📄 HOJA_DE_RUTA.md              ← Plan completo 3-5 horas
├── 📄 INDICE.md                    ← Este archivo (tú estás aquí)
├── 📄 TESTING.md                   ← Cómo probar endpoints
├── 📄 DEBUGGING.md                 ← Solución a errores
├── 📖 BCRYPT_GUIDE.md              ← Hash de contraseñas
├── 📖 JWT_GUIDE.md                 ← Tokens autenticación
├── 📖 SEQUELIZE_GUIDE.md           ← Base de datos ORM
├── .env                            ← Variables de entorno
├── .env.example                    ← Template de .env
├── package.json                    ← Dependencias
├── index.js                        ← Servidor Express
├── db.js                           ← Conexión PostgreSQL
├── models/
│   └── Usuario.js                  ← Modelo de usuario
├── routes/
│   ├── auth.js                     ← POST /registro, /login
│   └── datos.js                    ← GET /datos (protegido)
└── middlewares/
    └── verificarToken.js           ← Validar JWT
```

---

## 🎯 Plan por Objetivo

### "Quiero entender la autenticación JWT"
1. Lee [`JWT_GUIDE.md`](JWT_GUIDE.md)
2. Lee Fase 1.3 en [`HOJA_DE_RUTA.md`](HOJA_DE_RUTA.md)
3. Decodifica ejemplos en https://jwt.io
4. Lee `routes/auth.js` líneas 65-75
5. Prueba con `TESTING.md`

### "Quiero aprender bcrypt"
1. Lee [`BCRYPT_GUIDE.md`](BCRYPT_GUIDE.md)
2. Lee Fase 1.2 en [`HOJA_DE_RUTA.md`](HOJA_DE_RUTA.md)
3. Lee `routes/auth.js` líneas 25-35 (registro)
4. Lee `routes/auth.js` líneas 58-70 (login verify)
5. Testing: Prueba contraseña correcta e incorrecta

### "Quiero aprender Sequelize"
1. Lee [`SEQUELIZE_GUIDE.md`](SEQUELIZE_GUIDE.md)
2. Lee Fase 1.4 en [`HOJA_DE_RUTA.md`](HOJA_DE_RUTA.md)
3. Lee `models/Usuario.js` completo
4. Lee `routes/auth.js` líneas 20-45 (create)
5. Lee `routes/auth.js` líneas 48-75 (findOne)
6. Ve a PostgreSQL: `SELECT * FROM "users";`

### "Quiero hacer un proyecto similar"
1. Lee [`HOJA_DE_RUTA.md`](HOJA_DE_RUTA.md) completo
2. Completa Fase 0-3 (3-4 horas)
3. Personaliza en Fase 4 (modificaciones)
4. Entiende cada tecnología (bcrypt, JWT, Sequelize)

---

## 💬 Preguntas Frecuentes

### "¿Por dónde empiezo?"
→ [`INICIO_RAPIDO.md`](INICIO_RAPIDO.md) (5 min setup)

### "¿Cómo funciona bcrypt?"
→ [`BCRYPT_GUIDE.md`](BCRYPT_GUIDE.md) + Conceptos Fase 1.2

### "¿Cómo funciona JWT?"
→ [`JWT_GUIDE.md`](JWT_GUIDE.md) + Conceptos Fase 1.3

### "¿Cómo uso la API de forma manual?"
→ [`TESTING.md`](TESTING.md) con cURL/Postman

### "¿Tengo un error, qué hago?"
→ [`DEBUGGING.md`](DEBUGGING.md) - Busca el error

### "¿Qué tareas puedo practicar?"
→ [`HOJA_DE_RUTA.md#-fase-4`](HOJA_DE_RUTA.md#fase-4) - Nivel 1-3

### "¿Hacia dónde seguir después?"
→ [`HOJA_DE_RUTA.md#-fase-5`](HOJA_DE_RUTA.md#fase-5) - Próximos pasos

---

## 🎓 Ruta Recomendada

### Para Aprender Desde Cero (3-5 horas)
```
1. INICIO_RAPIDO (5 min)
   ↓
2. README + Conceptos básicos (20 min)
   ↓
3. BCRYPT_GUIDE (20 min)
   ↓
4. JWT_GUIDE (25 min)
   ↓
5. SEQUELIZE_GUIDE (20 min)
   ↓
6. HOJA_DE_RUTA Fase 2-3 (90 min)
   ↓
7. TESTING con ejemplos reales (60 min)
   ↓
8. HOJA_DE_RUTA Fase 4 (modificaciones) (60 min)
```

### Para Debuggear Problemas
```
1. Ver error exacto
   ↓
2. Buscar en DEBUGGING.md
   ↓
3. Seguir soluciones
   ↓
4. Si persiste: revisar logs en terminal
```

### Para Practicar/Modificar
```
1. HOJA_DE_RUTA Fase 4
   ↓
2. Nivel 1: Agregar campo email
   ↓
3. Nivel 2: Ruta /perfil protegida
   ↓
4. Nivel 3: Validaciones mejoradas
```

---

## 📊 Dependencias y Tecnologías

| Tech | Docs | Usada en |
|------|------|----------|
| Express | https://expressjs.com | `index.js` |
| Sequelize | https://sequelize.org | `models/`, `db.js` |
| PostgreSQL | https://postgresql.org | `DATABASE_URL` |
| bcrypt | https://github.com/kelektiv/node.bcrypt.js | `routes/auth.js` |
| JWT | https://jwt.io | `routes/auth.js`, `middlewares/` |
| CORS | https://expressjs.com/resources/middleware/cors.html | `index.js` |
| dotenv | https://github.com/motdotla/dotenv | `.env` |

---

## 🚀 Siguientes Pasos

Una vez domines esto:

1. **Refresh Tokens** - Renovar JWT sin volver a login
2. **Roles/Permisos** - admin vs user
3. **Logout** - Invalidar tokens
4. **2FA** - Autenticación de dos factores
5. **OAuth2** - Login con Google/GitHub
6. **Frontend React** - Integrar con autenticación

---

## 📞 Resumen Rápido

| Necesito... | Ir a... | Tiempo |
|-----------|---------|--------|
| Setup rápido | `INICIO_RAPIDO.md` | 5 min |
| Entender todo | `HOJA_DE_RUTA.md` | 3-5 h |
| Aprender bcrypt | `BCRYPT_GUIDE.md` | 20 min |
| Aprender JWT | `JWT_GUIDE.md` | 25 min |
| Aprender Sequelize | `SEQUELIZE_GUIDE.md` | 20 min |
| Probar API | `TESTING.md` | 30 min |
| Debuggear error | `DEBUGGING.md` | 10-30 min |
| Tareas práctica | `HOJA_DE_RUTA.md` Fase 4 | 60 min |

---

**Última actualización:** 2024
**Estado:** Listo para aprender ✅
