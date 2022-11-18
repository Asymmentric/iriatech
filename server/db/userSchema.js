const mongoose=require('mongoose')
const userProfile=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:Number,
    picture:String,
    gender:{
        type:String,
        default:'Prefer Not To Say'
    }

})
const userSchema=new mongoose.Schema({
    
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userprofile:[userProfile]
})

const users=new mongoose.model('users',userSchema)

module.exports=users

