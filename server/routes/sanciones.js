const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Sancion = mongoose.model('sanciones');
var {ObjectID} = require('mongodb');
const _ = require('lodash');

router.get('/', (req, res) =>{
    Sancion.find().then((sanciones)=>{
        res.send(sanciones);
    }, (e) => {
        res.status(400).send(e);
    });
});

router.post('/', (req, res)=> {
    var sancion = new Sancion({
        departamento: req.body.departamento,
        provincia: req.body.provincia,
        distrito: req.body.distrito,
        actividadEconomica: req.body.actividadEconomica,
        razonSocial: req.body.razonSocial,
        numeroIdentificacion: req.body.numeroIdentificacion,
        servicioOProducto: req.body.servicioOProducto,
        hechoInfractor: req.body.hechoInfractor,
        tipoDeAmonestacion: req.body.tipoDeAmonestacion,
        montoMulta: req.body.montoMulta,
        numeroResolucion: req.body.numeroResolucion,
        anoResolucion: req.body.anoResolucion,
        oficinaResponsable: req.body.oficinaResponsable
    });

    sancion.save().then((doc)=>{
        var id = _.pick(doc, ['_id']);

        Sancion.findById(id).then((sancion) => {
          res.send(sancion);
        });
    }, (e) => {
        res.status(400).send(e);
    });
});


module.exports = router;
