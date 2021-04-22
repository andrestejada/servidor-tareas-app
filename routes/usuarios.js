//ruta pora crear usuarios
const express = require('express')
const router = express.Router()
const UsuariosControler = require('../controllers/UsuarioController')
const {check} = require('express-validator')

//crear usuario
//api/usuarios

router.post('/',
    [
        check('nombre','El nombre es obligatorio',).not().isEmpty(),
        check('email','Agrega un email valido').isEmail(),
        check('password','El password debe tener minimo 6 caracteres').isLength({min:6})
    ],
    UsuariosControler.crearUsuario
)

module.exports = router