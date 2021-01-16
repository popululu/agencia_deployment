const  Testimonial  = require('../models/Testimoniales.js');

const guardarTestimonial= async (req, res) => {   

    //trae lo que escribes en el formulario
    // console.log(req.body);

    // Validar...
    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    if(nombre.trim() === ''){
        errores.push({mensaje:'El nombre esta vacio'});
    }
    if(correo.trim() === ''){
        errores.push({mensaje:'El Correo esta vacio'});        
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje:'El Mensaje esta vacio'});        
    }

    if(errores.length > 0) {
        // Consular testimoniales existentes
        const testimoniales = await Testimonial.findAll();


        // Mostrar la vista con errores
        // la vista
        // la informacion que deseas enviar
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }else{
        // guardarlo en la bd

        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = {
    guardarTestimonial
}