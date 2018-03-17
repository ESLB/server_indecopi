const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Reto = mongoose.model('retos');
var {ObjectID} = require('mongodb');
const _ = require('lodash');

router.get('/', (req, res) =>{
    Reto.find().then((retos)=>{
        res.send(retos);
    }, (e) => {
        res.status(400).send(e);
    });
});

router.get('/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Reto.findById(id).then((reto)=>{
        if(!reto){
            return res.status(404).send();
        }
        res.send(reto);
    }).catch((e)=>{
        res.status(400).send()
    });
});

router.post('/', (req, res)=> {
    var reto = new Reto({
        equipoRetador: req.body.equipoRetador,
        equipoRetado: req.body.equipoRetado,
        locacion: req.body.locacion
    });

    reto.save().then((doc)=>{

        var id = _.pick(doc, ['_id']);

        Reto.findById(id).then((reto) => {
          res.send(reto);
        });

        //res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

router.patch('/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['estadoReto']);

    if (!ObjectID.isValid(id)) {
      return res.status(404).send("1");
    }

    Reto.findByIdAndUpdate(id, {$set: body}, {new: true}).then((reto) => {
        if(!reto) {
            return res.status(404).send("2");
        }


        Reto.findById(id).then((reto) => {
          res.send(reto);
        });
        //res.send(reto);
    }).catch((e) => {
        res.status(400).send("3");
    })
});

router.delete('/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Reto.findByIdAndRemove(id).then((reto)=> {
        if(!reto) {
            return res.status(404).send();
        }

        res.send(reto);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;
