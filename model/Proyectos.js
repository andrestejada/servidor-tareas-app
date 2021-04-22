const moongose = require('mongoose')
const ProyectosSchema = moongose.Schema({
    nombre:{
        type: String,
        trim: true,
        require:true
    },
    creador:{
        type: moongose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    creado:{
        type: Date,
        default: Date.now()
    }
})

module.exports = moongose.model('Proyecto',ProyectosSchema)