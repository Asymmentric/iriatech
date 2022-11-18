const cryptPwd = require('../routes/func/util')
const users=require('./userSchema')


async function createUser(name,age,gender,picture,email,password) {
    const finalPassword = await cryptPwd.encryptPwd(password)
    return new Promise((resolve, reject) => {
        const user = new users({
            email: email.toLowerCase(),
            password: finalPassword,
            userprofile:[
                {name,age,gender,picture}
            ]
        })
        user.save()
            .then((msg) => {
                console.log(msg)
                resolve(`Added user with email ${name}`)
            })
            .catch((err) => {
                console.log(err)
                reject(`Couldn't Register. Try again`)
            })
    })
}

async function userExists(email) {
    let user=await users.find({email:email})
    console.log('- - dfdf- -  -\n', users[0].userprofile)
    return new Promise((resolve, reject) => {
        if(user.length===0) resolve(true) 
        else reject({msg:'User Exists',id:user[0]._id,email:user[0].email})
    })
}

const loginCheck=async (email,password)=>{
    const user=await users.find({email})
        return new Promise(async (resolve, reject) => {
            if(user.length!==0){
                console.log(user)
                cryptPwd.decryptPwd(password,user[0].password).then(res=>{
                    console.log(res)
                    if(res) {
                        console.log("pass correct")
                        resolve(true)
                    }
                    else{
                        console.log("nopes")
                        reject({code:401,msg:'Incorrect Password'})
                    }
                })
            }else reject({code:400,msg:'Email not Registered. Please Register'})  
        })
    
}

const allusers= ()=>{
     
    return new Promise((resolve, reject) => {
        users.find({},{email:1,'userprofile.name':1,_id:0})
    .then(result=>resolve({code:200,msg:result}))
    .catch(err=>{
        console.log(err)
        return reject({code:500,msg:'Unable to fetch'})
    })
    })
    
}

const editProfile=(userEmail,name,age,gender)=>{
    return new Promise((resolve, reject) => {
        users.findOneAndUpdate({email:userEmail},{
            $set:{
                'userprofile.$.name':'billu'
                // 'userprofile.age':age,
                // 'userprofile.gender':gender
            }
            
        })
        .then((result)=>{
            console.log(result)
            return resolve({code:200,msg:'Updated Profile'})
        })
        .catch((err)=>{
            console.log(err)
            return reject({code:400,msg:`Couldn't Update`})
        })
    })
}
module.exports={
    createUser, userExists, loginCheck, allusers, editProfile
}