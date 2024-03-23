const express = require("express");
const { obtenerJoyas, prepararHATEOAS, obtenerJoyasPorFiltro } = require("./controllers/joyasController");
const loggerMiddleware = require("./logs/logger.js");

const app = express();
require("dotenv").config();


app.use(express.json());
app.use(loggerMiddleware);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // Establece la aplicación para escuchar en el puerto 5000
  console.log(`Server listening on port http://localhost:${PORT}`);
});

app.get("/joyas", async (req, res) => {
  try {
    const joyas = await obtenerJoyas(req.query);
    const HATEOAS = await prepararHATEOAS(joyas);
    res.status(200).json(HATEOAS);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

app.get("/joyas/filtros", async(req,res) => {
  try{
    const queryStrings  = req.query;
    const joyas = await(obtenerJoyasPorFiltro(queryStrings));
    res.json(joyas);
  }catch(e){
    console.log(e); 
    res.status(500).send(e.message)
  }
})

app.get("*", (req, res) => {
  res.status(404).send("Esta ruta no existe");
});
