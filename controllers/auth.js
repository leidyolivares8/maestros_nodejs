'use strict'
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');

var Usuarios = require('../models/usuarios');
var Sessions = require('../models/sessions');

var controller = {
    //Crear un registro
    crear_login: function(req, res) {

        let user_info = req.body;

        Usuarios.findOne({ mail: user_info.mail }).exec((err, usuarioDB) => {
            if (err) return res.status(500).json({ status: 500, mensaje: err });
            if (usuarioDB) return res.status(200).json({ status: 200, mensaje: "El usuario con ese email ya existe." });

            let usuario_model = new Usuarios();

            usuario_model.mail = user_info.mail;
            usuario_model.pass = bcrypt.hashSync(user_info.pass, 10); //encriptar el password

            usuario_model.save((err, usuarioStored) => {
                if (err) return res.status(500).json({ status: 500, mensaje: err });
                if (!usuarioStored) return res.status(404).json({ status: 404, mensaje: "No se logro almancenar el usuario." });
            });
            return res.status(200).json({
                status: 200,
                menssage: "Usuario almacenado."
            });
        });
    },
    login: function(req, res) {
        //Validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let login_info = req.body;

        Usuarios.findOne({ mail: login_info.mail }).exec((err, usuario) => {
            if (err) return res.status(500).json({ status: 500, mensaje: err });
            if (!usuario) return res.status(200).json({ status: 200, mensaje: "El email no es valido." });

            if (!bcrypt.compareSync(login_info.pass, usuario.pass)) {
                return res.status(400).json({
                    ok: false,
                    err: { message: 'Fallo password incorrecto' }
                });
            }

            const payload = {
                user_id: usuario.id
            };

            const access_token = jwt.sign(payload, 'Ews9MViUFXIZ8tYM6YMYJKq5ruFNjOELTMGrN257hZ1kns4RRt', {
                expiresIn: '1d'
            });

            let update = {
                user_id: usuario.id,
                jwt: access_token
            };

            Sessions.findOneAndUpdate({ user_id: usuario.id }, update, { upsert: true, new: true }, (err, sessionsUpdate) => {
                if (err) return res.status(500).send({ message: err });

                if (!sessionsUpdate) return res.status(404).send({ message: "Datos erroneos." });

                return res.status(200).json({
                    status: 200,
                    message: "Autenticación correcta.",
                    token: access_token
                });

            });

        });

    },

    logout: function(req, res) {

        console.log(req.decoded);
        Sessions.findOneAndRemove({ user_id: req.decoded.user_id }, (err, sessionDeleted) => {
            if (err) return res.status(500).send({ message: err });
            if (!sessionDeleted) return res.status(404).send({ message: "Datos erroneos." });

            return res.status(200).send({
                message: "Usuario salio correctamente."
            });

        });

    }

};
module.exports = controller;