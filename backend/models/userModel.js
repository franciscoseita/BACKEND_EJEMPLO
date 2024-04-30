const mongoose = require('mongoose')

const userSchema= mongoose.Schema({
    name:{
        type:String,
        require: [true,"Porfavor teclea tu nombre"]
    },
    email:{
        type:String,
        require: [true,"Porfavor teclea tu email"],
        unique: true
    },
    password:{
        type:String,
        require: [true,"Porfavor teclea tu contraseña"]
    },
    esAdmin:{
        type:Boolean,
        default: false
    }

},{
    timestamps:true
}
)

module.exports=mongoose.model('User',userSchema)