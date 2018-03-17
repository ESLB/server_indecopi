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
        provincia: req.body.provincia,
        distrito: req.body.distrito,
        actividadEconomica: req.body.actividadEconomica,
        razonSocial: req.body.razonSocial,
        numeroIdentificacion: req.body.numeroIdentificacion,
        rubro: req.body.rubro,
        motivoReclamo: req.body.motivoReclamo,
        comoSeResolvio: req.body.comoSeResolvio,
        duracionReclamo: req.body.duracionReclamo,
        numeroReclamo: req.body.numeroReclamo,
        ano: req.body.ano,
        oficinaAtendedora: req.body.oficinaAtendedora,
        sedesEnElDepartamento: req.body.sedesEnElDepartamento
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

router.post('/array', (req, res) => {
  var todo = req.body;
  var tamano = todo.array.length;
  var i;
  for (i = 0; i < tamano; i++) {
      var elemento = todo.array[i];
      var reclamo = new Reclamo({
        departamento: elemento.departamento,
        provincia: elemento.provincia,
        distrito: elemento.distrito,
        actividadEconomica: elemento.actividadEconomica,
        razonSocial: elemento.razonSocial,
        numeroIdentificacion: elemento.numeroIdentificacion,
        rubro: elemento.rubro,
        motivoReclamo: elemento.motivoReclamo,
        comoSeResolvio: elemento.comoSeResolvio,
        duracionReclamo: elemento.duracionReclamo,
        numeroReclamo: elemento.numeroReclamo,
        ano: elemento.ano,
        oficinaAtendedora: elemento.oficinaAtendedora,
        sedesEnElDepartamento: elemento.sedesEnElDepartamento
      });
      reclamo.save();
  }
      res.send("Hola " + tamano);
});


module.exports = router;
