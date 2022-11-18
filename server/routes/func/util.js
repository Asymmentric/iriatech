const bcrypt=require('bcrypt')
const saltRounds=10
let encryptPwd=(pwd)=>{
     return new Promise((resolve, reject) => {
            bcrypt.hash(pwd,saltRounds)
            .then((hash)=>{
                console.log('back',hash)
                resolve(hash)
            },(err)=>{
                console.log(err)
                reject(err)
            })
     })
    
}

let decryptPwd=(pwd,hash)=>{
    return bcrypt.compare(pwd,hash)
}

let validateRegistration=(req,res,next)=>{
    console.log(req.body)
    if(req.body.email){
        const emailOK=(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test((req.body.email).toLowerCase())
        if(emailOK && req.body.password) next()
        else return res.send({msg:'Invalid Email'})
    }else{
        return res.status(400).send({msg:'Missing email'})
    }
    
}
module.exports={
    encryptPwd,
    decryptPwd,
    validateRegistration
}