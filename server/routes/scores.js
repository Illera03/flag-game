const express = require('express'); // Importa el módulo express
const db = require('../db/database'); // Importa la base de datos desde el archivo database.js
const router = express.Router(); // Crea una nueva instancia de un router de Express

// Guardar puntuación
router.post('/', (req, res) => { // Define una ruta POST para guardar una nueva puntuación
    const { userId, score } = req.body; // Extrae userId y score del cuerpo de la solicitud

    db.run(
        'INSERT INTO scores (user_id, score) VALUES (?, ?)', // Consulta SQL para insertar una nueva puntuación
        [userId, score], // Parámetros de la consulta SQL
        function (err) { // Callback que se ejecuta después de intentar insertar la puntuación
            if (err) { // Si hay un error
                res.status(500).json({ error: err.message }); // Responde con un error 500 y el mensaje de error
            } else { // Si no hay error
                res.status(201).json({ id: this.lastID }); // Responde con un estado 201 y el ID de la nueva puntuación
            }
        }
    );
});

// Obtener puntuaciones de un usuario
router.get('/:userId', (req, res) => { // Define una ruta GET para obtener las puntuaciones de un usuario específico
    const { userId } = req.params; // Extrae userId de los parámetros de la ruta

    db.all(
        'SELECT * FROM scores WHERE user_id = ? ORDER BY created_at DESC', // Consulta SQL para obtener todas las puntuaciones de un usuario, ordenadas por fecha de creación descendente
        [userId], // Parámetro de la consulta SQL
        (err, rows) => { // Callback que se ejecuta después de intentar obtener las puntuaciones
            if (err) { // Si hay un error
                res.status(500).json({ error: err.message }); // Responde con un error 500 y el mensaje de error
            } else { // Si no hay error
                res.json(rows); // Responde con las filas obtenidas de la consulta
            }
        }
    );
});

module.exports = router; // Exporta el router para que pueda ser utilizado en otras partes de la aplicación