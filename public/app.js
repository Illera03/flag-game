// Obtener bandera
async function fetchFlag() {
    try {
        const response = await fetch('/api/flags');
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const flags = await response.json();
        const randomIndex = Math.floor(Math.random() * flags.length);
        const flag = flags[randomIndex];

        console.log(flags); // Muestra las banderas
        const flagImg = document.getElementById('flag-img');
        if (flagImg) {
            flagImg.src = flag.flag;
        } else {
            console.error("Elemento 'flag-img' no encontrado en el DOM");
        }
    } catch (error) {
        console.error('Error obteniendo la bandera:', error);
    }
}

// Enviar puntuación
async function submitScore(userId, score) {
    try {
        const response = await fetch('/api/scores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, score }),
        });
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();
        console.log(data); // Confirma que se guardó
    } catch (error) {
        console.error('Error enviando la puntuación:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchFlag();
});