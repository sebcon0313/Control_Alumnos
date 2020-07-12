'use strict'

var bcrypt = require('bcrypt-nodejs');

var User = require('../models/user');
var Curso = require('../models/curso')
var jwt = require('../services/jwt');

                                         //////////////////////
                                        //      ALUMNOS     //  
                                       //////////////////////

//======================================== CREAR USUARIO =============================================================================================
function saveUser (req, res){
        var params = req.body;
        var user = new User();
    try{
        if(params.user_name && params.user_subname && params.password && params.gmail){

            user.user_name = params.user_name;
            user.user_subname = params.user_subname;
            user.password = params.password;
            user.gmail = params.gmail; 
            user.rol = 'ROL_ALUMNO'

            User.find({ $or: [
                {gmail: user.gmail.toLowerCase()}
            ]}).exec((err, users) => {
                if (err) return res.status(500).send({mensaje: 'Error a la peticion de usuario'});

                if(users && users.length >= 1){
                    return res.status(404).send({mensaje: 'este usuario  ya existe'});

                }else{
                    bcrypt.hash(user.password, null, null, (err, hash) => {
                        user.password = hash;

                        user.save((err, userStored) => {
                            if(err) return res.status(500).send({mensaje: 'Error al guardar el usuario'});

                            if(userStored){
                                res.status(200).send({user: userStored});
                            }else{
                                res.status(404).send({mensaje: 'no se ha registrado el usuario'})
                            }
                        })
                    });
                }
            });
        }else{
            return res.status(404).send({mensaje: 'envia todos los datos necesarios'});
        }
    }catch(err){
        console.error(error)
        return res.status(500).send({error: error.message })
    }
}

//========================================= LOGEAR USUARIOS ================================================================
function Login(req, res) {
    try{
        var params = req.body

        var gmail = params.gmail
        var password = params.password

        User.findOne({gmail: gmail}, (err, user) => {
            if(err) return res.status(500).send({message: 'Error  a la peticion'})
            
            if(user){
                bcrypt.compare(password, user.password, (err, check) => {
                    if(check){
                        if(params.gettoken){
                            return res.status(200).send({token: jwt.createToken(user)})
                        }else{
                            user.password = undefined
                            return res.status(200).send({user})
                        }
                    }else{
                        return res.status(404).send({message:'no se identifica el usuario'});
                    }
                })
            }

        })


    }catch(error){
        console.error(error)
        return res.status(500).send({eror: error.message})
    }
}

//========================================= ASIGNAR CURSO ==================================================================
function asignarAlumno(req, res) {
    try {
        var userID = req.params.id;
        var params = req.body;
        var curso = new Curso()
    
        if(params.curso){
            User.findById(userID, (err, userEncontrado) =>{
                if(err){
                    res.status(404).send({message: 'Error al encontrar el usuario'});
                }else{
                    if(userEncontrado){
                        Curso.findById(params.curso, (err, cursoEncontrado) =>{
                            if(err) return res.status(500).send({message: 'Error al encontrar el Cuso'});

                            if(userEncontrado.cursos_asignados.length >= 3){
                                return res.status(403).send({message: 'maximo de cursos'})
                            }else{
                                userEncontrado.cursos_asignados.push(cursoEncontrado)
                                userEncontrado.save();
                                res.status(200).send({user: userEncontrado})     
                                 
                            }                                             
                        })
                    }
                }
            })
        }else{
            res.status(404).send({message: 'Introduce el id del Curso al que te quires agregar'});
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send({error: error.message })
    }
    
}

//========================================= LISTAR CURSOS DE ALUMNON ====================================================================
function listarCursosAlum(req, res) {

    User.find((error, users) => {
        if (error) return res.status(500).send({ mensaje: 'Error en la petición' })
        if (!users) return res.status(404).send({ mensaje: 'Error al mostrar los cursos del alumno' })
        return res.status(200).send({ mensaje: 'Cursos en los que se encuentro asignado', users })
    }).sort({ cursos_asignados: -1 })
}

//=========================================  EDITAR USUARIO =========================================================================
function updateUser(req,res) {
    try{
        var userId = req.params.id
        var update = req.body

        if(userId != req.user.sub){
            return res.status(401).send({message: 'Este usuario no existe'})
        }
        User.findByIdAndUpdate(userId, update, {new:false}, (err, userUpdate) => {
            if(err) return res.status(500).send({message: 'Error a la peticion'})

            if(!userUpdate) return res.status(500).send({message: 'No se ha podido actualizar el usuario'})
            
            return res.status(200).send({user: userUpdate})
            
        })
    }catch(error){
        console.error(error)
        return res.status(500).send({error: error.message})
    }
    
    
}
//========================================= ELIMINAR USUARIO ==============================================================================
function deleteUser(req,res) {
    try {
        var userId = req.params.id

        if (userId != req.user.sub) {
            return res.status(401).send({message: 'Este uuario no existe'})
        }
        User.findByIdAndDelete(userId, (err, userDelete) => {
            if(err) return res.status(500).send({message: ' Error a la peticion'})

            if(!userDelete) return res.status(500).send({message: 'No se pudo eliminar el usuario'})

            return res.status(200).send({user: userDelete})
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({error: error.message})
    }
    
}

                                         //////////////////////
                                        //      ALUMNOS     //  
                                       //////////////////////
  
//======================================== CREAR CURSO ===============================================================================
function CrearCursoMaes(req,res) {
    try {
        
    } catch (error) {
        console.error(error)
        return res.status(500).res({error: error.message})
    }
    
}

//========================================= EXPORTS =================================================================================
module.exports = {
    saveUser,
    Login,
    updateUser,
    deleteUser,
    asignarAlumno,
    listarCursosAlum
}