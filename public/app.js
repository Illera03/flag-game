const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const buttons = [button1, button2, button3, button4];
let country;

// Obtener bandera
async function fetchFlag() {
    try {
        const response = await fetch('/api/flags');
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const flags = await response.json();
        const randomIndex = Math.floor(Math.random() * flags.length);
        const flag = flags[randomIndex];

        const flagImg = document.getElementById('flag-img');
        if (flagImg) {
            flagImg.src = flag.flag;
            console.log(flag.name);
            country = flag.name;
        } else {
            console.error("Elemento 'flag-img' no encontrado en el DOM");
        }
    } catch (error) {
        console.error('Error obteniendo la bandera:', error);
    }
}

async function fetchOptions() {
    console.log(country + " fetchOptions");
    const random = Math.floor(Math.random() * 4);
    const response = await fetch('/api/flags');
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const countrys = await response.json();
    let i = 0;
    while (i < 4) {
        const randomIndex = Math.floor(Math.random() * countrys.length);
        countryOption = countrys[randomIndex].name;
        if (random != i) {
            if (countryOption != country) {
                buttons[i].innerText = countryOption;
                i++;
            }
        }
        else {
            buttons[random].innerText = country;
            i++;
        }
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

// Obtener bandera y opciones
async function fetchFlagAndOptions() {
    await fetchFlag();
    await fetchOptions();
}
document.addEventListener('DOMContentLoaded', () => {
    fetchFlagAndOptions();
});
