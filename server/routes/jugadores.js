const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Jugador = mongoose.model('jugadores');
var {ObjectID} = require('mongodb');
const _ = require('lodash');

router.get('/', (req, res) =>{
    Jugador.find().then((jugadores)=>{
        res.send(jugadores);
    }, (e) => {
        res.status(400).send(e);
    });
});

router.get('/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Jugador.findById(id).then((jugador)=>{
        if(!jugador){
            return res.status(404).send();
        }
        res.send(jugador);
    }).catch((e)=>{
        res.status(400).send()
    });
});

router.get('/public/:ids', (req, res)=>{
  var ids = req.params.ids;
  var jugadoresIds = ids.split(",");
  Jugador.find({'_id':{$in:jugadoresIds}},{"nombre": 1, "edad": 1, "perfilImagen":1}).then((doc)=>{
    res.send(doc);
  });
});


router.post('/', (req, res)=> {
    var jugador = new Jugador({
        nombre: req.body.nombre,
        edad: req.body.edad,
        email: req.body.email,
        password: req.body.password,
        ubicacion: req.body.ubicacion,
        telephone: req.body.telephone,
        perfilImagen: req.body.perfilImagen
    });

    jugador.save().then((doc)=>{

        var id = _.pick(doc, ['_id']);

        Jugador.findById(id).then((jugador) => {
          res.send(jugador);
        });

        //res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

router.patch('/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['nombre', 'edad', 'telephone','ubicacion','email','password','solicitudes','retos','teams','perfilImagen']);

    if (!ObjectID.isValid(id)) {
      return res.status(404).send("1");
    }

    Jugador.findByIdAndUpdate(id, {$set: body}, {new: true}).then((jugador) => {
        if(!jugador) {
            return res.status(404).send("2");
        }

        Jugador.findById(id).then((jugador) => {
          res.send(jugador);
        });

        //res.send(jugador);
    }).catch((e) => {
        res.status(400).send("3");
    })
});

router.delete('/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Jugador.findByIdAndRemove(id).then((jugador)=> {
        if(!jugador) {
            return res.status(404).send();
        }

        res.send(jugador);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;
