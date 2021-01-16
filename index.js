// SINTAXIS COMMON.JS
// importando express, asignando a una variable
const express = require('express');
const router = require('./routes/index.js');
const db = require('./config/db.js');

// SINTAXIS IMPORT para que funcione installar node v14 o superior
// para esta sintasis tienes que poner en package.json  "type":"module",
//import express from 'express'
//import router from './routes/index.js'

// funcion para ejecutar express que le estoy asignando a este app
const app = express();


require('dotenv').config({ path: 'variables.env'})

// Conectar la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch( error => console.log(error));





// Definir puerto
// const port = process.env.PORT || 4000;

// .get cuando visito una url / que es la principal
// req lo que envias, caundo visitas la pagina
// res lo que express te responde, mandaste los datos mal, esta pagina no existe
// app.get('/', (req, res) => {
//     // creas tu propia respuesta
//     // .send muestra algo en pantalla
//    // res.send('Hola mundo');

//     // respuesta tipo json
//     // res.json({
//     //     id: 1
//     // })

    
//     res.send('Inicio');
//     // .render se utiliza para mostrar una vista
// });

// app.get('/nosotros', (req, res) => {
    // send imprime lo que hay aqui
//     res.send('Nosotros');
// });
// app.get('/contacto', (req, res) => {
//     res.send('Contacto');
// });




// Habilitar PUG
// queremos utilizar el template engine de pug
app.set('view engine','pug');



// Obtener el año actual
// use soporta todo si visitas esta pagina se ejecuta
// req lo que mandas al servidor
// res lo que te devuelve el servidor express
// next irte al siguiente middleware, sino se lo pones no va al siguiente middleware 
app.use( (req, res, next) => {
    // console.log(res);

    //crear una variable y pasarla a la vista de footer
    //res.locals.unaVariable = 'Una Nueva Variable';

    // console.log(res.locals);

    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = 'Agencia de Viajes';
    next();// sino funciona le pones return next()
})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended:true}));

// Agregar Router
// use soporta get post put path y delete
// / desde la pagina principal agrega router y eso agrega nosotros inicio contacto etc...
app.use('/', router);

// Siguiente middleware
// Definir la carpeta publica como los archivos estaticos de express
// de esta forma ya tiene acceso a estos archivos
app.use(express.static('public'));


//arranca el servidor en el puerto que quieres ejecutar
// app.listen(port, ()=>{
//     console.log(`El Servidor esta funcionando en el puerto ${port}`)
// });

// Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, ()=>{
    console.log(`El Servidor esta funcionando`);
});