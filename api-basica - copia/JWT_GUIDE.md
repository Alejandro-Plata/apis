# 🔐 JWT - JSON Web Tokens

Guía completa para entender **JWT** y cómo se usa en nuestro proyecto.

---

## ¿Qué es JWT?

JWT es un **token** que el servidor le da al cliente después de login.

El cliente lo usa para acceder a rutas protegidas sin enviar contraseña.

```
Usuario:               Servidor:
   |                     |
   | username + password |
   |-------------------->|
   |                   Verificar
   |<--------- JWT token ----------|
   |                     |
   | solicitud + JWT     |
   |-------------------->|
   |                   Verificar JWT
   |<----- datos privados --------|
```

---

## Estructura de JWT

Un JWT tiene **3 partes** separadas por puntos:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6MSwidXNlcm5hbWUiOiJqdWFuIiwiaWF0IjoxNjk5OTk5OTk5LCJleHAiOjE3MDAwMDE3OTl9.
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

       ↑                          ↑                      ↑
    HEADER                      PAYLOAD              SIGNATURE
```

### Part 1: HEADER (Algoritmo)
```javascript
// Decodificado:
{
  "alg": "HS256",    // Algoritmo: HMAC SHA-256
  "typ": "JWT"       // Tipo: JWT
}

// Codificado (base64):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

### Part 2: PAYLOAD (Datos)
```javascript
// Decodificado:
{
  "id": 1,
  "username": "juan",
  "iat": 1699999999,   // Issued At (cuándo se creó)
  "exp": 1700001799    // Expiration (cuándo expira)
}

// Codificado (base64):
eyJpZCI6MSwidXNlcm5hbWUiOiJqdWFuIiwiaWF0IjoxNjk5OTk5OTk5LCJleHAiOjE3MDAwMDE3OTl9
```

### Part 3: SIGNATURE (Firma)
```javascript
HMACSHA256(
  base64(header) + "." + base64(payload),
  "JWT_SECRET"  // ← Clave del servidor
)

Resultado: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

¿Para qué? Verificar que nadie modificó el token.
```

---

## Cómo Funciona JWT

### Generación (Login)

```javascript
// En routes/auth.js:
jwt.sign(
  { id: usuario.id, username: usuario.nombreUsuario },  // ← Payload
  process.env.JWT_SECRET,                                 // ← Clave secreta
  { expiresIn: '30m' },                                   // ← Opciones
  (err, token) => {
    if (err) return res.status(500).json({ message: 'Error' });
    res.json({ token });  // ← Retorna JWT
  }
);

// Resultado: eyJhbGciOi...eyJpZCI6...xxxxx
```

### Verificación (Rutas Protegidas)

```javascript
// En middlewares/verificarToken.js:
const token = req.headers.authorization?.split(' ')[1];  // Bearer <token>

jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) return res.status(403).json({ message: 'Invalid token' });
  
  req.usuario = decoded;  // id, username, iat, exp
  next();  // Continúa a la ruta
});
```

---

## En Nuestro Código

### 1. Generar Token (Login)

**Archivo:** `routes/auth.js`

```javascript
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { nombreUsuario: username } });
    
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const contrasenaValida = await bcrypt.compare(password, usuario.contrasena);
    if (!contrasenaValida) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // ← GENERAR JWT AQUÍ
    jwt.sign(
      { id: usuario.id, username: usuario.nombreUsuario },
      process.env.JWT_SECRET,
      { expiresIn: '30m' },
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: 'Error al generar token' });
        }
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});
```

### 2. Verificar Token (Middleware)

**Archivo:** `middlewares/verificarToken.js`

```javascript
import jwt from 'jsonwebtoken';

export function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  // Extraer token: "Bearer eyJhbGciOi..."
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Guardar datos decodificados en req
    req.usuario = decoded;  // id, username, iat, exp
    next();
  });
}
```

### 3. Usar Middleware en Rutas Protegidas

```javascript
// En routes/auth.js:
import { verificarToken } from '../middlewares/verificarToken.js';

router.get('/perfil', verificarToken, async (req, res) => {
  // req.usuario tiene: id, username, iat, exp
  const usuario = await Usuario.findByPk(req.usuario.id);
  res.json({ usuario });
});
```

---

## Flujo Completo: Login → Usar Token

### 1. Cliente: Registrar y Login

```bash
# Registrar
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"username":"juan","password":"123456"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"juan","password":"123456"}'

# Respuesta:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Cliente: Guardar Token

```javascript
// React o JavaScript vanilla
const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'juan', password: '123456' })
});

const { token } = await response.json();
localStorage.setItem('token', token);  // ← Guardar para luego
```

### 3. Cliente: Usar Token en Próximas Requests

```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:3000/api/auth/perfil', {
  headers: {
    'Authorization': `Bearer ${token}`  // ← Enviar token
  }
});

const usuario = await response.json();
```

### 4. Servidor: Verificar Token

- Express recibe: `Authorization: Bearer eyJ...`
- Middleware `verificarToken` lo valida
- Si es válido, continúa a la ruta
- Si es inválido, retorna 403

---

## Expiración de Tokens

### ¿Por Qué Expiran?

Seguridad: Si alguien roba un token, no lo puede usar por siempre.

```javascript
{ expiresIn: '30m' }  // Expira en 30 minutos

// Cuando expira:
// jwt.verify() retorna error
// Cliente debe hacer login de nuevo
```

### Cambiar Expiración

```javascript
// 15 minutos
{ expiresIn: '15m' }

// 1 hora
{ expiresIn: '1h' }

// 7 días
{ expiresIn: '7d' }

// En segundos
{ expiresIn: 3600 }  // 1 hora
```

---

## Decodificar JWT (Para Debuggear)

### Opción 1: jwt.io (Online)

1. Ve a [jwt.io](https://jwt.io)
2. Pega tu token en el lado izquierdo
3. Verás header, payload y signature decodificados

### Opción 2: En Node.js

```javascript
import jwt from 'jsonwebtoken';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const decoded = jwt.decode(token);

console.log(decoded);
// {
//   id: 1,
//   username: 'juan',
//   iat: 1699999999,
//   exp: 1700001799
// }
```

---

## ⚠️ Errores Comunes

### Error 1: Token expirado
```javascript
// jwt.verify() retorna:
{
  name: 'TokenExpiredError',
  message: 'jwt expired',
  expiredAt: 1700001799
}

// Solución: Client debe hacer login de nuevo
```

### Error 2: Token inválido
```javascript
// jwt.verify() retorna:
{
  name: 'JsonWebTokenError',
  message: 'invalid signature'
}

// Causas:
// - JWT_SECRET cambió
// - Token fue modificado
// - JWT_SECRET es diferente en servidor
```

### Error 3: Token no enviado
```javascript
// Middleware verificarToken lo valida:
if (!authHeader) {
  return res.status(403).json({ message: 'Token no proporcionado' });
}
```

### Error 4: Mal formato en Header
```javascript
// ❌ MALO
Authorization: eyJhbGciOi...  // Sin "Bearer"

// ✅ CORRECTO
Authorization: Bearer eyJhbGciOi...
```

---

## Refresh Tokens (Avanzado)

Para usuarios que usufructúan mucho tiempo, se pueden usar refresh tokens:

```javascript
// Login: Retornar dos tokens
{
  "token": "eyJ... (expira en 15 min)",
  "refreshToken": "eyJ... (expira en 7 días)"
}

// Cuando token principal expira:
// Cliente usa refreshToken para obtener uno nuevo
```

---

## Seguridad: Buenas Prácticas

✅ **DO:**
- Cambiar `JWT_SECRET` en producción
- Usar HTTPS (tokens en URLs o headers)
- Guardar tokens en secure httpOnly cookies
- Usar corta expiración (15-30 min)
- Validar siempre en el servidor

❌ **DON'T:**
- Guardar información sensible en payload (se puede decodificar)
- Usar JWT_SECRET débil
- Guardar token en localStorage (XSS vulnerable)
- Confiar solo en validación del cliente
- Usar tokens sin expiración

---

## Recursos Oficiales

- [JWT.io - Official Site](https://jwt.io)
- [jwt npm package](https://www.npmjs.com/package/jsonwebtoken)
- [RFC 7519 - JWT Specification](https://tools.ietf.org/html/rfc7519)
- [Auth0 - JWT Guide](https://auth0.com/docs/secure/tokens/json-web-tokens)

---

¡Ahora entiendes JWT! 🔐
