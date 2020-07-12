'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router()
var md_Auth = require('../middlerwares/authenticated') 


api.post('/GuardarUser', UserController.saveUser);
api.post('/AsignarAlumno/:id', UserController.asignarAlumno)
api.put('/EditarAlumno/:id', md_Auth.ensureAusth, UserController.updateUser)
api.get('/Login', UserController.Login)
api.delete('/EliminarAlumno/:id',md_Auth.ensureAusth, UserController.deleteUser)
api.get('/ListarCursosAlum/:id', UserController.listarCursosAlum)
//api.get('/pruebaListar/:id', UserController.pruebaListar)

module.exports = api; 