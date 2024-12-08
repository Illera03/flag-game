const sqlite3 = require('sqlite3').verbose(); // Importa sqlite3
const path = require('path'); // Importa el módulo path
const fs = require('fs'); // Importa el módulo fs para leer archivos

// Ruta de la base de datos y schema.sql
const dbPath = path.resolve(__dirname, 'flag-game.db'); // Ruta de la base de datos
const schemaPath = path.resolve(__dirname, 'schema.sql'); // Ruta del archivo schema.sql

// Conectar a la base de datos SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Leer el archivo schema.sql
const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

// Ejecutar el SQL para crear las tablas
db.exec(schemaSQL, (err) => {
    if (err) {
        console.error('Error ejecutando schema.sql:', err.message);
    } else {
        console.log('Tablas creadas exitosamente.');
    }
});

// Exporta la instancia de la base de datos para que pueda ser utilizada en otros módulos
module.exports = db;

