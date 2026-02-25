# 🎓 Hoja de Ruta Completa - De Cero a Autenticación JWT

Plan estructurado de aprendizaje para dominar autenticación con bcrypt, JWT y Sequelize.

**⏱️ Tiempo total estimado:** 3-5 horas
**📚 Requisitos previos:** Node.js, npm, PostgreSQL

---

## 📍 Fase 0: Preparación (15-20 minutos)

### Paso 1: Clonar/Copiar proyecto

```bash
cd tu-workspace
cp -r api-basica api-basica-copia api-basica-aprendizaje
cd api-basica-aprendizaje
```

### Paso 2: Crear archivo .env

```bash
cp .env.example .env

# Verificar contenido:
cat .env
```

**Contenido esperado:**
```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/mi_api
JWT_SECRET=tu-super-clave-secreta-cambiar-en-produccion
```

### Paso 3: Instalar dependencias

```bash
npm install
```

**Verificar instalación:**
```bash
npm list | grep -E "(bcrypt|jsonwebtoken|sequelize|express)"
```

### Paso 4: Crear base de datos

```bash
npm run init-db
```

**Output esperado:**
```
✅ Conexión a la base de datos establecida correctamente.
✅ Modelos sincronizados con la base de datos.
✅ Servidor iniciado en http://localhost:3000
```

### ✅ Checklist Fase 0

- [ ] Node.js y npm instalados
- [ ] PostgreSQL corriendo
- [ ] Proyecto copiado
- [ ] `.env` creado con valores correctos
- [ ] `npm install` completado
- [ ] Base de datos creada
- [ ] `npm start` funciona

---

## 📍 Fase 1: Entender Conceptos (60-90 minutos)

Leer en este orden:

### 1.1 Conceptos de Seguridad (20 min)

**Lee:** `README.md` - Sección "🔐 Conceptos Clave"

**Preguntas para validar comprensión:**
- [ ] ¿Por qué no se puede guardar contraseña en texto plano?
- [ ] ¿Qué es un hash?
- [ ] ¿Cuál es la diferencia entre cifrado y hash?
- [ ] ¿Por qué JWT es mejor que sesiones para APIs?

---

### 1.2 Bcrypt: Encriptación de Contraseñas (20 min)

**Lee:** `BCRYPT_GUIDE.md` - Completo

**Conceptos clave:**
- ✅ Hashing vs cifrado
- ✅ Salts y rounds
- ✅ `bcrypt.hash()` - Crear hash
- ✅ `bcrypt.compare()` - Verificar contraseña

**Código de ejemplo:**

```javascript
const bcrypt = require('bcrypt');

// Registrar: hashear contraseña
const contraseña = 'micontraseña123';
const hash = await bcrypt.hash(contraseña, 10); // 10 rounds
console.log(hash); // $2b$10$... (nunca vuelve a la original)

// Login: comparar contraseña
const esValido = await bcrypt.compare(contraseña, hash);
console.log(esValido); // true
```

**Preguntas:**
- [ ] ¿Qué es un "salt round"?
- [ ] ¿Cuánto tiempo tarda bcrypt en hashear?
- [ ] ¿Cómo verifico una contraseña sin desencriptar?

---

### 1.3 JWT: Tokens de Autenticación (25 min)

**Lee:** `JWT_GUIDE.md` - Completo

**Conceptos clave:**
- ✅ Estructura: Header.Payload.Signature
- ✅ `jwt.sign()` - Crear token
- ✅ `jwt.verify()` - Validar token
- ✅ Expiración de tokens
- ✅ Stateless authentication

**Código de ejemplo:**

```javascript
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// Generar token (en login)
const token = jwt.sign(
    { id: 1, nombreUsuario: 'juan' }, // payload
    secret, // firma
    { expiresIn: '30m' } // opciones
);
console.log(token); // eyJhbGci... (3 partes separadas por .)

// Verificar token (en middleware)
const decoded = jwt.verify(token, secret);
console.log(decoded); // { id: 1, nombreUsuario: 'juan', iat, exp }
```

**Preguntas:**
- [ ] ¿Qué es el "payload" de un JWT?
- [ ] ¿Por qué no es seguro guardar datos sensibles en JWT?
- [ ] ¿Cómo se valida un JWT si no guardo nada en servidor?

---

### 1.4 Sequelize: Modelos y BD (25 min)

**Lee:** `SEQUELIZE_GUIDE.md` - Completo

**Conceptos clave:**
- ✅ Sequelize es un ORM (Object-Relational Mapping)
- ✅ Modelos definen tablas
- ✅ DataTypes: STRING, INTEGER, DATE, etc
- ✅ CRUD: Create, Read, Update, Delete
- ✅ sync() sincroniza modelo con BD

**Código de ejemplo:**

```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

// Definir modelo
const Usuario = sequelize.define('Usuario', {
    nombreUsuario: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Usar modelo
const usuario = await Usuario.create({ // CREATE
    nombreUsuario: 'juan',
    contrasena: 'hash_bcrypt'
});

const encontrado = await Usuario.findOne({ // READ
    where: { nombreUsuario: 'juan' }
});

await usuario.update({ contrasena: 'nuevo_hash' }); // UPDATE
await usuario.destroy(); // DELETE
```

**Preguntas:**
- [ ] ¿Cuál es la diferencia entre modelo y tabla?
- [ ] ¿Qué es `findOne()` vs `findAll()`?
- [ ] ¿Cómo declaro un campo como único?

---

### ✅ Checklist Fase 1

- [ ] Entiendo qué es y por qué usar bcrypt
- [ ] Entiendo cómo funciona JWT
- [ ] Puedo explicar estructura Header.Payload.Signature
- [ ] Entiendo qué es un ORM (Sequelize)
- [ ] Sé la diferencia entre hash y cifrado
- [ ] Sé qué es un "salt round"

---

## 📍 Fase 2: Revisar Código Existente (40-50 minutos)

El API ya está parcialmente implementado. Entender cada parte:

### 2.1 Estructura General (10 min)

```
api-basica/
├── index.js              # Servidor Express
├── db.js                 # Conexión Sequelize
├── package.json          # Dependencias
├── .env                  # Variables de entorno
├── routes/
│   ├── auth.js          # POST /registro y /login
│   └── datos.js         # GET /datos (ruta protegida ejemplo)
├── models/
│   └── Usuario.js       # Modelo Sequelize
└── middlewares/
    └── verificarToken.js # JWT verification middleware
```

**Lee:** `index.js` - Entender flow completo

**Preguntas:**
- [ ] ¿Cuál es el orden en que se ejecutan los middlewares?
- [ ] ¿Por qué sequelize.sync() se llama antes de listen()?

---

### 2.2 Modelo Usuario (10 min)

**Lee:** `models/Usuario.js`

**Analizar:**
```javascript
const Usuario = sequelize.define('Usuario', {
    // ¿Qué DataTypes se usan?
    // ¿Cuáles tienen unique: true?
    // ¿Cuáles tienen allowNull: false?
});

module.exports = Usuario;
```

**Preguntas:**
- [ ] ¿Qué campos tiene el Usuario?
- [ ] ¿Por qué nombreUsuario es unique?
- [ ] ¿Qué pasa si intento crear usuario duplicado?

---

### 2.3 Rutas de Autenticación (15 min)

**Lee:** `routes/auth.js` - Completo con comentarios

**Analizar en orden:**

**POST /registro:**
```javascript
// 1. Validar campos requeridos
// 2. Usar bcrypt.hash() para encriptar contraseña
// 3. Usuario.create() para guardar en BD
// 4. Retornar usuario (sin contraseña)
```

**POST /login:**
```javascript
// 1. Validar campos requeridos
// 2. Usuario.findOne() para buscar en BD
// 3. bcrypt.compare() para verificar contraseña
// 4. jwt.sign() para generar token si contraseña es correcta
// 5. Retornar token
```

**Preguntas:**
- [ ] ¿Por qué registro retorna usuario pero no token?
- [ ] ¿Qué pasa si contraseña es incorrecta?
- [ ] ¿Dónde se define la expiración del token?
- [ ] ¿Por qué no retornar contraseña al registro?

---

### 2.4 Middleware de Protección (10 min)

**Lee:** `middlewares/verificarToken.js`

**Analizar:**
```javascript
// 1. Extraer token del header "Authorization: Bearer <token>"
// 2. jwt.verify() para validar firma
// 3. Guardar datos en req.usuario
// 4. Manejar errores (token expirado, inválido, etc)
```

**Casos de error:**
- Sin token → 403 Forbidden
- Token inválido → 403 Forbidden  
- Token expirado → 401 Unauthorized

**Preguntas:**
- [ ] ¿Por qué usar `split(' ')[1]`?
- [ ] ¿Qué diferencia hay entre 401 y 403?
- [ ] ¿Qué datos voy a encontrar en `req.usuario`?

---

### ✅ Checklist Fase 2

- [ ] Entiendo flujo completo en index.js
- [ ] Sé qué campos tiene Usuario
- [ ] Entiendo qué hace POST /registro
- [ ] Entiendo qué hace POST /login
- [ ] Sé cómo funciona middleware verificarToken
- [ ] Sé qué errores pueden ocurrir en cada paso

---

## 📍 Fase 3: Testing Práctico (50-60 minutos)

Probar todos los casos de uso:

### 3.1 Setup de Testing (5 min)

```bash
# Opción A: cURL (todos los SOs)
curl --version # Verificar

# Opción B: Postman (interfaz gráfica)
# Descargar: https://www.postman.com/downloads/

# Opción C: VS Code REST Client (más rápido)
# Instalar: REST Client extension
# Crear: test.http
```

Ver `TESTING.md` para detalles.

---

### 3.2 Flujo Normal: Registro + Login + Acceso (20 min)

**Paso 1: Ejecutar servidor**
```bash
npm start
# Output: ✅ Servidor iniciado en http://localhost:3000
```

**Paso 2: Registrar usuario**
```bash
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario": "juan", "contrasena": "password123"}'

# Respuesta esperada (201):
# {
#   "id": 1,
#   "nombreUsuario": "juan",
#   ...
# }
```

**Paso 3: Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario": "juan", "contrasena": "password123"}'

# Respuesta esperada (200):
# {
#   "token": "eyJhbGci...",
#   "usuario": { "id": 1, "nombreUsuario": "juan" }
# }

# Guardar token:
TOKEN="eyJhbGci..."
```

**Paso 4: Usar token en ruta protegida**
```bash
curl -X GET http://localhost:3000/api/datos \
  -H "Authorization: Bearer $TOKEN"

# Respuesta esperada (200):
# {
#   "mensaje": "Datos privados",
#   "usuario": { "id": 1, "nombreUsuario": "juan", ... }
# }
```

**✅ Marcar completado si:**
- Registro retorna usuario
- Login retorna token
- Ruta protegida funciona con token

---

### 3.3 Pruebas de Error (20 min)

**Error 1: Usuario duplicado**
```bash
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario": "juan", "contrasena": "otro_pass"}'

# Esperado: 400 "El usuario ya existe"
# ✅ O mensaje de error similar
```

**Error 2: Contraseña incorrecta**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario": "juan", "contrasena": "contraseña_mal"}'

# Esperado: 401 "Usuario o contraseña inválidos"
```

**Error 3: Sin token**
```bash
curl -X GET http://localhost:3000/api/datos

# Esperado: 403 "Token requerido"
```

**Error 4: Token inválido**
```bash
curl -X GET http://localhost:3000/api/datos \
  -H "Authorization: Bearer token_falso"

# Esperado: 403 "Token inválido"
```

**Error 5: Token expirado**
```bash
# Esperar 30 minutos O cambiar expiración a 1 segundo en código
curl -X GET http://localhost:3000/api/datos \
  -H "Authorization: Bearer $VIEJO_TOKEN"

# Esperado: 401 "Token expirado"
```

**✅ La mayoría de errores se manejan correctamente**

---

### 3.4 Validar Seguridad (10 min)

**Verificar bcrypt:**
```bash
# Conectar a BD
psql -U postgres -d mi_api

# Ver usuario:
SELECT * FROM "users" WHERE "nombreUsuario" = 'juan';

# Verificar que contrasena empieza con $2b$ (hash bcrypt):
# $2b$10$... (nunca debe ser texto plano)
```

**Verificar JWT:**
```bash
# Ir a: https://jwt.io
# Pegar token completo
# Verificar:
# - Header contiene {"alg": "HS256", "typ": "JWT"}
# - Payload contiene {"id": 1, "nombreUsuario": "juan", "iat", "exp"}
# - Signature muestra "Signature Verified ✓"
```

---

### ✅ Checklist Fase 3

- [ ] Registro funciona
- [ ] Login funciona
- [ ] Token se puede usar en rutas protegidas
- [ ] Usuario duplicado retorna error
- [ ] Contraseña incorrecta retorna error
- [ ] Sin token retorna error
- [ ] Token inválido retorna error
- [ ] Contraseña en BD es hash, no texto plano
- [ ] Token se decodifica correctamente

---

## 📍 Fase 4: Modificaciones y Aprendizaje Práctico (60 minutos)

Ahora que entiendes cómo funciona, MODIFICA el código:

### 4.1 Tarea 1: Agregar Email (Nivel 1 - 15 min)

**Objetivo:** Agregar campo `email` al Usuario

**Pasos:**

1. **Modificar modelo:**

```javascript
// En models/Usuario.js
const Usuario = sequelize.define('Usuario', {
    nombreUsuario: { ... },
    contrasena: { ... },
    // Agregar:
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true } // Validación
    }
});
```

2. **Actualizar DB:**
```bash
# Opción A: Resetear BD (pierde datos)
npm run init-db

# Opción B: Migrate (si tienes Sequelize migrations)
# (Tema avanzado, por ahora usa Opción A)
```

3. **Actualizar routes/auth.js:**

```javascript
// En POST /registro:
const { nombreUsuario, contrasena, email } = req.body;

// Validar:
if (!nombreUsuario || !contrasena || !email) {
    return res.status(400).json({ error: 'Faltan campos' });
}

// Crear:
const usuario = await Usuario.create({
    nombreUsuario,
    contrasena: hash,
    email // Nuevo!
});
```

4. **Probar:**
```bash
npm start

curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{
    "nombreUsuario": "ana",
    "contrasena": "pass123",
    "email": "ana@example.com"
  }'

# Respuesta debe incluir email
```

**🎯 Validar:**
- [ ] Email es `unique: true`
- [ ] Email valida que sea address válido
- [ ] Registro requiere email
- [ ] Email aparece en respuesta (pero no contraseña)

---

### 4.2 Tarea 2: Crear Ruta Protegida /perfil (Nivel 2 - 20 min)

**Objetivo:** Endpoint protegido que devuelve datos del usuario logueado

**Pasos:**

1. **Crear ruta protegida:**

```javascript
// En routes/datos.js o nuevo archivo routes/perfil.js
import express from 'express';
import verificarToken from '../middlewares/verificarToken.js';

const router = express.Router();

// GET /perfil - Ruta PROTEGIDA
router.get('/perfil', verificarToken, async (req, res) => {
    try {
        // req.usuario viene del middleware
        const usuario = await Usuario.findByPk(req.usuario.id);
        
        res.json({
            id: usuario.id,
            nombreUsuario: usuario.nombreUsuario,
            email: usuario.email, // Si lo agregaste
            createdAt: usuario.createdAt
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
```

2. **Montar ruta en index.js:**

```javascript
// En index.js, agregar:
import rutasPerfil from './routes/perfil.js';
app.use('/api', rutasPerfil);
```

3. **Probar:**
```bash
curl -X GET http://localhost:3000/api/perfil \
  -H "Authorization: Bearer $TOKEN"

# Respuesta esperada:
# {
#   "id": 1,
#   "nombreUsuario": "juan",
#   "email": "juan@example.com",
#   "createdAt": "2024-01-15T10:30:00.000Z"
# }
```

**🎯 Validar:**
- [ ] Sin token retorna 403
- [ ] Con token válido retorna datos del usuario
- [ ] No retorna contraseña
- [ ] Retorna email y createdAt

---

### 4.3 Tarea 3: Validaciones Mejoradas (Nivel 3 - 25 min)

**Objetivo:** Agregar validaciones más estrictas

**Cambios:**

1. **En models/Usuario.js:**

```javascript
nombreUsuario: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
        notEmpty: { msg: 'Username no puede estar vacío' },
        len: { args: [3, 20], msg: 'Username debe tener 3-20 caracteres' }
    }
},
contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: { msg: 'Contraseña no puede estar vacía' },
        len: { args: [6, 50], msg: 'Contraseña debe tener mínimo 6 caracteres' }
    }
},
email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
        isEmail: { msg: 'Email debe ser válido' }
    }
}
```

2. **En routes/auth.js - POST /registro:**

```javascript
try {
    const usuario = await Usuario.create({
        nombreUsuario,
        contrasena: hash,
        email
    });
    res.status(201).json(usuario);
} catch (err) {
    // Capturar errores de validación
    if (err.name === 'SequelizeValidationError') {
        const mensajes = err.errors.map(e => e.message);
        return res.status(400).json({ 
            error: 'Validación fallida',
            detalles: mensajes 
        });
    }
    // Capturar unique constraint
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ 
            error: 'El usuario o email ya existe' 
        });
    }
    res.status(500).json({ error: err.message });
}
```

3. **Probar:**

```bash
# Caso 1: Username muy corto
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario": "ab", "contrasena": "pass123", "email": "test@test.com"}'
# Esperado: 400 "Username debe tener 3-20 caracteres"

# Caso 2: Contraseña muy corta
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario": "carlos", "contrasena": "123", "email": "test@test.com"}'
# Esperado: 400 "Contraseña debe tener mínimo 6 caracteres"

# Caso 3: Email inválido
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario": "carlos", "contrasena": "password123", "email": "invalido"}'
# Esperado: 400 "Email debe ser válido"

# Caso 4: Todo válido
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario": "carlos", "contrasena": "password123", "email": "carlos@test.com"}'
# Esperado: 201 - Usuario creado
```

**🎯 Validar:**
- [ ] Username tiene validación de longitud
- [ ] Contraseña tiene validación de longitud
- [ ] Email tiene validación de formato
- [ ] Errores de validación se muestran claramente
- [ ] Usuario duplicado se rechaza

---

### ✅ Checklist Fase 4

- [ ] Agregué campo email al Usuario
- [ ] Email tiene validación
- [ ] Creé ruta protegida /perfil
- [ ] /perfil implementa middleware verificarToken
- [ ] Agregué validaciones en modelo
- [ ] Errores de validación se muestran bien
- [ ] Probé todos los casos de error

---

## 📍 Fase 5: Consolidación y Próximos Pasos (30 minutos)

### 5.1 Documentar lo Aprendido

Crea un archivo `MIS_APUNTES.md`:

```markdown
# Apuntes - Autenticación JWT + bcrypt

## Qué Aprendí

### bcrypt
- Se usa para hashear contraseñas de manera irreversible
- Código: `bcrypt.hash(password, 10)` - hashear
- Código: `bcrypt.compare(password, hash)` - verificar
- 10 = salt rounds (más rounds = más seguro pero lento)

### JWT
- Token con 3 partes: Header.Payload.Signature
- Header: tipo de token y algoritmo
- Payload: datos del usuario (id, username)
- Signature: validar que no fue modificado

### Sequelize
- ORM para trabajar con BD como objetos
- Modelos definen tablas
- DataTypes: STRING, INTEGER, DATE, etc
- Métodos: create(), findOne(), update(), destroy()

## Errores Comunes que Cometí

1. [Ejemplo de error y solución]
2. [Otro error]

## Proyectos Para Practicar Más

1. Agregar rol (admin, user)
2. Refresh tokens
3. Logout (blacklist de tokens)
...
```

---

### 5.2 Refactorización (Opcional)

Si tiene código repetido:

```javascript
// Extraer validaciones a función helper
function validarRegistro(nombreUsuario, contrasena, email) {
    const errores = [];
    
    if (!nombreUsuario || nombreUsuario.length < 3) {
        errores.push('Username de 3-20 caracteres');
    }
    if (!contrasena || contrasena.length < 6) {
        errores.push('Contraseña de mínimo 6 caracteres');
    }
    if (!email || !email.includes('@')) {
        errores.push('Email válido requerido');
    }
    
    return errores;
}

// Usar en ruta:
const errores = validarRegistro(nombreUsuario, contrasena, email);
if (errores.length > 0) {
    return res.status(400).json({ errores });
}
```

---

### 5.3 Próximos Temas a Aprender

Aunque NO son parte de este proyecto, son relacionados:

📚 **Nivel Intermedio:**
1. **Refresh Tokens** - Renovar JWT sin volver a login
2. **Roles y Permisos** - admin vs user
3. **Logout** - Blacklist de tokens
4. **2FA** - Autenticación de dos factores

📚 **Nivel Avanzado:**
1. **OAuth2** - Login con Google, GitHub, etc
2. **Cookies** - Guardar tokens seguros
3. **Sessions** - DB de sesiones activas
4. **Rate Limiting** - Prevenir fuerza bruta
5. **CORS avanzado** - Verificar origen específico

---

### 5.4 Testing Automático

Cuando entiendas bien el código, escribe tests:

```javascript
// test.js - Con librería Jest
describe('Autenticación', () => {
    test('POST /registro crea usuario', async () => {
        const response = await fetch('/api/auth/registro', {
            method: 'POST',
            body: JSON.stringify({ ... })
        });
        expect(response.status).toBe(201);
    });
    
    test('POST /login retorna token', async () => {
        // Test aquí
    });
});
```

**Instalación:**
```bash
npm install --save-dev jest supertest
```

---

### ✅ Checklist Fase 5

- [ ] Documenté lo que aprendí
- [ ] Entiendo cuándo refactorizar código
- [ ] Sé qué aprender próximamente
- [ ] Probé todo sin errores
- [ ] Puedo explicar toda la flujo a alguien más

---

## 🎓 Proyecto Final: Integración Frontend

Si tienes tiempo, integra con frontend React:

```javascript
// En React - Login
const handleLogin = async (nombreUsuario, contrasena) => {
    const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombreUsuario, contrasena })
    });
    const data = await res.json();
    localStorage.setItem('token', data.token); // Guardar
};

// En React - Usar token
const handleGetPerfil = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/api/perfil', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const perfil = await res.json();
    console.log(perfil);
};
```

---

## 📊 Resumen de Competencias Adquiridas

Al completar esta ruta, puedes:

✅ Explicar por qué bcrypt es mejor que SHA256
✅ Implementar registro seguro con bcrypt
✅ Generar JWT y validar su firma
✅ Crear middleware de autenticación
✅ Diseñar base de datos con Sequelize
✅ Manejar errores de autenticación
✅ Probar API manualmente
✅ Debuggear problemas de tokens
✅ Implementar validaciones en modelos
✅ Integrar autenticación en frontend

---

## 🚀 Siguiente Proyecto

Después de dominar autenticación:

1. **Blog API** - CRUD posts con autor
2. **Chat App** - mensajes en tiempo real (Socket.io)
3. **Tienda Online** - Usuarios, productos, órdenes
4. **Sistema de Roles** - Admin, moderador, usuario

---

## 📚 Recursos Adicionales

**Documentación oficial:**
- Bcrypt: https://github.com/kelektiv/node.bcrypt.js
- JWT: https://jwt.io
- Sequelize: https://sequelize.org

**Tutoriales:**
- Express.js: https://expressjs.com
- PostgreSQL: https://www.postgresql.org/docs/

**Debugging:**
- Ver `TESTING.md` para probar endpoints
- Ver `DEBUGGING.md` para troubleshooting

---

## ⏱️ Estimado de Tiempo

- **Fase 0 (Preparación):** 15-20 min ✅
- **Fase 1 (Conceptos):** 60-90 min ✅
- **Fase 2 (Código):** 40-50 min ✅
- **Fase 3 (Testing):** 50-60 min ✅
- **Fase 4 (Modificaciones):** 60 min ✅
- **Fase 5 (Consolidación):** 30 min ✅

**Total: 3-5 horas**

¡Felicidades! 🎉 Dominas autenticación con JWT y bcrypt.

---

**¿Listo para empezar? Comienza con Fase 0 → Fase 1 en orden.**
