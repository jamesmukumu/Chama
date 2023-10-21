const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config()

function validateTokenonlogin(req, res, next) {
  try {
      const token = req.headers['authorization'];

     if(!token){
    return res.status(400).json({message:"No token found"})
     }

      

      const validToken = jwt.verify(token, process.env.jwtPassword);

      if (!validToken) {
          return res.status(402).json({ error: 'Invalid token' });
      } else {
          return next();
      }
  } catch (error) {
      if(error.name==='TokenExpiredError'){
        return res.json({message:"token expired"})
      }
  }
}

module.exports = { validateTokenonlogin };
