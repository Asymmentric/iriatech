const jwt=require('jsonwebtoken')
const users=require('../../db/userFunc')

const generateToken=async(email)=>{
    return new Promise((resolve, reject) => {
        jwt.sign({email},'abc'|| process.env.SecretKey,{
            algorithm:'HS384',
            expiresIn:'1h'
        },(err,token)=>{
            if(!err) resolve(token)
            else{
                console.log(err)
                reject('Unable to Login. Try Again')
            }
        })
    })
}

const verifyToken=(req,res,next)=>{
    if(req.headers.authorization){
        const token=req.headers.authorization.split(' ')[1]
        if(!token) return res.status(404).send({msg:'Authentication token missisng'})
        jwt.verify(token,'abc'||process.env.SecretKey,(err,result)=>{
            if(!err) {
                console.log('This is verifyToken ',result)
                users.userExists(result.email).catch((result)=>{
                    // console.log("this too in verify token->",result)
                    req.user=result.email
                    req.id=result.id
                    next()
                })

                }
            else return res.send(err)
        })
    }
    else return res.status(404).send({msg:'Authentication token missisng'})
    
}

module.exports={
    generateToken,
    verifyToken
}