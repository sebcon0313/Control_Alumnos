'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Control_de_Alumnos',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('la conexion db se ha creado correctamente');

        // crear servidor
        app.listen(port,() => {
            console.log('Servidor creado');
        })
    })
    .catch(err => console.log(err));