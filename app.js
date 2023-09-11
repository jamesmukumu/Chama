const express = require('express')
const app = express()
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config()

app.use(express.json())
app.use(cors())

const port = process.env.PORT



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