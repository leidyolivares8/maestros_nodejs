'use stric'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlumnosSchema = Schema({
    n_cuenta: { type: Number, require: true, unique: true},
    nombre: { type: String, require: true},
    edad: { type: Number, require: true},
    genero: { type: String, require: true},
});

module.exports = mongoose.model('alumnos', AlumnosSchema);