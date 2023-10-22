const bcrypt = require('bcrypt')
const Admin = require('../../schemas/admin')
const saltRounds = 10
const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')
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
   
    res.status(200).json({message:"Saved",token})
    } catch (error) {
    if(error.code===11000){
    res.status(400).json({error:'email in use'})
    } 
    else{
    
        res.status(500).json({error})
    }
    
    }
    }





    //login user
    async function Login(req, res) {
        const inputUsername = req.body.Username;
        const inputPassword = req.body.password;
    
        try {
            const foundUser = await Admin.findOne({ Username: inputUsername });
    
            if (!foundUser) {
                return res.status(200).json({ error: 'Username not Found' });
            }
    
            const foundpassword = await bcrypt.compare(inputPassword, foundUser.password[0]);
    
            if (!foundpassword) {
                return res.status(200).json({ error: 'Invalid password' });
            } else {
                const token = jwt.sign({ Username: foundUser.Username }, process.env.jwtPassword, { expiresIn: '1h' });
            
                res.setHeader('Authorization',token);
                res.status(200).json({ message: 'Successfully logged in', token });
            }
        } catch (error) {
            res.json({ error });
        }
    }
    




        module.exports = {
            Register,
            Login
        }