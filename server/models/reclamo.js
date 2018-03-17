var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReclamoSchema = new Schema({
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
  rubro:{
    type: String,
    trim: true
  },
  motivoReclamo:{
    type: String,
    trim: true
  },
  comoSeResolvio:{
    type: String,
    trim: true
  },
  duracionReclamo:{
    type: String,
    trim: true
  },
  numeroReclamo:{
    type: String,
    trim: true
  },
  ano:{
    type: String,
    trim: true
  },
  oficinaAtendedora:{
    type: String,
    trim: true
  },
  sedesEnElDepartamento:{
    type: String,
    trim: true
  }
});

mongoose.model('reclamos', ReclamoSchema, 'reclamos');
