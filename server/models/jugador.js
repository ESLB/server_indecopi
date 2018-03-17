var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JugadorSchema = new Schema({
  nombre:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  edad: {
    type: Number,
    required: true,
    minlength: 1
  },
  email:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  password:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  ubicacion:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  telephone:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  perfilImagen:{
    type: String,
    trim: true,
	default: "https://icon-icons.com/icons2/924/PNG/512/Football_2-34_icon-icons.com_72069.png"
  },
  teams:{
    type: String,
    default: "",
    trim: true
  },
  retos:{
    type: String,
    default: "",
    trim: true
  },
  solicitudes:{
    type: String,
    default: "",
    trim: true
  } 
});

mongoose.model('jugadores', JugadorSchema, 'jugadores');
