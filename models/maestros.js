'use stric'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let MaestrosSchema = Schema({
    identificacion: { type: Number, require: [true, 'La identificacion es unica necesaria'], unique: true },
    nombre: { type: String, require: true },
    email: { type: String, require: true },
    edad: { type: Number, require: true },
    genero: { type: String, require: true },
});

module.exports = mongoose.model('maestros', MaestrosSchema);