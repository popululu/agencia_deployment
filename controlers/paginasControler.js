// const { Viaje } = require('../models/Viaje.js');
const  Viaje2  = require('../models/Viaje.js');
const  Testimonial  = require('../models/Testimoniales.js');



const paginaInicio = async (req, res) => {       
    // Ejecutar varios await al mismo tiempo 
    const promiseDB = [];
    promiseDB.push(Viaje2.findAll({ limit: 3}));
    promiseDB.push(Testimonial.findAll({ limit: 3}))

    // Consultar 3 viajes del modelo Viaje
    try {
        // res.send('Inicio');   

        // async detiene el codigo await espera hasta que se ejecute la linea y luego continua
        // const viajes = await Viaje2.findAll({ limit: 3});
        // const testimoniales = await Testimonial.findAll({ limit: 3});

        
        // De esta forma ambas consultas arrancan al mismo tiempo
        // si tuviera que acabar una para arrancar la otra seria de la otra forma, pero estas van a consultar la bd al mismo tiempo
         const resultado = await Promise.all(promiseDB);


        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            // viajes,
            // testimoniales
            viajes: resultado[0],
            testimoniales: resultado[1]
        });    
    } catch (error) {
        console.log(error)
    }

   
};

const paginaNosotros = (req, res) => {
    //. render va a buscar ese archivo y lo va mostrar

    const viajes = 'Viaje a Alemania';

    res.render('nosotros', {
        // pasar la variable objeto 
        // textoViajes : viajes
        pagina: 'Nosotros'
    });
}


const paginaViajes = async (req, res) => {    
    // Consultar BD
    // viene de https://sequelize.org/master/manual/model-querying-basics.html
    // trae todos los de la bd
       const viajes = await Viaje2.findAll();     
    //    console.log(viajes);
    res.render('viajes', {       
        pagina: 'Proximos Viajes',
        viajes: viajes
    });
}

const paginaTestimoniales = async (req, res) => {    

    try {
        const testimoniales = await Testimonial.findAll();
         res.render('testimoniales', {       
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {    

    // console.log(req.params);
    // console.log(req.params.viaje);
     const { slug } = req.params;

    try {
         const viaje = await Viaje2.findOne({ where: { slug: slug }});

        res.render('viaje', {
            pagina: 'informacion Viaje',
            viaje
        })
    } catch (error) {
        console.log(error)        ;
    }
}

module.exports = {
     paginaInicio,
     paginaNosotros,
     paginaViajes,
     paginaTestimoniales,
     paginaDetalleViaje
 };