const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
Username:{type:[String,Number],required:true},
password:{type:[String,Number],required:true},
email:{type:[String,Number],required:true,unique:true}
})

const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin