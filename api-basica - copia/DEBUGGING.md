# 🐛 Debugging and Troubleshooting Guide

Soluciones a problemas comunes al desarrollar con la API de autenticación.

---

## 📋 Tabla Rápida de Soluciones

| Problema | Causa | Solución |
|----------|-------|----------|
| API no inicia | Puerto ocupado | Cambiar `PORT` en `.env` |
| No conecta a BD | Credenciales mal | Verificar `DATABASE_URL` |
| Usuario no se crea | BD desincronizada | `npm run init-db` |
| JWT inválido | Signature mal | Verificar `JWT_SECRET` |
| bcrypt falla | Rounds incorrectos | Usar 8-12 rounds |
| Token no se envía | Formato Bearer mal | `"Bearer <token>"` |

---

## 🔴 Problemas de Inicio

### 1. "Error: listen EADDRINUSE :::3000"

**Causa:** Puerto 3000 ya está en uso

**Soluciones:**

```bash
# Opción A: Cambiar puerto en .env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://...
JWT_SECRET=...

# Opción B: Matar proceso en puerto 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

---

### 2. "error: password authentication failed for user"

**Causa:** PostgreSQL rechaza las credenciales

**Verificar:**

```bash
# 1. Credenciales en .env
cat .env | grep DATABASE_URL

# 2. Formato correcto:
# postgresql://usuario:contraseña@hostname:puerto/nombrebd

# 3. Test de conexión manual
psql postgresql://usuario:contraseña@localhost:5432/mi_api -c "SELECT 1"

# 4. Usuarios creados en PostgreSQL
sudo -u postgres psql -c "\du"
```

**Soluciones:**

```bash
# Si usuario no existe, crear:
sudo -u postgres createuser -P tu_usuario
# Te pedirá contraseña

# Si BD no existe, crear:
sudo -u postgres createdb -O tu_usuario mi_api

# Actualizar .env con credenciales correctas
DATABASE_URL=postgresql://tu_usuario:tu_contraseña@localhost:5432/mi_api
```

---

### 3. "database does not exist" o "Sequelize sync failed"

**Causa:** Base de datos no existe o tabla no sincronizada

**Soluciones:**

```bash
# Opción A: Crear BD manualmente
psql -U postgres
CREATE DATABASE mi_api;
\connect mi_api

# Opción B: Usar script init-db
npm run init-db

# Opción C: Resetear completamente
# En PostgreSQL:
DROP DATABASE IF EXISTS mi_api;
CREATE DATABASE mi_api;

# En Node.js (una única vez):
npm start
# Sequelize sincroniza automáticamente con sequelize.sync()
```

---

## 🔑 Problemas de Autenticación

### 4. "Error: Token requerido" o 403 Forbidden

**Causa:** No se envía token o formato Bearer incorrecto

**Verificar request:**

```bash
# ❌ Incorrecto - Sin Authorization header
curl -X GET http://localhost:3000/api/datos

# ✅ Correcto - Con Authorization header
curl -X GET http://localhost:3000/api/datos \
  -H "Authorization: Bearer eyJhbGci..."

# ❌ Incorrecto - Formato Bearer mal
-H "Authorization: eyJhbGci..."           # Falta "Bearer"
-H "Authorization: Bearer: eyJhbGci..."   # Dos puntos
-H "Authorization: bearer eyJhbGci..."    # "bearer" minúscula (aceptado)
```

**Debug en código:**

```javascript
// En middlewares/verificarToken.js, agregar logs:
const token = req.headers.authorization?.split(' ')[1];
console.log('🔍 Headers recibidos:', req.headers);
console.log('🔍 Token extraído:', token);

if (!token) {
    console.log('❌ No hay token');
    return res.status(403).json({ error: 'Token requerido' });
}
```

---

### 5. "Token inválido" o signature verification failed

**Causa:** JWT_SECRET no coincide o token fue modificado

**Verificar:**

```bash
# 1. JWT_SECRET debe ser igual en:
cat .env | grep JWT_SECRET

# 2. Decodificar token en jwt.io
# - Pegar token completo
# - En "Verify Signature", verificar que Signature coincida
# - Si aparece "Signature Verified ✓" = secret correcto
# - Si aparece "Signature Verified ✗" = secret INCORRECTO

# 3. Test de token manual
node
> const jwt = require('jsonwebtoken');
> const token = 'eyJhbGci...'; // Tu token
> jwt.verify(token, process.env.JWT_SECRET);
// Debería imprimir el payload decodificado
```

**Soluciones:**

```bash
# Si JWT_SECRET cambió, regenerar tokens:
# - Actualizar JWT_SECRET en .env
# - Los tokens viejos se vuelven inválidos
# - Usarios deben hacer login de nuevo

# Cambiar JWT_SECRET temporal para testing:
NODE_ENV=development
JWT_SECRET=mi-clave-secreta-temporal
```

---

### 6. "Token expirado" - Status 401

**Causa:** Token sobrepasó el tiempo de expiración (30 minutos por defecto)

**Verificar expiración:**

```javascript
// Decodificar token sin verificar
const decoded = jwt.decode(token);
console.log('Expira en:', new Date(decoded.exp * 1000));
console.log('Expirado?', Date.now() >= decoded.exp * 1000);

// En jwt.io: mirar timestamp "exp"
// exp: 1705322800 = Fri Jan 15 2024 11:13:20
```

**Soluciones:**

```javascript
// Aumentar expiración en routes/auth.js
const token = jwt.sign(
    { id: usuario.id, nombreUsuario: usuario.nombreUsuario },
    process.env.JWT_SECRET,
    { expiresIn: '7d' } // 7 días en lugar de 30 minutos
);

// O hacer login nuevamente:
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario": "juan", "contrasena": "password123"}'
```

---

### 7. Comparación bcrypt siempre falla en login

**Causa:** Contraseña no fue hasheada en registro o hash es inválido

**Verificar:**

```javascript
// En login, agregar logs de debug:
const usuarioValido = await Usuario.findOne({ where: { nombreUsuario } });
console.log('👤 Usuario encontrado:', usuarioValido.nombreUsuario);
console.log('🔐 Hash en BD:', usuarioValido.contrasena);
console.log('🔑 Contraseña ingresada:', contrasena);

const esValido = await bcrypt.compare(contrasena, usuarioValido.contrasena);
console.log('✅ Contraseña válida?', esValido);
```

**Test bcrypt directo:**

```javascript
// Node.js REPL
const bcrypt = require('bcrypt');

// Hash una contraseña
const hash = await bcrypt.hash('micontraseña123', 10);
console.log('Hash:', hash); // $2b$10$...

// Verificar contraseña
const esValido = await bcrypt.compare('micontraseña123', hash);
console.log('¿Es válido?', esValido); // true

// Con contraseña incorrecta
const esValido2 = await bcrypt.compare('contraseñamal', hash);
console.log('¿Es válido?', esValido2); // false
```

**Tabla de causas bcrypt falla:**

| Causa | Síntoma | Solución |
|-------|---------|----------|
| Hash corrupto | Error en bcrypt.compare | Revisar datos en BD |
| Rounds incorrecto | Demora extrema | `bcrypt.hash(pass, 10)` |
| Contraseña nullable | BD permite NULL | Agregar `allowNull: false` |
| Salt no aplicado | Hash muy corto | Usar `await bcrypt.hash` |

---

## 📊 Problemas de Base de Datos

### 8. "Unique constraint violated" al registrar

**Causa:** Usuario con ese nombre ya existe

**Verificar:**

```sql
-- En PostgreSQL
SELECT * FROM "users" WHERE "nombreUsuario" = 'juan';
```

**Soluciones:**

```bash
# Opción A: Usar otro nombre de usuario
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario": "juan2", "contrasena": "password123"}'

# Opción B: Limpiar BD
psql -U postgres -d mi_api -c "TRUNCATE TABLE users CASCADE;"

# Opción C: Resetear BD completamente
npm run init-db
```

---

### 9. Tabla no existe o campos faltantes

**Causa:** Sequelize no sincronizó o sync tiene `alter: false`

**Verificar:**

```bash
# Conectar a BD
psql -U postgres -d mi_api

# Ver tablas
\dt

# Ver estructura usuarios
\d "users"

# Debe mostrar:
# - id (serial PK)
# - nombreUsuario (varchar unique)
# - contrasena (varchar)
# - createdAt (timestamp)
# - updatedAt (timestamp)
```

**Soluciones:**

```javascript
// En db.js, cambiar a:
await sequelize.sync({ alter: true }); // Permite cambios
// O
await sequelize.sync({ force: true }); // Reinicia todo (CUIDADO!)

// Luego resetear:
npm run init-db
npm start
```

---

### 10. "column does not exist" error

**Causa:** Modelo define campo que BD no tiene

**Soluciones:**

```javascript
// Opción A: Sincronizar con alter
await sequelize.sync({ alter: true });

// Opción B: Migración manual SQL
-- En PostgreSQL:
ALTER TABLE "users" ADD COLUMN email VARCHAR(255);

// Opción C: Restaurar BD
npm run init-db
```

---

## 🔧 Problemas de Código

### 11. "SyntaxError: Unexpected token"

**Causa:** Error en JSON o JavaScript

**Verificar:**

```bash
# JSON inválido en el body
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario": "juan" "contrasena": "pass"}' # Falta coma

# ✅ Correcto:
-d '{"nombreUsuario": "juan", "contrasena": "pass"}'
```

**Validar JSON:**

```bash
echo '{"test": "json"}' | jq . # Instalardockerfilex jq primero
```

---

### 12. "Cannot find module" error

**Causa:** Dependencia no instalada

**Soluciones:**

```bash
# Ver qué falta
npm install

# O instalar manualmente
npm install express cors dotenv

# Ver versiones instaladas
npm list | grep (bcrypt|jsonwebtoken|sequelize)
```

---

### 13. async/await no funciona

**Causa:** Función no es async o no se usa await

**Verificar:**

```javascript
// ❌ Incorrecto - Sin async
function login(req, res) {
    const usuario = await Usuario.findOne(...); // Error!
}

// ✅ Correcto - Con async
async function login(req, res) {
    const usuario = await Usuario.findOne(...); // OK
}
```

---

## 🧩 Problemas de Integración

### 14. CORS error desde frontend

**Causa:** Frontend en puerto 5173, API en 3000

**Verificar:**

```javascript
// En index.js, CORS ya está habilitado:
app.use(cors()); // Permite todos los orígenes

// Si necesitas restringir:
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
```

**Error CORS típico:**

```
Access to XMLHttpRequest at 'http://localhost:3000/api/auth/login'
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Soluciones:**

```javascript
// Agregar headers manuales en frontend
fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombreUsuario, contrasena })
});
```

---

### 15. Token no persiste después de refresh

**Causa:** Frontend no guarda token en localStorage

**Soluciones React:**

```javascript
// Guardar token después de login
const response = await fetch('/api/auth/login', {...});
const data = await response.json();
localStorage.setItem('token', data.token);

// Recuperar token al cargar página
useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        // Token existe, usuario sigue autenticado
    }
}, []);

// Usar token en requests
fetch('/api/datos', {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
```

---

## 📝 Logs Útiles para Debug

### Agregar logs estratégicos

```javascript
// En routes/auth.js - Registro
console.log('📝 Intento de registro:', { nombreUsuario, pass_length });
console.log('🔐 Hasheando contraseña...');
const hash = await bcrypt.hash(contrasena, 10);
console.log('✅ Hash creado:', hash.substring(0, 20) + '...');
const usuario = await Usuario.create(...);
console.log('💾 Usuario guardado en BD:', { id: usuario.id, nombreUsuario });

// En routes/auth.js - Login
console.log('🔑 Intento de login:', nombreUsuario);
const usuario = await Usuario.findOne(...);
console.log('👤 Usuario encontrado?', !!usuario);
const esValido = await bcrypt.compare(contrasena, usuario.contrasena);
console.log('✅ Contraseña válida?', esValido);
const token = jwt.sign(...);
console.log('🎫 Token generado:', token.substring(0, 20) + '...');

// En middlewares/verificarToken.js
console.log('🔐 Verificando token...');
const token = req.headers.authorization?.split(' ')[1];
console.log('📌 Token extraído?', !!token);
const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log('✅ Token válido para usuario:', decoded.nombreUsuario);
```

### Activar SQL logging

```javascript
// En db.js, cambiar:
logging: false // a
logging: console.log // Ver todas las queries SQL

// Salida:
// Sequelize: SELECT * FROM "users" WHERE "nombreUsuario" = 'juan' LIMIT 1;
```

---

## 🎯 Checklist de Debugging

Cuando algo falla:

1. [ ] ¿API está running? (`npm start`)
2. [ ] ¿PostgreSQL está activo?
3. [ ] ¿.env tiene las variables correctas?
4. [ ] ¿BD existe? (`npm run init-db`)
5. [ ] ¿Consultas SQL son válidas? (Revisar SQL logs)
6. [ ] ¿JWT tiene secret correcto? (Verificar en jwt.io)
7. [ ] ¿Contraseña se hashea en registro? (Revisar BD)
8. [ ] ¿Token se envía correctamente?  (Revisar headers)
9. [ ] ¿CORS está habilitado?
10. [ ] ¿Expiración de token es considerada?

---

## 📚 Herramientas de Debugging Útiles

```bash
# 1. Inspeccionar BD
psql -U postgres -d mi_api
SELECT * FROM "users";

# 2. Ver procesos Node.js
ps aux | grep node

# 3. Monitor en tiempo real
npm install -g nodemon
nodemon index.js

# 4. Validar JSON
npm install -g jsonlint

# 5. Testear requests fácil
npm install -g http-server
npm install -g rest-client

# 6. Decodificar JWT en terminal
node -e "console.log(JSON.parse(Buffer.from('PAYLOAD_AQUI', 'base64').toString()))"
```

---

## 🚀 Próximos Pasos

Después de resolver el problema:

1. **Revisar logs** para entender qué pasó
2. **Documentar** el error encontrado
3. **Escribir test** para ese caso (si aplica)
4. **Prevenir** con validaciones mejor

Ver `TESTING.md` para probar sistemáticamente.
