//Aquí configuramos Mongoose, le pasamos la URL de conexión y eso es todo
//Cada uno de los modelos va por separados y hay varias formas de hacerlo
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/GOLApp');

module.exports = {mongoose};
