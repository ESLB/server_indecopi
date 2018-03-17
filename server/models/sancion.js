var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SancionSchema = new Schema({
  departamento:{
    type: String,
    trim: true
  },
  provincia:{
    type: String,
    trim: true
  },
  distrito:{
    type: String,
    trim: true
  },
  actividadEconomica:{
    type: String,
    trim: true
  },
  razonSocial:{
    type: String,
    trim: true
  },
  numeroIdentificacion:{
    type: String,
    trim: true
  },
  servicioOProducto:{
    type: String,
    trim: true
  },
  hechoInfractor:{
    type: String,
    trim: true
  },
  tipoDeAmonestacion:{
    type: String,
    trim: true
  },
  montoMulta:{
    type: String,
    trim: true
  },
  numeroResolucion:{
    type: String,
    trim: true
  },
  anoResolucion:{
    type: String,
    trim: true
  },
  oficinaResponsable:{
    type: String,
    trim: true
  }
});


mongoose.model('sanciones', SancionSchema, 'sanciones');
