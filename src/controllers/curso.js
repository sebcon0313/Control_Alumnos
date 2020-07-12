'use strict'

var Curso = require('../models/curso')

//============================================== CREAR CURSOS ============================================================================
function saveCurso(req, res) {
    try{
        var params = req.body;
        var curso = new Curso()

        if (params.curso_name ){

            curso.curso_name = params.curso_name
            
            Curso.find({ $or: [
                {curso_name: curso.curso_name.toLowerCase()}
            ]}).exec((err, cursos) => {
                if(err) return res.status(500).send({mensaje: 'Error a la peticion'})

                if(cursos && cursos.length >= 1){
                    return res.status.send({mensaje: 'Este curso ya Existe'})

                }else{
                    curso.save((err, cursoStored) => {
                        if(err) return res.status(404).send({mensaje: 'No se puede guardar el curso'})
        
                        if (cursoStored){
                            return res.status(200).send({curso: cursoStored})
                            
                        }else{
                            return res.status(404).send({mensaje: 'No se ha registrado el usuario'})
                        }
                    })
                }   
            })
        }else{
            return res.status(404).send({mensaje: ' Envia los datos necesarios'})
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: error.message })
    }
}





//================================= EXPORTS =================================================================================
module.exports = {
    saveCurso
}


