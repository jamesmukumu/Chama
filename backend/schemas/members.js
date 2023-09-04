const mongoose = require('mongoose')



const membersSchema = new mongoose.Schema({
firstname:{type:String,required:true},
secondname:{type:String,required:true},
month:{type:String,required:true},
year:{type:Number,required:true},
amount:{type:Number,required:true},
mpesamessage:{type:[String,Number],required:true}

})

const Member = mongoose.model('Member',membersSchema)
module.exports = Member