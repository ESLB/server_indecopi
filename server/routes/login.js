const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Jugador = mongoose.model('jugadores');
var {ObjectID} = require('mongodb');
const _ = require('lodash');

router.post('/', (req, res)=> {

    var body = _.pick(req.body, ['email','telephone','password']);

    Jugador.findOne({email : body.email, password: body.password}).then((doc)=>{
        if(!doc)
        {
            Jugador.findOne({telephone: body.telephone, password: body.password}).then((doc)=>{
                if(!doc)
                {
                    return res.status(404).send();
                } else {
                    res.send(doc);
                }

            });

        }else {
            res.send(doc);
        }

    });

});

router.get('/variosjugadores/:ids', (req, res)=>{

    var ids = req.params.ids;

    var jugadores = ids.split(",");
    Jugador.find({'nombre': {$in:jugadores}}).then((doc)=>{
        res.send(doc);
    });
    //res.send(resultado);
});

router.get('/varios/:ids', (req, res)=>{

    var ids = req.params.ids;

    var jugadores = ids.split(",");
    Jugador.find({'_id': {$in:jugadores}}).then((doc)=>{
        res.send(doc);
    });
    //res.send(resultado);
});
//5a40712143552020b492a5d0,5a593d7b3879140e5477b025

module.exports = router;
