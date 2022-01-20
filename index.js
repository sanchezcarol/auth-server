

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

//Crear el servidor de express
const app = express();

//DB conection
dbConnection()

//CORS
app.use( cors() );

//Parseo del body
app.use( express.json() );

//Rutas
app.use( '/api/auth', require('./routes/auth') );


app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
}); 