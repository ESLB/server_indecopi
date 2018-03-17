const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Reclamo = mongoose.model('reclamos');
var {ObjectID} = require('mongodb');
const _ = require('lodash');

router.get('/', (req, res) =>{
    Reclamo.find().then((reclamos)=>{
        res.send(reclamos);
    }, (e) => {
        res.status(400).send(e);
    });
});

router.post('/', (req, res)=> {
    var reclamo = new Reclamo({
        departamento: req.body.departamento,
        numeroIdentificacion: req.body.numeroIdentificacion,
        motivoReclamo: req.body.motivoReclamo
    });

    reclamo.save().then((doc)=>{
        var id = _.pick(doc, ['_id']);

        Reclamo.findById(id).then((reclamo) => {
          res.send(reclamo);
        });
    }, (e) => {
        res.status(400).send(e);
    });
});

module.exports = router;
