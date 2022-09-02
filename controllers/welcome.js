'use strict'

var controller = {

    welcome: function(req, res){
        console.log("Get ejecutado en raiz");
        res.send("Mi primer debug");
    }/*,

    alumnos: function(req, res){
        res.send("Mi listado de alumnos");
    },

    alumno: function(req, res){
        let cal1 = 5;
        let cal2 = 5;
        let cal3 = 5;

        let final = (cal1 + cal2 + cal3) / 3;

        console.log(final);

        if(final < 6){
            return res.status(400).json({
                status: 400,
                cal_final: final
            }); 
        }else{
            return res.status(200).json({
                status: 200,
                cal_final: final
            });
        }

        //res.send("La calificacion final es: "+final);
    },

    crear_alumno: (req, res) => {

        let user_info = req.body;
        
        console.log(user_info);

        //res.send("Creamos un alumno " + user_info.nombre + " Edad " + user_info.edad);
        return res.status(200).json({
            status: 200,
            nombre_de_alumno: user_info.nombre + " " + user_info.apellido,
            edad: user_info.edad
        });
    }*/

};

module.exports = controller;