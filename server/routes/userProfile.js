const router=require('../server').app
const users=require('../db/userFunc')
const { validateRegistration } = require('./func/util')
const {generateToken, verifyToken}=require('./func/auth')

router.post('/register',validateRegistration,(req,res)=>{
    console.log('eh')
    users.userExists(req.body.email)
    //name,age,gender,picture,email,password
    .then(()=>users.createUser(req.body.name,req.body.age,req.body.gender,req.body.picture,req.body.email, req.body.password))

    .then((val) =>res.status(200).send({ msg: val}),(err) => {console.log(err);res.status(400).send({ msg: err.msg })})
    
    .catch(()=>res.status(403).send({msg:'Email already registered'}))
})

router.post('/login',validateRegistration,(req,res)=>{
    users.loginCheck(req.body.email,req.body.password)

    .then(()=>generateToken(req.body.email))

    .then(token=>res.send({token}))

    .catch(err=>res.status(err.code).send({msg:err.msg}))
})

router.get('/allusers',(req,res)=>{
    users.allusers()
    .then(result=>res.status(result.code).send(result.msg))
    .catch(err=>res.status(err.code).send(err.msg))
})

router.put('/edit',verifyToken,(req,res)=>{
    console.log(req.user,req.id)
    const {name,age,gender}=req.body
    users.editProfile(req.user,name,age,gender)
    .then((result)=>res.status(result.code).send(result.msg))
    .catch((err)=>res.status(err.code).send(err.msg))
})
module.exports=router