const Usuario =require('../model/Usuarios')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req,res)=>{

    const errores = validationResult(req)
    if( !errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extraer el email y el password
    const {email , password}= req.body

    try {
        //revisar  que esea un usuario registrado
        let usuario = await Usuario.findOne({email})
        if(!usuario){
            return res.status(400).json({msg:'El usuario no existe'})
        }
        //revisar el password
        const passCorrecto = await bcryptjs.compare(password,usuario.password)
        if(!passCorrecto){
            return res.status(400).json({msg:'Password incorrecto'})
        }
        //firmar y crear el jwt
        const payload={
            usuario: {
                id:usuario.id
            } 
        }

        //firmar jwt
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn:3600
        },(error,token)=>{
            if(error) throw error
            //mensaje de confirmacion
            res.json({token})
        })
    } catch (error) {
        console.log(error)
    }
}

// Obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}