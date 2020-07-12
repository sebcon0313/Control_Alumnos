'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = Schema ({
    user_name: String,
    user_subname: String,
    password: String,
    gmail: String,
    rol: String,
    cursos_asignados: [{}]

});

module.exports = mongoose.model('User', Schema); 