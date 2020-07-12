'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Schema = Schema({
    name_curso: String,
})

module.exports = mongoose.model('Cursos', Schema)