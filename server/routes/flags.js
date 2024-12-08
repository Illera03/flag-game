const express = require('express'); // Importa el módulo express
const router = express.Router(); // Crea una instancia del enrutador de express

// Define una ruta GET en la raíz del enrutador
router.get('/', async (req, res) => {
    try {
        const fetch = (await import('node-fetch')).default;
        // Realiza una solicitud HTTP GET a la API de restcountries para obtener información de todos los países
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json(); // Convierte la respuesta a formato JSON

        // Mapea los datos obtenidos para extraer el nombre y la bandera de cada país
        const flags = data.map(country => ({
            name: country.name.common, // Nombre común del país
            flag: country.flags.png, // URL de la imagen de la bandera en formato PNG
        }));

        res.json(flags); // Envía la lista de banderas como respuesta en formato JSON
    } catch (error) {
        // Maneja cualquier error que ocurra durante la solicitud o el procesamiento de datos
        res.status(500).json({ error: 'Error fetching flags' }); // Envía un mensaje de error con el código de estado 500
    }
});

module.exports = router; // Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación
