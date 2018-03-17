var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RetoSchema = new Schema({
  equipoRetador: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  equipoRetado: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  locacion: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  estadoReto: {
    type: Number,
    default: 0
  }
});

mongoose.model('retos', RetoSchema, 'retos');