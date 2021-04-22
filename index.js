const express = require('express')
const conectarDB = require('./config/db')
const cors = require('cors')
//crear el servidor
const app = express()
//conectar a la base de datos
conectarDB()

//habilitar cors
app.use(cors())

//habilitar express json
app.use(express.json({extended:true}))

const port = process.env.PORT || 4000

//importar rutas
app.use('/api/usuarios',require('./routes/usuarios'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/proyectos',require('./routes/proyectos'))
app.use('/api/tareas',require('./routes/tareas'))

//puerto de la app

app.listen(port,'0.0.0.0',()=>{
    console.log(`el puerto esta funcionado en el puerto ${port}`)
})
