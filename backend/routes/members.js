const express = require('express')
const router = express.Router()
const {Postmember,Patchinfo,Deletemember,Fetchallmembers,getMonthly,getbyFirstname,sumallMonths,getbySecondname,sumYearly} = require('../controllers/Members/member')



//posting a member
router.post('/member',Postmember )


//geting all members
router.get('/allmembers',Fetchallmembers)


//get member by firstname
router.get('/firstname',getbyFirstname)


//get by secondname
router.get('/secondname',getbySecondname )
    
//get month
router.get('/monthget',getMonthly );
      
//find and delete
router.delete('/delete',Deletemember )

//sum for all months
router.get('/sumforallmonths', sumallMonths )
  


//patch details 

router.patch('/updatemember', Patchinfo)
    
//sum for a specific year

router.get('/specificyear',sumYearly)

module.exports = router