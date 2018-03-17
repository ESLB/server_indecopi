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
        numeroIdentificacion: req.body.numeroIdentificacion,
        hechoInfractor: req.body.hechoInfractor
    });

    sancion.save().then((doc)=>{
        var id = _.pick(doc, ['_id']);

        Solicitud.findById(id).then((sancion) => {
          res.send(sancion);
        });
    }, (e) => {
        res.status(400).send(e);
    });
});


module.exports = router;
