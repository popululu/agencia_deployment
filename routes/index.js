const express = require('express');
const { paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaDetalleViaje } = require('../controlers/paginasControler.js');
const { guardarTestimonial } = require('../controlers/testimonialControler.js');

const router = express.Router();

router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);
// :viaje comodin 1,2,3...
router.get('/viajes/:slug', paginaDetalleViaje);

router.get('/testimoniales', paginaTestimoniales);

router.post('/testimoniales', guardarTestimonial);

module.exports = router;

// sintaxis express
//import express from 'express'
// export default router