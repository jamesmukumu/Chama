const mongoose = require('mongoose')



const membersSchema = new mongoose.Schema({
firstname:{type:String,required:true,unique:true},
secondname:{type:String,required:true,unique:true},
month:{type:String,required:true},
year:{type:Number,required:true},
amount:{type:Number,required:true},
mpesamessage:{type:[String,Number],required:true,unique:true}

})

const Member = mongoose.model('Member',membersSchema)
module.exports = Member