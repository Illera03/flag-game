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

/// Obtener el mejor score y el número de filas de un usuario
router.get('/:username', (req, res) => { // Recibimos 'username' como parámetro
    const { username } = req.params;

    // Obtener el ID del usuario
    db.get('SELECT id FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userId = row.id;

        // Obtener el mejor score y el número de juegos del usuario
        db.get(
            'SELECT MAX(score) as best_score, COUNT(*) as games_played FROM scores WHERE user_id = ?',
            [userId],
            (err, row) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json(row);
            }
        );
    });
});

module.exports = router;
