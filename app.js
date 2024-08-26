let mensajeEncriptar = "";
let mensajeDesencriptar = "";
let palabraClave = '';
/* let letraMensaje = ''; */
let letraClave = '';
/* let valorCaracterMensaje = 0; */
let valorCaracterClave = 0;
let longitudMensaje = 0;
let longitudClave = 0;
let contadorMensaje = 0;
let contadorClave =0;
let listaValoresCaracteresMensaje = [];
let listaValoresCaracteresClave = [];
let listaValoresCaracteresProcesados = [];
let mensajeProcesado = "";

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;    
}

function limpiarCajaMensaje() {
    let valorCajaMensaje = document.querySelector('#mensajeEncriptarDesencriptar');
    //console.log(valorCajaMensaje);
    valorCajaMensaje.value = '';
}

function limpiarCajaClave() {
    let valorCajaClave = document.querySelector('#palabraClave');
    //console.log(valorCajaClave);
    valorCajaClave.value = '';
}

function reiniciar(){
    //limpiar cajas de mensaje y palabra clave
    let mensajeEncriptar = "";
    let mensajeDesencriptar = "";
    let palabraClave = '';
    /* let letraMensaje = ''; */
    let letraClave = '';
    /* let valorCaracterMensaje = 0; */
    let valorCaracterClave = 0;
    let longitudMensaje = 0;
    let longitudClave = 0;
    let contadorMensaje = 0;
    let contadorClave =0;
    let listaValoresCaracteresMensaje = [];
    let listaValoresCaracteresClave = [];
    let listaValoresCaracteresProcesados = [];
    let mensajeProcesado = "";
    asignarTextoElemento('p', '')
    limpiarCajaMensaje();
    limpiarCajaClave(); 
}

function copiar(){
    let textoParaCopiar = mensajeProcesado;

    let botonCopiar = document.getElementById("botonCopiar");

    // Agregar un event listener al botón para manejar el clic
    botonCopiar.addEventListener("click", function() {
    // Usar la API de portapapeles para copiar el texto
    navigator.clipboard.writeText(textoParaCopiar)
        .then(() => {
            // Si se copia correctamente, mostrar un mensaje
            alert("Texto copiado al portapapeles: " + textoParaCopiar);
        })
        .catch(err => {
            // Si ocurre un error, mostrar un mensaje de error
            console.error("Error al copiar el texto: ", err);
        });
    });
}

function extraerLetra(mensaje, posicion) {
    // Verificamos que la posición esté dentro del rango del mensaje
    if (posicion >= 0 && posicion < mensaje.length) {
        return mensaje.charAt(posicion);
    } else {
        return "Posición fuera del rango";
    }
}

function obtenerPosicionAlfabeto(caracter) {
    if (caracter === ' ') {
        return 27; // Devuelve un espacio
    }
    // Asegurarse de que el input es una letra y solo tiene un carácter
    if (typeof caracter === 'string' && caracter.length === 1) {
        // Convertir la letra a mayúscula para una conversión uniforme
        caracter = caracter.toUpperCase();
        // Obtener el valor numérico usando el código Unicode
        let valorNumerico = caracter.charCodeAt(0) - 65 + 1;
        return valorNumerico;
    } else {
        return null; // Devolver null si el input no es válido
    }
}
function numeroALetra(numero) {
    if (numero === 27) {
        return ' ';
    }
    // Asegurarse de que el número está dentro del rango del alfabeto
    if (numero >= 1 && numero <= 26) {
        // Convertir el número a la letra correspondiente
        let letra = String.fromCharCode(numero + 65 - 1);
        return letra;
    } else {
        return null; // Devolver null si el número no es válido
    }
}

function encriptar() {
    mensajeEncriptar =  document.getElementById('mensajeEncriptarDesencriptar').value;
    console.log("Mesnsaje = " + mensajeEncriptar);

    palabraClave = document.getElementById('palabraClave').value;
    console.log("Clave = " + palabraClave);
 
    longitudMensaje = mensajeEncriptar.length;
    console.log(longitudMensaje);

    longitudClave = palabraClave.length;
    console.log(longitudClave);

    for (contadorMensaje=1; contadorMensaje<=mensajeEncriptar.length; contadorMensaje++) {
        let letraMensaje = extraerLetra(mensajeEncriptar, contadorMensaje-1);
        console.log(mensajeEncriptar);
        console.log(contadorMensaje);
        console.log(letraMensaje);
        let valorCaracterMensaje = obtenerPosicionAlfabeto(letraMensaje);
        console.log(valorCaracterMensaje);
        listaValoresCaracteresMensaje.push(valorCaracterMensaje);
        console.log(listaValoresCaracteresMensaje);
    }
    
    for (contadorClave=1; contadorClave<=palabraClave.length; contadorClave++) {
        let letraClave = extraerLetra(palabraClave, contadorClave-1);
        console.log(palabraClave);
        console.log(contadorClave);
        console.log(letraClave);
        let valorCaracterClave = obtenerPosicionAlfabeto(letraClave);
        console.log(valorCaracterClave);
        listaValoresCaracteresClave.push(valorCaracterClave);
        console.log(listaValoresCaracteresClave);
    } 

    for (let contador=0; contador<mensajeEncriptar.length;contador++){
        if (contador == 0 || indiceListaClave==longitudClave || indiceListaClave == contador/longitudClave){
            indiceListaClave=0;
        }
        let valorCaracterProcesado = listaValoresCaracteresMensaje[contador]+listaValoresCaracteresClave[indiceListaClave]; 
        listaValoresCaracteresProcesados[contador] = numeroALetra(valorCaracterProcesado);
        indiceListaClave++;
        console.log(listaValoresCaracteresProcesados);
    }

    mensajeProcesado = listaValoresCaracteresProcesados.join('');
    console.log(mensajeProcesado);

    asignarTextoElemento('p', mensajeProcesado)

    return mensajeProcesado;

}

function desencriptar (){
        mensajeDesencriptar = document.getElementById('mensajeEncriptarDesencriptar').value;
        console.log("Mensaje = " + mensajeDesencriptar);
    
        palabraClave = document.getElementById('palabraClave').value;
        console.log("Clave = " + palabraClave);
    
        longitudMensaje = mensajeDesencriptar.length
        console.log(longitudMensaje);
    
        longitudClave = palabraClave.length;
        console.log(longitudClave);
    
       
        // Obtener valores numéricos del mensaje encriptado
        for (contadorMensaje = 1; contadorMensaje <= mensajeDesencriptar.length; contadorMensaje++) {
            let letraMensaje = extraerLetra(mensajeDesencriptar, contadorMensaje - 1);
            let valorCaracterMensaje = obtenerPosicionAlfabeto(letraMensaje);
            listaValoresCaracteresMensaje.push(valorCaracterMensaje);
        }
    
        // Obtener valores numéricos de la clave
        for (contadorClave = 1; contadorClave <= palabraClave.length; contadorClave++) {
            let letraClave = extraerLetra(palabraClave, contadorClave - 1);
            let valorCaracterClave = obtenerPosicionAlfabeto(letraClave);
            listaValoresCaracteresClave.push(valorCaracterClave);
        }
    
        // Desencriptar usando los valores
        for (contador = 0; contador < mensajeDesencriptar.length; contador++) {
            if (contador == 0 || indiceListaClave == longitudClave || indiceListaClave == contador/longitudClave) {
                indiceListaClave = 0;
            }
            let valorCaracterProcesado = listaValoresCaracteresMensaje[contador] - listaValoresCaracteresClave[indiceListaClave];
            
            listaValoresCaracteresProcesados[contador] = numeroALetra(valorCaracterProcesado);
            indiceListaClave++;
        }
    
        mensajeProcesado = listaValoresCaracteresProcesados.join('');
        console.log(mensajeProcesado);
    
        asignarTextoElemento('p', mensajeProcesado);
    
        return mensajeProcesado;
    }

