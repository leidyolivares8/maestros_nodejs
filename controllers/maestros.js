'use strict'

const { validationResult } = require('express-validator');

var Maestros = require('../models/maestros');

var controller = {
    maestros: function(req, res) {

        Maestros.find({}).exec((err, maestros) => {
            if (err) return res.status(500).json({ status: 500, mensaje: err });
            if (!maestros) return res.status(404).json({ status: 404, mensaje: "No hay maestros por listar." });

            return res.status(200).json({
                status: 200,
                data: maestros
            });

        });

    },
    maestro: function(req, res) {

        let n_lista = req.params.n_lista;

        Maestros.findOne({ identificacion: n_lista }).exec((err, maestro) => {
            if (err) return res.status(500).json({ status: 500, mensaje: err });
            if (!maestro) return res.status(404).json({ status: 404, mensaje: "No se encontro el maestro." });

            return res.status(200).json({
                status: 200,
                data: maestro
            });

        });
    },
    crear_maestro: function(req, res) {
        //Validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let user_info = req.body;

        Maestros.findOne({ identificacion: user_info.identificacion }).exec((err, maestro) => {
            if (err) return res.status(500).json({ status: 500, mensaje: err });
            if (maestro) return res.status(200).json({ status: 200, mensaje: "El numero de identificacion del maestro ya existe." });

            let maestros_model = new Maestros();

            maestros_model.identificacion = user_info.identificacion;
            maestros_model.nombre = user_info.nombre;
            maestros_model.email = user_info.email;
            maestros_model.edad = user_info.edad;
            maestros_model.genero = user_info.genero;

            maestros_model.save((err, maestroStored) => {
                if (err) return res.status(500).json({ status: 500, mensaje: err });
                if (!maestroStored) return res.status(404).json({ status: 404, mensaje: "No se logro almancenar el maestro." });
            });

            return res.status(200).json({
                status: 200,
                menssage: "Usuario maestro almacenado."
            });

        });
    },
    actualizar_maestro: function(req, res) {
        //Validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let n_identificacion = req.params.n_identificacion;
        let maestro_info = req.body;

        let maestro_info_update = {
            nombre: maestro_info.nombre,
            email: maestro_info.email,
            edad: maestro_info.edad,
            genero: maestro_info.genero
        };

        Maestros.findOneAndUpdate({ identificacion: n_identificacion }, maestro_info_update, { new: true }, (err, maestroUpdate) => {
            if (err) return res.status(500).json({ message: 'Error al actualizar' });
            if (!maestroUpdate) return res.status(404).json({ message: 'No existe un maestro con esa identificacion' });

            return res.status(200).json({
                status: 200,
                message: "Los datos del maestro fueron actualizados",
                data: maestroUpdate
            });

        });

    },
    delete_maestro: function(req, res) {

        let n_identificacion = req.params.n_identificacion;

        Maestros.findOneAndDelete({ identificacion: n_identificacion }, (err, maestroDelete) => {
            if (err) return res.status(500).json({ status: 500, message: "Error al eliminar" });
            if (!maestroDelete) return res.status(404).json({ status: 404, message: "El número de identificación no existe" });

            return res.status(200).json({
                status: 200,
                message: "El maestro fue eliminado",
                data: maestroDelete
            });
        });

    }

};
module.exports = controller;