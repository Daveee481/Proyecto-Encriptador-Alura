// Selección del documento para optimizar futuras referencias
let doc = document;

// Selección de elementos del DOM para facilitar su manipulación posterior
let textarea = doc.getElementById("Textarea");
let imgbody = doc.querySelector(".result_img");
let carga = doc.querySelector(".loader");
let resultText = doc.getElementById("result_text");
let resultTitle = doc.getElementById("result_title");
let buttonEncrypt = doc.getElementById("encriptarBtn");
let buttonDecrypt = doc.getElementById("desencriptarBtn");
let buttonCopy = doc.getElementById("copiarBtn");

// Array de llaves de encriptación y desencriptación, donde cada par contiene la letra original y su versión encriptada
let llaves = [
  ["e", "enter"],
  ["i", "imes"],
  ["o", "ober"],
  ["u", "ufat"],
  ["a", "ai"],
];

// Función para encriptar el mensaje de entrada
function encriptarMensaje(mensaje) {
  return mensaje
    .split("") // Divide el mensaje en un array de caracteres
    .map((letra) => {
      // Busca la letra en el array de llaves y la reemplaza si encuentra un match
      let reemplazo = llaves.find(([original]) => original === letra);
      return reemplazo ? reemplazo[1] : letra; // Devuelve la letra encriptada o la letra original si no hay reemplazo
    })
    .join(""); // Une el array de caracteres nuevamente en un string
}

// Función para desencriptar el mensaje de entrada
function desencriptarMensaje(mensaje) {
  let mensajeDesencriptado = mensaje;
  llaves.forEach(([original, encriptado]) => {
    // Reemplaza todas las ocurrencias de la versión encriptada con la letra original usando una expresión regular
    let regex = new RegExp(encriptado, "g");
    mensajeDesencriptado = mensajeDesencriptado.replace(regex, original);
  });
  return mensajeDesencriptado; // Devuelve el mensaje desencriptado
}

// Evento para detectar la entrada del usuario en el textarea
textarea.addEventListener("input", () => {
  imgbody.style.display = "none"; // Oculta la imagen de resultado por defecto
  carga.classList.remove("hidden"); // Muestra el loader
  resultTitle.textContent = "Capturando mensaje..."; // Actualiza el título del resultado
  resultText.textContent = ""; // Limpia el contenido del resultado
});

// Evento para encriptar el texto cuando se hace clic en el botón "Encriptar"
buttonEncrypt.addEventListener("click", (e) => {
  e.preventDefault(); // Previene el comportamiento predeterminado del formulario
  let mensaje = textarea.value.toLowerCase(); // Obtiene el valor del textarea y lo convierte a minúsculas
  let mensajeEncriptado = encriptarMensaje(mensaje); // Encripta el mensaje
  resultText.textContent = mensajeEncriptado; // Muestra el mensaje encriptado en el resultado
  buttonCopy.classList.remove("hidden"); // Muestra el botón "Copiar"
  resultTitle.textContent = "El resultado es:"; // Actualiza el título del resultado
});

// Evento para desencriptar el texto cuando se hace clic en el botón "Desencriptar"
buttonDecrypt.addEventListener("click", (e) => {
  e.preventDefault(); // Previene el comportamiento predeterminado del formulario
  let mensaje = textarea.value.toLowerCase(); // Obtiene el valor del textarea y lo convierte a minúsculas
  let mensajeDesencriptado = desencriptarMensaje(mensaje); // Desencripta el mensaje
  resultText.textContent = mensajeDesencriptado; // Muestra el mensaje desencriptado en el resultado
  buttonCopy.classList.remove("hidden"); // Muestra el botón "Copiar"
});

// Evento para copiar el texto encriptado o desencriptado al portapapeles cuando se hace clic en el botón "Copiar"
buttonCopy.addEventListener("click", () => {
  let textoCopiado = resultText.textContent; // Obtiene el texto del resultado
  navigator.clipboard.writeText(textoCopiado).then(() => {
    // Copia el texto al portapapeles y luego ejecuta la función callback
    imgbody.style.display = "block"; // Muestra la imagen de resultado nuevamente
    carga.classList.add("hidden"); // Oculta el loader
    resultTitle.textContent = "El texto se copió"; // Actualiza el título del resultado para indicar que se copió el texto
  });
});