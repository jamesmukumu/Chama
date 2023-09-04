const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connectionString = process.env.connection


const mongoconnection = mongoose.connect(connectionString,{
    
    useUnifiedTopology:true,
    useNewUrlParser:true
    
}
    )


    .then(()=>{

  console.log('Connected to DB Successfully')

    })

    .catch(()=>{

        console.log('Error in Connecting to DB')
    })


    module.exports = mongoconnection