'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar rutass 
var User_Route = require('./routes/user')
var Curso_Route = require('./routes/curso')

// Middlerwares
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Rutas
app.use('/api', User_Route)
app.use('/api', Curso_Route)

// Exports
module.exports = app;






