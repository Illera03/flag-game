const express = require('express'); // Importa el módulo express
const db = require('../db/database'); // Importa la base de datos desde el archivo database.js
const router = express.Router(); // Crea una nueva instancia de un router de Express


router.post('/', (req, res) => {
    const { username } = req.body;

    if (!username || typeof username !== 'string' || username.trim() === '') {
        return res.status(400).json({ error: 'Invalid username' });
    }

    // Verificar si el usuario ya existe
    db.get('SELECT id FROM users WHERE username = ?', [username.trim()], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (row) {
            // Si el usuario ya existe, respondemos con el ID del usuario
            return res.status(200).json({ id: row.id });
        } else {
            // Si el usuario no existe, creamos un nuevo usuario
            db.run('INSERT INTO users (username) VALUES (?)', [username.trim()], function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ id: this.lastID });
            });
        }
    });
});

module.exports = router;


