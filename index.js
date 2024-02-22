if(process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT
const connect = require('./db/connect')
const userRoutes = require('./routes/users')
const taskRoutes = require('./routes/tasksList')

app.use(express.json())	
app.use('/user',userRoutes)
app.use('/task',taskRoutes)


app.get('/',(req,res)=>{
    res.status(200).json({mensaje:"Request Exitoso"})
})


app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})