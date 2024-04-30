const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require ('../models/userModel')

const protect =asyncHandler( async (req,res,next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]

            //veridicar la forma del token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //obtner los datos del usuario del payload del token y lo vamos a poner en un objeto
            req.user = await User.findById(decoded.idusuario).select('-password')

            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    } 
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }

 })
module.exports = {
    protect
}