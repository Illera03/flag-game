// Obtener banderas
async function fetchFlags() {
    const response = await fetch('/api/flags');
    const flags = await response.json();
    console.log(flags); // Muestra las banderas
}

// Enviar puntuación
async function submitScore(userId, score) {
    const response = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, score }),
    });

    const data = await response.json();
    console.log(data); // Confirma que se guardó
}
