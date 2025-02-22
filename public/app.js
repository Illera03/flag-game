const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const buttons = [button1, button2, button3, button4];
const score = document.getElementById('score-text');
let country;
let random;
let isFetching = false;
let APICache = [];
let wait = false;
let logged = false;


// Obtener bandera
async function fetchFlag() {
    try {
        if (APICache.length === 0) {
            const response = await fetch('/api/flags');
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

            APICache = await response.json();
        }

        const randomIndex = Math.floor(Math.random() * APICache.length);
        const flag = APICache[randomIndex];

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

    random = Math.floor(Math.random() * 4); //random del 0 al 3 en el que va a ir la respuesta correcta
    let i = 0;
    while (i < 4) { //para los indices de los 4 botones
        const randomIndex = Math.floor(Math.random() * APICache.length); //indice aleatorio de todos los paises
        countryOption = APICache[randomIndex].name; //se obtiene el nombre del país
        if (random != i) { //si no coincide la posición actual con el botón de la respuesta correcta
            if (countryOption != country) { // si el país no coincide con el correcto
                buttons[i].innerText = countryOption; // se asigna el país al texto del botón
                i++; // se pasa al siguiente botón
            }
        }
        else { //si coincide la posición
            buttons[random].innerText = country; // se asigna el país correcto al botón con índice random
            i++; // se pasa al siguiente botón
        }
    }
}

async function checkAnswer(button) {
    //TODO if logged == false, mostrar mensaje de que debe iniciar sesión
    const time = 750; // Tiempo de espera para cambiar el color y cargar nueva bandera
    if (wait) return;  // Si ya está esperando, no permitir otra respuesta
    console.log(country + " " + "Solución"); // Indicar que se ha dado una respuesta
    wait = true; // Establecer espera en true para bloquear nuevas respuestas

    if (button.innerText == country) { //ACIERTA
        // Cambiar botón a verde si la respuesta es correcta
        button.style.backgroundColor = "green";
        // Sumar 1 al marcador
        score.innerText = parseInt(score.innerText) + 1;
        // Esperar 500ms, luego cambiar a gris y hacer el fetch
        setTimeout(function () {
            button.style.backgroundColor = "white";
            fetchFlagAndOptions(); // Cargar nueva bandera y opciones
        }, time);
    } else { //FALLA
        // Cambiar botón a rojo si la respuesta es incorrecta
        button.style.backgroundColor = "red";
        buttons[random].style.backgroundColor = "green"; // Marcar el botón correcto en verde
        score.innerText = 0; // Reiniciar el marcador

        // Esperar 500ms, luego cambiar a gris y hacer el fetch
        setTimeout(function () {
            button.style.backgroundColor = "white";
            buttons[random].style.backgroundColor = "white";
            fetchFlagAndOptions(); // Cargar nueva bandera y opciones
        }, time);
    }

    // Después de esperar el tiempo, permitir nuevas respuestas
    setTimeout(function () {
        wait = false;
    }, time);
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

// // Iniciar sesión o registrar usuario
// async function logUser() {
//     try {
//         console.log('Username:', username.value.trim());
//         console.log('Password:', password.value);

//         const response = await fetch('/api/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username: username.value.trim(), password: password.value }),
//         });
//         if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
//         console.log("Usuario registrado");
//         const data = await response.json();
//         console.log(data); // Confirma que se guardó
//         logged = true;
//         if (data.userId) {
//             updateTable(data.userId);
//         } else {
//             console.error('Error: userId no recibido en la respuesta');
//         }

//     } catch (error) {
//         console.error('Error iniciando sesión:', error);
//     }
// }

// // Actualizar tabla
// async function updateTable(userId) {
//     try {
//         const response = await fetch(`/api/scores/${userId}`); // Utilizamos el userId
//         if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

//         const data = await response.json();
//         tableUsername.innerText = username.value.trim();
//         tableBestScore.innerText = data.best_score;
//         currentScore.innerText = 0;
//         gamesPlayed.innerText = data.games_played;
//     } catch (error) {
//         console.error('Error actualizando la tabla:', error);
//     }
//}



// Obtener bandera y opciones
async function fetchFlagAndOptions() {
    if (isFetching) return;  // Si ya está en curso, no hacer nada
    isFetching = true;

    await fetchFlag();
    await fetchOptions();

    isFetching = false;  // Liberar el bloqueo cuando termine
}
document.addEventListener('DOMContentLoaded', () => {
    fetchFlagAndOptions();

});
