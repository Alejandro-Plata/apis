import http from 'http';

function peticion(opciones, datos) {
    return new Promise((resolve, reject) => {
        const req = http.request(opciones, (res) => {
            let cuerpo = '';
            res.on('data', (chunk) => cuerpo += chunk);
            res.on('end', () => resolve({ codigoEstado: res.statusCode, cuerpo: JSON.parse(cuerpo || '{}') }));
        });
        req.on('error', reject);
        if (datos) {
            req.write(JSON.stringify(datos));
        }
        req.end();
    });
}

async function ejecutarTests() {
    const username = 'usuario_test_' + Date.now();
    const password = 'contrasena123';
    let token;

    console.log('--- Iniciando Verificación ---');

    // 1. Registro
    try {
        const res = await peticion({
            hostname: 'localhost',
            port: 3000,
            path: '/api/auth/registro',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, { username, password });
        console.log('Registro:', res.codigoEstado === 201 ? 'OK' : 'FALLO', res.cuerpo);
    } catch (err) {
        console.error('Error en Registro:', err);
    }

    // 2. Inicio de sesión
    try {
        const res = await peticion({
            hostname: 'localhost',
            port: 3000,
            path: '/api/auth/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, { username, password });
        console.log('Inicio de sesión:', res.codigoEstado === 200 ? 'OK' : 'FALLO');
        if (res.codigoEstado === 200) {
            token = res.cuerpo.token;
        }
    } catch (err) {
        console.error('Error en Inicio de sesión:', err);
    }

    // 3. Ruta protegida
    if (token) {
        try {
            const res = await peticion({
                hostname: 'localhost',
                port: 3000,
                path: '/api/datos/protegido',
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('Ruta protegida:', res.codigoEstado === 200 ? 'OK' : 'FALLO', res.cuerpo);
        } catch (err) {
            console.error('Error en Ruta protegida:', err);
        }
    } else {
        console.log('Saltando test de ruta protegida por fallo en inicio de sesión.');
    }

    // 4. Inicio de sesión inválido
    try {
        const res = await peticion({
            hostname: 'localhost',
            port: 3000,
            path: '/api/auth/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, { username, password: 'contrasenaIncorrecta' });
        console.log('Inicio de sesión inválido:', res.codigoEstado === 401 ? 'OK' : 'FALLO');
    } catch (err) {
        console.error('Error en Inicio de sesión inválido:', err);
    }
}

// Esperar a que el servidor se inicie
setTimeout(ejecutarTests, 2000);
