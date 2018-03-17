var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SolicitudSchema = new Schema({
  jugador: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  equipoSolicitado: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  estadoSolicitud: {
    type: Number,
    default: 0
  }
});

mongoose.model('solicitudes', SolicitudSchema, 'solicitudes');