const express = require('express')
const crypto = require('crypto')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
const port = process.env.PORT

// generate passwordfor jwt
const password = crypto.randomBytes(64).toString('hex')



try {
  app.use(require('./backend/db/db'))  
} catch (error) {
    error
}


try {
  app.use(require('./backend/routes/admin'))
  
} catch (error) {
  
}






try {
  app.use(require('./backend/routes/members'))
} catch (error) {
  error
}


try {
  app.use(require('./backend/routes/images'))
} catch (error) {
  error
}







app.listen(`${port}`,()=>{



    console.log(`app listening at ${port}` )
})