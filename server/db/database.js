// Importa el módulo sqlite3 y habilita el modo verbose para obtener más detalles en los mensajes de error
const sqlite3 = require('sqlite3').verbose();

// Importa el módulo path para trabajar con rutas de archivos y directorios
const path = require('path');

// Ruta de la base de datos
// Utiliza path.resolve para crear una ruta absoluta a la base de datos 'flag-game.db' en el mismo directorio que este archivo
const dbPath = path.resolve(__dirname, 'flag-game.db');

// Conectar a SQLite
// Crea una nueva instancia de la base de datos SQLite utilizando la ruta dbPath
// El callback maneja errores de conexión y confirma la conexión exitosa
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        // Si hay un error al conectar, se imprime el mensaje de error en la consola
        console.error('Error connecting to database:', err.message);
    } else {
        // Si la conexión es exitosa, se imprime un mensaje de confirmación en la consola
        console.log('Connected to SQLite database.');
    }
});

// Exporta la instancia de la base de datos para que pueda ser utilizada en otros módulos
module.exports = db;
