const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Solicitud = mongoose.model('solicitudes');
var {ObjectID} = require('mongodb');
const _ = require('lodash');

router.get('/', (req, res) =>{
    Solicitud.find().then((solicitudes)=>{
        res.send(solicitudes);
    }, (e) => {
        res.status(400).send(e);
    });
});

router.get('/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Solicitud.findById(id).then((solicitud)=>{
        if(!solicitud){
            return res.status(404).send();
        }
        res.send(solicitud);
    }).catch((e)=>{
        res.status(400).send()
    });
});

router.post('/', (req, res)=> {
    var solicitud = new Solicitud({
        jugador: req.body.jugador,
        equipoSolicitado: req.body.equipoSolicitado
    });

    solicitud.save().then((doc)=>{
        var id = _.pick(doc, ['_id']);

        Solicitud.findById(id).then((solicitud) => {
          res.send(solicitud);
        });

        //res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

router.patch('/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['estadoSolicitud']);

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Solicitud.findByIdAndUpdate(id, {$set: body}, {new: true}).then((solicitud) => {
        if(!solicitud) {
            return res.status(404).send();
        }

        Solicitud.findById(id).then((solicitud) => {
          res.send(solicitud);
        });

        //res.send(solicitud);
    }).catch((e) => {
        res.status(400).send();
    })
});

router.delete('/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Solicitud.findByIdAndRemove(id).then((solicitud)=> {
        if(!solicitud) {
            return res.status(404).send();
        }

        res.send(solicitud);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;
