let mensajeEncriptar = "";
let mensajeDesencriptar = "";
let palabraClave = "";
let mensajeProcesado = "";

const caracteresValidos = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?,.;:@#ÁáÉéÍíÓóÚú";

// Crear un mapa de caracteres a números y viceversa
const charToIndex = {};
const indexToChar = {};
for (let i = 0; i < caracteresValidos.length; i++) {
    charToIndex[caracteresValidos[i]] = i + 1;
    indexToChar[i + 1] = caracteresValidos[i];
}

function asignarTextoElementoPorId(idElemento, nuevoTexto) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = nuevoTexto;
    } else {
        console.error("No se encontró el elemento con ID:", idElemento);
    }
}

function reiniciar() {
    location.reload();
}

function copiar() {
    const botonCopiar = document.getElementById("botonCopiar");
    botonCopiar.addEventListener("click", function() {
        navigator.clipboard.writeText(mensajeProcesado)
            .then(() => {
                alert("Texto copiado al portapapeles: " + mensajeProcesado);
            })
            .catch(err => {
                console.error("Error al copiar el texto: ", err);
            });
    });
}

function letraANumero(caracter) {
    return charToIndex[caracter] || null;
}

function numeroALetra(numero) {
    return indexToChar[numero] || null;
}

function procesarMensaje(mensaje, clave, esEncriptar) {
    const valoresMensaje = mensaje.split("").map(letraANumero);
    const valoresClave = clave.split("").map(letraANumero);
    const longitudClave = valoresClave.length;
    let listaValoresCaracteresProcesados = [];

    valoresMensaje.forEach((valor, i) => {
        const valorClave = valoresClave[i % longitudClave];
        let valorProcesado = esEncriptar
            ? valor + valorClave
            : valor - valorClave;

        if (valorProcesado > caracteresValidos.length) {
            valorProcesado -= caracteresValidos.length;
        } else if (valorProcesado <= 0) {
            valorProcesado += caracteresValidos.length;
        }

        listaValoresCaracteresProcesados.push(numeroALetra(valorProcesado));
    });

    mensajeProcesado = listaValoresCaracteresProcesados.join('');
    asignarTextoElementoPorId('textoProcesado', mensajeProcesado);
    return mensajeProcesado;
}

function encriptar() {
    mensajeEncriptar = document.getElementById('mensajeEncriptarDesencriptar').value;
    palabraClave = document.getElementById('palabraClave').value;
    return procesarMensaje(mensajeEncriptar, palabraClave, true);
}

function desencriptar() {
    mensajeDesencriptar = document.getElementById('mensajeEncriptarDesencriptar').value;
    palabraClave = document.getElementById('palabraClave').value;
    return procesarMensaje(mensajeDesencriptar, palabraClave, false);
}
