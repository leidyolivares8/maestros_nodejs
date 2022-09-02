'use strict'
const express = require('express');
const api = express.Router();
const { body } = require('express-validator');

var WelcomeController = require('../controllers/welcome');
var AlumnosController = require('../controllers/alumnos');
let AuthController = require('../controllers/auth');
let MaestrosController = require('../controllers/maestros')

let userProtectUrl = require('../middlewares/authUser').userProtectUrl;

api.get("/", WelcomeController.welcome);
api.get("/alumnos", AlumnosController.alumnos);
api.get("/alumno/:n_lista", AlumnosController.alumno);
api.post("/alumno", userProtectUrl, [
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.crear_alumno);

api.put("/alumno/:n_lista", [
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.update_alumno);

api.delete("/alumno/:n_lista", AlumnosController.delete_alumno);

api.get("/login", [
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty()
], AuthController.login);
api.post("/logout", userProtectUrl, AuthController.logout);

api.post("/crear_login", [
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty()
], AuthController.crear_login);


api.get("/maestros", MaestrosController.maestros);
api.get("/maestro/:n_lista", MaestrosController.maestro);

api.post("/maestro", userProtectUrl, [
    body('identificacion').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('email').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], MaestrosController.crear_maestro);

api.put("/maestro/:n_identificacion", userProtectUrl, [
    body('nombre').not().isEmpty(),
    body('email').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], MaestrosController.actualizar_maestro);

api.delete("/maestro/:n_identificacion", userProtectUrl, MaestrosController.delete_maestro)

module.exports = api;