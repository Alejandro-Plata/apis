# 🧪 Testing de la API - Guía Práctica

Guía para probar los endpoints de autenticación con curl, Postman o HTTP Client.

---

## 1️⃣ Requisitos Previos

Antes de empezar, asegúrate de que:
- [ ] API está ejecutándose: `npm start`
- [ ] PostgreSQL está activo
- [ ] `.env` está configurado correctamente
- [ ] Base de datos está creada: `npm run init-db`

---

## 2️⃣ Testing con cURL

### A. Registro (Crear Usuario)

```bash
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d "{
    \"nombreUsuario\": \"juan\",
    \"contrasena\": \"password123\"
  }"
```

**Respuesta exitosa (201):**
```json
{
  "id": 1,
  "nombreUsuario": "juan",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Errores posibles:**

```bash
# Error: Usuario ya existe
# Status: 400
{
  "error": "El usuario ya existe"
}

# Error: Faltan campos
# Status: 400
{
  "error": "Faltan usuario y contraseña"
}
```

---

### B. Login (Obtener Token JWT)

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{
    \"nombreUsuario\": \"juan\",
    \"contrasena\": \"password123\"
  }"
```

**Respuesta exitosa (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tYnJlVXN1YXJpbyI6Imp1YW4iLCJpYXQiOjE3MDUzMjEwMDAsImV4cCI6MTcwNTMyMjgwMH0.6s3KQj2P5JkL9mNqRsT4uVwXyZ1aAbCdEfGhIjKlMnO",
  "usuario": {
    "id": 1,
    "nombreUsuario": "juan"
  }
}
```

**Errores posibles:**

```bash
# Error: Usuario no existe
# Status: 401
{
  "error": "Usuario o contraseña inválidos"
}

# Error: Contraseña incorrecta
# Status: 401
{
  "error": "Usuario o contraseña inválidos"
}

# Error: Faltan campos
# Status: 400
{
  "error": "Faltan usuario y contraseña"
}
```

---

### C. Acceder a Ruta Protegida

```bash
# Usar el token obtenido en login
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X GET http://localhost:3000/api/datos \
  -H "Authorization: Bearer $TOKEN"
```

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Datos privados",
  "usuario": {
    "id": 1,
    "nombreUsuario": "juan",
    "iat": 1705321000,
    "exp": 1705322800
  }
}
```

**Errores de autenticación:**

```bash
# Error: Sin token
# Status: 403
{
  "error": "Token requerido"
}

# Error: Token inválido / Firma incorrecta
# Status: 403
{
  "error": "Token inválido"
}

# Error: Token expirado
# Status: 401
{
  "error": "Token expirado"
}

# Error: Bearer format incorrecto
# Status: 403
{
  "error": "Formato Bearer inválido"
}
```

---

## 3️⃣ Testing con Postman

### Importar Colección (Método Rápido)

1. **Abrir Postman**
2. **Click en "Import"** (esquina superior izquierda)
3. **Seleccionar "Paste Raw Text"**
4. **Copiar y pegar este JSON:**

```json
{
  "info": {
    "name": "API Autenticación - Testing",
    "description": "Colección para probar endpoints de registro, login y datos protegidos",
    "version": "1.0"
  },
  "item": [
    {
      "name": "1. Registro",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"nombreUsuario\": \"juan\", \"contrasena\": \"password123\"}"
        },
        "url": {
          "raw": "http://localhost:3000/api/auth/registro",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "auth", "registro"]
        }
      }
    },
    {
      "name": "2. Login",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"nombreUsuario\": \"juan\", \"contrasena\": \"password123\"}"
        },
        "url": {
          "raw": "http://localhost:3000/api/auth/login",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "auth", "login"]
        }
      }
    },
    {
      "name": "3. Datos (Protegido)",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer YOUR_TOKEN_HERE"
          }
        ],
        "url": {
          "raw": "http://localhost:3000/api/datos",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "datos"]
        }
      }
    }
  ]
}
```

### Pasos en Postman

1. **Registro**
   - Selecciona "1. Registro"
   - Cambia el `nombreUsuario` por uno único
   - Click "Send"
   - Guarda el `id` de la respuesta

2. **Login**
   - Selecciona "2. Login"
   - Usa el mismo `nombreUsuario` y `contrasena`
   - Click "Send"
   - **Copia el `token` de la respuesta**

3. **Usar Token en Ruta Protegida**
   - Selecciona "3. Datos (Protegido)"
   - Reemplaza `YOUR_TOKEN_HERE` con el token copiado
   - Click "Send"
   - Deberías ver los datos protegidos

---

## 4️⃣ Testing con VS Code REST Client

Si tienes la extensión "REST Client" instalada, crea un archivo `test.http`:

```http
### 1. Registro
POST http://localhost:3000/api/auth/registro
Content-Type: application/json

{
  "nombreUsuario": "juan",
  "contrasena": "password123"
}

### 2. Login (Copiar el token de la respuesta)
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "nombreUsuario": "juan",
  "contrasena": "password123"
}

### 3. Ruta Protegida (Reemplazar TOKEN con el token obtenido)
GET http://localhost:3000/api/datos
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Haz click en "Send Request" sobre cada endpoint.

---

## 5️⃣ Escenarios de Prueba Comunes

### ✅ Flujo de Autenticación Completo

```bash
# Paso 1: Registrar usuario
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario": "maria", "contrasena": "secure123"}'

# Respuesta esperada: Usuario creado con id

# Paso 2: Hacer login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario": "maria", "contrasena": "secure123"}'

# Respuesta esperada: JWT token

# Paso 3: Usar token en ruta protegida
curl -X GET http://localhost:3000/api/datos \
  -H "Authorization: Bearer <TOKEN_AQUI>"

# Respuesta esperada: Datos privados + info del usuario
```

### ❌ Pruebas de Error

```bash
# 1. Intentar registrar usuario duplicado
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario": "maria", "contrasena": "otra_pass"}'
# Esperado: 400 "El usuario ya existe"

# 2. Login con contraseña incorrecta
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario": "maria", "contrasena": "contraseña_mal"}'
# Esperado: 401 "Usuario o contraseña inválidos"

# 3. Acceder a ruta protegida sin token
curl -X GET http://localhost:3000/api/datos
# Esperado: 403 "Token requerido"

# 4. Token inválido/expirado
curl -X GET http://localhost:3000/api/datos \
  -H "Authorization: Bearer token_invalido"
# Esperado: 403 "Token inválido"

# 5. Registro sin campos requeridos
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario": "pedro"}'
# Esperado: 400 "Faltan usuario y contraseña"
```

---

## 6️⃣ Debugging de Tokens JWT

### Decodificar Token en Terminal

```bash
# Linux/Mac - Extraer payload (segunda parte del token)
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tYnJlVXN1YXJpbyI6Imp1YW4iLCJpYXQiOjE3MDUzMjEwMDAsImV4cCI6MTcwNTMyMjgwMH0.6s3KQj2P5JkL9mNqRsT4uVwXyZ1aAbCdEfGhIjKlMnO"

# Decodificar con Node.js
node -e "console.log(JSON.stringify(JSON.parse(Buffer.from('$TOKEN'.split('.')[1], 'base64').toString()), null, 2))"

# Salida esperada:
# {
#   "id": 1,
#   "nombreUsuario": "juan",
#   "iat": 1705321000,
#   "exp": 1705322800
# }
```

### Usar jwt.io

1. Ir a https://jwt.io
2. Pegar el token completo en "Encoded"
3. El payload y header se decodifican automáticamente
4. Verificar:
   - ✅ Payload tiene `id` y `nombreUsuario`
   - ✅ `exp` es timestamp futuro (no expirado)
   - ✅ `iat` es timestamp del login

---

## 7️⃣ Tabla de Códigos HTTP Esperados

| Endpoint | Método | Éxito | Error |
|----------|--------|-------|-------|
| `/api/auth/registro` | POST | 201 | 400, 500 |
| `/api/auth/login` | POST | 200 | 401, 400 |
| `/api/datos` | GET | 200 | 403, 401 |

---

## 8️⃣ Troubleshooting

### Error: "ECONNREFUSED"
**Problema:** API no está corriendo
```bash
# Solución
npm start
```

### Error: "database does not exist"
**Problema:** BD no creada
```bash
# Solución
npm run init-db
```

### Error: "invalid password" (PostgreSQL)
**Problema:** Credenciales de BD incorrectas
**Solución:** Verificar `DATABASE_URL` en `.env`

### Error: "JWT signature verification failed"
**Problema:** Token modificado o JWT_SECRET es diferente
**Solución:** Usar token generado por la API, no tokens manuales

### Token no se envía correctamente
**Problema:** Formato Bearer incorrecto
```bash
# ✅ Correcto
curl -H "Authorization: Bearer eyJhbGci..."

# ❌ Incorrecto
curl -H "Authorization: eyJhbGci..."
curl -H "Authorization: Bearer: eyJhbGci..."
```

---

## 9️⃣ Checklist de Testing

Antes de deployar, asegúrate que:

- [ ] ✅ Registro crea usuario correctamente
- [ ] ✅ Hash bcrypt se guarda (no contraseña plana)
- [ ] ✅ Login genera JWT válido
- [ ] ✅ Token se puede decodificar
- [ ] ✅ Token contiene `id` y `nombreUsuario`
- [ ] ✅ Ruta protegida requiere token
- [ ] ✅ Ruta protegida funciona con token válido
- [ ] ✅ Token expirado es rechazado (401)
- [ ] ✅ Token inválido es rechazado (403)
- [ ] ✅ Usuario duplicado retorna error
- [ ] ✅ Contraseña incorrecta retorna 401
- [ ] ✅ Campos faltantes retornan 400

---

## 🔟 Próximos Pasos

Después de probar:

1. **Crear más usuarios** con diferentes nombres y contraseñas
2. **Analizar tokens** en https://jwt.io
3. **Modificar validaciones** en `routes/auth.js`
4. **Agregar más campos** al Usuario (email, edad, etc)
5. **Crear nuevas rutas protegidas** usando el middleware
6. **Frontend integration** - Guardar token en localStorage

Ver `INICIO_RAPIDO.md` para tareas de práctica.
