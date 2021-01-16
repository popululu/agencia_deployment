const Sequelize = require('sequelize');
require('dotenv').config({ path: 'variables.env'})

// const db = new Sequelize('agenciaviajes', 'root','',{
//     //127.0.0.1 es la dirección que apunta a tu PC, desde tu PC
//     host: '127.0.0.1',
//     port: '3306',
//     dialect: 'mysql',
//     define: {
//         timestamps: false
//     },
//     pool: {
//         max: 5,
//         min:0,
//         acquire: 30000,
//         idle: 10000
//     },
//     operatorAliases: false
// });

const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER,'',{
    //127.0.0.1 es la dirección que apunta a tu PC, desde tu PC
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min:0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});


module.exports = db;