const express = require('express');
const colors = require('colors')
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const {errorHandler} = require ('./middleware/errorMiddleware')

connectDB()

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/tareas', require('./routes/tareasRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port,() => console.log(`Servidor Iniciado en el puerto ${port}`));

