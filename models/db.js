const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  allowExitOnIdle: true,
  port: 5432,
});

try {
    pool.query("SELECT NOW()"); // Realiza una consulta simple para verificar que se haya podido establecer la conexión
    console.log("Conexión a la Base de Datos exitosa"); //Si la conexión fue exitosa, imprime el mensaje en  la consola
  } catch (error) {
    //Instancia si hay un error
    console.log(`Error al realizar la conexión a la Base de Datos: ${error}`);
  }
  
  module.exports = { pool };