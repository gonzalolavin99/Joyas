const {pool} = require("../models/db.js");
const format = require ('pg-format');

const obtenerJoyas = async({limits=3, order="id ASC", pagina = 1})=>{
    let query = "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s";
    const [campo,direccion] = order.split('_');
    const offset = (pagina -1)*limits;
    const formattedQuery  = format(query,  campo, direccion , limits ,offset);
    console.log(formattedQuery);
    const {rows: joyas } = await pool.query(formattedQuery);
    return joyas;
};

const obtenerJoyasPorFiltro = async ({ precio_max, precio_min, categoria, metal }) => {
    const filtros = [];
    const params = [];
  
    // Filter by price range (if both min and max are provided)
    if (precio_min && precio_max) {
      filtros.push(`(precio >= %s AND precio <= %s)`);
      params.push(precio_min, precio_max);
    } else {
      // Filter by price_min or price_max individually if only one is provided
      if (precio_min) {
        filtros.push(`precio >= %s`);
        params.push(precio_min);
      }
      if (precio_max) {
        filtros.push(`precio <= %s`);
        params.push(precio_max);
      }
    }
  
    // Filter by categoria (if defined)
    if (categoria) {
        filtros.push("categoria = '%s'");
        params.push(categoria);
      };
  
    // Filter by metal (if defined)
    if (metal) {
      filtros.push("metal = '%s'");
      params.push(metal);
    }
  
    let query = "SELECT * FROM inventario";
  
    // Add filters to the query if there are any
    if (filtros.length > 0) {
      const filtrosString = filtros.join(" AND ");
      query += ` WHERE ${filtrosString}`; 

    }
  
    console.log(query);
  
    const formattedQuery = format(query, ...params);
    // Execute the query in the database and return the results
    const { rows: joyas } = await pool.query(formattedQuery);
    return joyas;
  };
  
const prepararHATEOAS = (joyas) =>{
    const results = joyas.map((j)=>{
        return{
            name:  j.nombre,
            href:`/joyas/joya/${j.id}`
        }
    }).slice(0,4)
    const total = joyas.length
    const HATEOAS ={
        total,
        results
    }
    return HATEOAS
};

module.exports={obtenerJoyas,prepararHATEOAS,obtenerJoyasPorFiltro}