const Image = require('../schemas/images')
const express = require('express')

const router = express.Router()


router.post('/images',async(req,res)=>{
try {
const image = new Image({
imageUrl:req.body.imageUrl,
imageTitle:req.body.imageTitle
})
 await image.save()
 res.json({message:'Image Saved Successfully'})



} catch (error) {
    res.json({error:'not saved'})
}

})





//get
router.get('/getimages',async(req,res)=>{
try {
    const foundimages = await Image.find()
  res.json({message:'Found images',data:foundimages})

} catch (error) {
    res.json({error:'Error in finding images'})
}







})



















module.exports = router