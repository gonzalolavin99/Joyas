const fs = require("fs"); // Importa el módulo 'fs' (File System) de Node.js para poder interactuar con el sistema de archivos

const loggerMiddleware = (req, res, next) => {
  // Define una función llamada 'loggerMiddleware' que recibe los objetos 'req' (solicitud), 'res' (respuesta) y 'next' (función para pasar al siguiente middleware)

  const { method, url, headers, body } = req; // Desestructura las propiedades 'method', 'url', 'headers' y 'body' del objeto 'req' (solicitud)

  const timestamp = new Date().toISOString(); // Obtiene la fecha y hora actual en formato ISO (Ejemplo: '2023-04-10T15:30:00.000Z')

  const logEntry = `${timestamp} | ${method} ${url} | Headers: ${JSON.stringify(
    headers
  )} | Body: ${JSON.stringify(body)}\n`; // Construye una cadena 'logEntry' con la información de la solicitud (fecha/hora, método HTTP, URL, encabezados y cuerpo)

  fs.appendFile("request_log.txt", logEntry, (err) => {
    // Utiliza el método 'appendFile' del módulo 'fs' para agregar la cadena 'logEntry' al final del archivo 'request_log.txt'
    if (err) {
      console.error("Error al escribir en el archivo de registro:", err); 
    }
  });

  next(); // Llama a la función 'next' para pasar el control al siguiente middleware o a la ruta correspondiente
};

module.exports = loggerMiddleware; // Exporta la función 'loggerMiddleware' para que pueda ser utilizada en otros archivos
