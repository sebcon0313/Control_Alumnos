'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        user_name: user.nombre,
        user_subname: user.apellido,
        gmail: user.gmail,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };

    return jwt.encode(payload, secret);
};