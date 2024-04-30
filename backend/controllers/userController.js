const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registrar = asyncHandler( async (req, res) => {
    //desestructurar el objeto
    const {name, email, password} = req.body
    //verificar que me pasen los datos
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Por favor, ingrese todos los datos')
    }
    //verificar que el usuario existe
    const userExiste = await User.findOne({email})
    if(userExiste) {
        res.status(400)
        throw new Error('El usuario ya existe')
    }
    //Hacemos el HASH
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    //crear el usuario
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })


    res.status(201).json(user)
})

const login = asyncHandler( async(req, res) => {
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id : user.id,
            name: user.name,
            email: user.email,
            token: generarToken(user.id)

        })
    }else{
        res.status(401)
        throw new Error("Credenciales Incorrectas")
    }
})

const generarToken = (idusuario) => {
    return jwt.sign({idusuario}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

const mostrar = asyncHandler( async (req, res) => {
    res.status(200).json(req.user)
})

module.exports = {
    registrar,
    login,
    mostrar
}