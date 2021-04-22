const express = require('express')
const router = express.Router()
const tareasController = require('../controllers/tareaController')
const auth = require('../middleware/auth')
const {check}= require('express-validator')


//crear tarea
//api/tarea

router.post('/',
    auth,
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('proyecto','El proyecto es obligatorio').not().isEmpty()
    ],
    tareasController.crearTarea
)

//obtner tareas
router.get('/',
    auth,
    tareasController.obtenerTareas
)
//actualizar tarea
router.put('/:id',
    auth,
    tareasController.actualizarTarea
)
//eliminar un tarea
router.delete('/:id',
    auth,
    tareasController.eliminarTarea
)

module.exports = router