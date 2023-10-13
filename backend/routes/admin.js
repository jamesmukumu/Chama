const express = require('express')
const {Register,Login} = require('../controllers/ADMIN/admin')

const router = express.Router()







//register
router.post('/register',Register )

//login
router.post('/login',Login)




















module.exports = router