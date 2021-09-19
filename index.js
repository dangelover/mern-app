//configuracion basica de express
//importacion de express
const express = require("express");
//importacion de dotenv
//dotenv=> nos permite correr los procesos en el env
const dotenv = require("dotenv");
const cors = require("cors");
const { dbConnection } = require("./database/config");
dotenv.config();

//Crear servidor de express
const app = express();
//Conexion a base de datos
dbConnection();
//CORS
app.use(cors());

//use en express es conocido como middleware(este no es mas que una funcion que se ejecuta en el
//momento en que alguien hace una peticion al servidor)
//express.static=> de esta forma establecemos el middleware y el cual indicamos al public
app.use(express.static("public"));
//Lectura y parceo del body
//las peticiones que vengan en formato json la vamos a procesar con la funcion json
//y obtenemos su contenido
app.use(express.json());
//------Notas importantes
//configuracion de la primera ruta
//.(tipo de peticion que estamos esperando)
//primer parametro es la ruta
//segundo parametro callback(este se dispara con varios argumentos)
//req, res
// app.get("/", (req, res) => {
//   //   console.log("se requiere /");
//   //queremos que nos de una respuesta en formato json
//   res.json({
//     ok: true,
//   });
// });
//-------------
//Rutas
//usamos la funcion use y le pasamos como primer parametro como sera la ruta
//segundo parametro => require => donde se encuentra esta ruta
//todo lo que el auth exporte lo va habilitar en la ruta '/api/auth'
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
//escuchar peticiones
//llamamos a la funcion listen, primer argumento es el puerto en el cual debe correr
//segundo argumento es el callbak, se ejecutara cuando el servidor de express
//este arriba
app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});
