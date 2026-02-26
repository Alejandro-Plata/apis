# 🔐 bcrypt - Encriptación de Contraseñas

Guíacompleta para entender **bcrypt** y cómo se usa en nuestro proyecto.

---

## ¿Por Qué bcrypt?

### ❌ MALO - Guardar Contraseña en Plain Text
```javascript
// NUNCA HAGAS ESTO
const usuario = {
  username: "juan",
  password: "mi_contraseña_123"  // ← Seguridad = 0
};
// Si alguien accede a la BD, tiene acceso a TODO
```

### ✅ BUENO - Guardar Hash con bcrypt
```javascript
const usuario = {
  username: "juan",
  password: "$2b$10$iIU8R9EWw5VxMVjqfwrz.e..." // ← Seguro
};
// Si alguien accede, no puede recuperar la contraseña original
```

---

## Criptografía: Conceptos Básicos

### 1. Hash (Unidireccional)
```
password → [función hash] → $2b$10$...
                ↓
         IRREVERSIBLE
                ↓
         No se puede volver atrás
```

**Ejemplo:**
```
"hola" → SHA256 → 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
"hola" → SHA256 → 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
                  (SIEMPRE IGUAL)
```

### 2. Salt (Añadir Aleatoriedad)
```
password + salt_random → bcrypt → $2b$10$...
password + salt_random → bcrypt → $2c$10$... (DIFERENTE)
                                   (MISMO PASSWORD, DISTINTO HASH)
```

**Ventaja:** Aunque dos usuarios tengan la misma contraseña, los hashes son diferentes.

### 3. Rounds (Dificultad)
```
bcrypt.hash(password, 10)
                    ↑
                10 rounds

Más rounds = más lento = más seguro, pero más CPU

Típicamente: 10 rounds es buen balance
```

---

## En Nuestro Código

### Archivo: `routes/auth.js`

#### Registro - Hasheando Contraseña
```javascript
// 1. Usuario envía: { username: "juan", password: "123456" }
// 2. Validamos que no exista
// 3. Hasheamos la contraseña
const contrasenaEncriptada = await bcrypt.hash(password, 10);
// contrasenaEncriptada = "$2b$10$iIU8R9EWw5..." (cada vez diferente)

// 4. Guardamos en BD:
await Usuario.create({
  nombreUsuario: username,
  contrasena: contrasenaEncriptada  // ← Hash, no plain text
});
```

#### Login - Comparando Contraseñas
```javascript
// 1. Usuario envía: { username: "juan", password: "123456" }
// 2. Buscamos usuario
const usuario = await Usuario.findOne({ where: { nombreUsuario: username } });

// 3. Comparamos SIN desencriptar (magia de bcrypt)
const contrasenaValida = await bcrypt.compare(password, usuario.contrasena);
// - Toma "123456" (lo que envió)
// - Lo compara con "$2b$10$..." (lo guardado)
// - Retorna true/false (sin revelar el hash original)

if (contrasenaValida) {
  // Generar JWT
}
```

---

## Cómo Funciona bcrypt Internamente

### Proceso de Hash (Registro)

```
Input: "mi_super_password"

1. Generar salt aleatorio:
   salt = "$2b$10$O9qo.IHwVbL6p"

2. Hash: password + salt + rounds
   hash = bcrypt("mi_super_password", salt, 10)
   
3. Resultado final guardado en BD:
   $2b$10$O9qo.IHwVbL6p...resultado...
   ↑    ↑  ↑                ↑
   |    |  |         Hash del password
   |    |  Salt (incluido en el resultado)
   |    Rounds (10)
   Versión de bcrypt (2b)
```

### Proceso de Comparación (Login)

```
Input usuario: "mi_super_password"
Guardado en BD: "$2b$10$O9qo.IHwVbL6p..."

1. Extraer salt de lo guardado:
   salt = "$2b$10$O9qo.IHwVbL6p"

2. Hashear el input CON ese salt:
   hash_nuevo = bcrypt("mi_super_password", salt, 10)

3. Comparar resultados:
   hash_nuevo == hash_guardado?
   → true (contraseña válida)
   → false (contraseña inválida)

¡SIN desencriptar la original!
```

---

## Ejemplos de Uso

### Registrar Usuario Manualmente

```javascript
import bcrypt from 'bcrypt';

const password = "mi_password_123";
const hash = await bcrypt.hash(password, 10);

console.log(hash);
// $2b$10$iIU8R9EWw5VxMVjqfwrz.eRe1q9cX...
// (diferente cada vez)
```

### Verificar Contraseña

```javascript
const esValida = await bcrypt.compare(password, hash);
console.log(esValida);  // true
```

### Contraseña Incorrecta

```javascript
const esValida = await bcrypt.compare("password_incorrecto", hash);
console.log(esValida);  // false
```

---

## Salt Rounds: ¿Cuántos Usar?

| Rounds | Tiempo | Seguridad |
|--------|--------|-----------|
| 5      | 16 ms  | Baja |
| 10     | 100 ms | ✅ Buena |
| 12     | 260 ms | Muy buena |
| 15     | 1000 ms| Excelente pero lento |

**Recomendación:** 10-12 rounds es el estándar.

---

## ⚠️ Errores Comunes

### Error 1: Usar === para comparar hashes
```javascript
// ❌ MALO
password_input === hash_guardado  // Siempre false

// ✅ CORRECTO
await bcrypt.compare(password_input, hash_guardado)  // true/false
```

### Error 2: Comparar sin await
```javascript
// ❌ MALO
const valido = bcrypt.compare(password, hash);  // Retorna Promise
if (valido) { ... }  // Siempre true (Promise)

// ✅ CORRECTO
const valido = await bcrypt.compare(password, hash);  // Espera resultado
if (valido) { ... }
```

### Error 3: Olvidar hashear antes de guardar
```javascript
// ❌ MALO
await Usuario.create({
  password: "123456"  // Plain text en BD
});

// ✅ CORRECTO
const hash = await bcrypt.hash("123456", 10);
await Usuario.create({
  password: hash  // Hash en BD
});
```

---

## 🎯 Flujo Completo en el Proyecto

```
REGISTRO:
Usuario envía password → Validar → Hash con bcrypt → Guardar en BD

LOGIN:
Usuario envía password → Buscar usuario → bcrypt.compare() → JWT
```

---

## Recursos Ofici ales

- [bcrypt npm](https://www.npmjs.com/package/bcrypt)
- [Bcrypt Playground](https://bcrypt-generator.com/)
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)

---

¡Ahora entiendes bcrypt! 🔐
