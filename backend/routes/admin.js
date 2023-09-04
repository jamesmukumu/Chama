const express = require('express')
const bcrypt = require('bcrypt')
const Admin = require('../schemas/admin')

const router = express.Router()





const saltRounds = 10

//register
router.post('/register',async(req,res)=>{
const hashedpassword = await bcrypt.hash(req.body.password,saltRounds)
try {
    const admin = new Admin({
    Username:req.body.Username,
    password:hashedpassword,
    email: req.body.email
    
    })
    
await admin.save()
res.json({message:"Saved"})




} catch (error) {
    if(error.code===11000){
        res.json({error:'Email in existence'})
    }
  else{
    res.json({Error:"Error in Registering"})
  }


}


})

//login
router.post('/login',async(req,res)=>{
const inputUsername = req.body.Username
const inputPassword = req.body.password 

 
try {
    const foundUser = await Admin.findOne({Username:inputUsername})

    if(!foundUser){
   return res.json({error:'Username not Found'})
    }
    const foundpassword =  await bcrypt.compare(inputPassword,foundUser.password[0])

    if(!foundpassword){ 
     return res.json({error:'Invalid password'})
    }
else{
   return  res.json({message:'Successfully logged in'})
}



} catch (error) {
    res.json({error:'Internal Error'})
}



})




















module.exports = router