const Usuario =require('../model/Usuarios')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (req,res)=>{

    const errores = validationResult(req)
    if( !errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extraer el email y el password
    const {email , password}= req.body    
    try {
        //revisar que el usuario sea unico
        let usuario = await Usuario.findOne({ email})

        if(usuario){
            return res.status(400).json({msg:'El usuario ya existe'})
        }

        //crear el nuevo usuario
        usuario = new Usuario(req.body)

        //hashear el password
        const salt = await bcryptjs.genSalt(10)
        usuario.password = await bcryptjs.hash(password,salt)
        //guardar un usuario
        await usuario.save()    

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
        res.status(400).send('Hubo un error')
    }
}