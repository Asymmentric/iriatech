const mongoose=require('mongoose')

const dbLink='mongodb://localhost:27017' || process.env.DbLink

const connection=mongoose.connect(dbLink,{
    autoIndex:true,
    dbName:'iriatech'||process.env.DbName
})
connection.then(()=>{
    console.log(`DB Connected`)
})
connection.catch((err)=>{
    console.log(err)
})

module.exports=connection