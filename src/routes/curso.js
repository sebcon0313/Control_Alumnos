'use strict'

var CursoController = require('../controllers/curso')
var express = require('express')

var api = express.Router()
var md_auth = require('../middlerwares/authenticated')

api.post('/GuardarCurso',  CursoController.saveCurso)

module.exports = api;