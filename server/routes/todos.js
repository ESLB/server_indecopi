const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = mongoose.model('todos');
var {ObjectID} = require('mongodb');
const _ = require('lodash');

router.get('/', (req, res) => {
  Todo.find().then((todos) => {
    res.send(todos);
  }, (e) => {
    res.status(400).send(e);
  });
});

router.get('/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e) => {
    res.status(400).send();
  });
});

router.post('/', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
      var id = _.pick(doc, ['_id']);

      Todo.findById(id).then((todo) => {
        res.send(todo);
      });

    //res.send(doc);

  }, (e) => {
    res.status(400).send(e);
  });
});

router.patch('/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
      res.send(todo);
    });


    //res.send(todo);
  }).catch((e) => {
    res.status(400).send();
  })
});

router.delete('/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send(todo);
  }).catch((e) => {
    res.status(400).send();
  });
});

module.exports = router;
