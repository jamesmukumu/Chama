const bcrypt = require('bcrypt')
const Admin = require('../../schemas/admin')
const saltRounds = 10



//post register
async function Register(req,res){
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
    res.status(400).json({error:'email in use'})
    }
    else{
        res.status(500).json({error:"Internal error"})
    }
    
    }
    }





    //login user
    async function Login(req,res){
        const inputUsername = req.body.Username
        const inputPassword = req.body.password 
        
         
        try {
            const foundUser = await Admin.findOne({Username:inputUsername})
        
            if(!foundUser){
           return res.status(200).json({error:'Username not Found'})
            }
            const foundpassword =  await bcrypt.compare(inputPassword,foundUser.password[0])
        
            if(!foundpassword){ 
             return res.status(200).json({error:'Invalid password'})
            }
        else{
           return  res.json({message:'Successfully logged in'})
        }
        
        
        
        } catch (error) {
            res.json({error:'Internal Error'})
        }
        
        }





        module.exports = {
            Register,
            Login
        }