// Importa el módulo express
const express = require('express');

// Crea una instancia de una aplicación Express
const app = express();

// Importa las rutas desde los archivos correspondientes
const flagsRoutes = require('./routes/flags');
const scoresRoutes = require('./routes/scores');
const loginRoutes = require('./routes/login');

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Define las rutas para las APIs de 'flags' y 'scores'
app.use('/api/flags', flagsRoutes);
app.use('/api/scores', scoresRoutes);
app.use('/api/login', loginRoutes);

// Define el puerto en el que el servidor escuchará, usando una variable de entorno o el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;

// Inicia el servidor y escucha en el puerto definido
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});