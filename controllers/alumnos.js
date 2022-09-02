'use strict'

const { validationResult } = require('express-validator');

var Alumnos = require('../models/alumnos');

var controller = {
    alumnos: function(req, res){
        
        Alumnos.find({}).exec( (err, alumnos) =>{
            if(err) return res.status(500).json({status: 500,mensaje: err});
            if(!alumnos) return res.status(200).json({status: 200,mensaje: "No hay alumnos por listar."});

            return res.status(200).json({
                status: 200,
                data: alumnos
            });

        });

    },

    alumno: function(req, res){
        
        let n_lista = req.params.n_lista;

        Alumnos.findOne({n_cuenta: n_lista}).exec( (err, alumno) =>{
            if(err) return res.status(500).json({status: 500,mensaje: err});
            if(!alumno) return res.status(200).json({status: 200,mensaje: "No se encontro el alumno."});

            return res.status(200).json({
                status: 200,
                data: alumno
            });

        });

    },

    crear_alumno: function(req, res){

        //Validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        let user_info = req.body;


        Alumnos.findOne({n_cuenta: user_info.n_cuenta}).exec( (err, alumno) =>{
            if(err) return res.status(500).json({status: 500,mensaje: err});
            if(alumno) return res.status(200).json({status: 200,mensaje: "El numero de cuenta ya existe."});
        
            let alumnos_model = new Alumnos();

            alumnos_model.n_cuenta = user_info.n_cuenta;
            alumnos_model.nombre = user_info.nombre;
            alumnos_model.edad = user_info.edad;
            alumnos_model.genero = user_info.genero;

            alumnos_model.save((err, alumnoStored) => {
                if(err) return res.status(500).json({status: 500,mensaje: err});
                if(!alumnoStored) return res.status(200).json({status: 200,mensaje: "No se logro almancenar el alumno."});
            });

            return res.status(200).json({
                status: 200,
                menssage: "Usuario almacenado." 
            });
        
        });

    },

    update_alumno: function(req, res) {
        //Validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        let n_lista = req.params.n_lista;
        let user_info = req.body;

        let alumno_info_update = {
            nombre: user_info.nombre, 
            edad: user_info.edad, 
            genero: user_info.genero 
        };

        Alumnos.findOneAndUpdate({n_cuenta: n_lista}, alumno_info_update, {new:true}, (err, alumnoUpdate) => {
            if(err) return res.status(500).json({message: 'Error al actualizar.'});
            if(!alumnoUpdate) return res.status(404).json({message: 'No existe el alumno.'});


            console.log(alumnoUpdate);

            return res.status(200).json({
                nombre: alumnoUpdate.nombre, 
                edad: alumnoUpdate.edad, 
                genero: alumnoUpdate.genero 
            });


        });

        
        
    },

    
    delete_alumno: function(req, res) {

        let n_lista = req.params.n_lista;

        Alumnos.findOneAndRemove({n_cuenta: n_lista}, (err, alumnoDelete) => {
            if(err) return res.status(500).json({message: 'Error al eliminar.'});
            if(!alumnoDelete) return res.status(404).json({message: 'No existe el alumno.'});

            return res.status(200).json({
                message: "Usuario eliminado."
            });

        });

    }
    

};
module.exports = controller;