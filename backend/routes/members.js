const express = require('express')
const router = express.Router()
const {Postmember,Patchinfo,Deletemember,Fetchallmembers,getMonthly,getbyFirstname,sumallMonths,getbySecondname,sumYearly, countmembersMonthly} = require('../controllers/Members/member')
const {validateTokenonlogin} = require('../auth/jwt')


//posting a member
router.post('/member',Postmember )


//count members who contributed monthly
router.get('/countmembers',validateTokenonlogin,countmembersMonthly)


 
//geting all members
router.get('/allmembers',validateTokenonlogin,Fetchallmembers)


//get member by firstname
router.get('/firstname',validateTokenonlogin,getbyFirstname)


//get by secondname
router.get('/secondname',validateTokenonlogin,getbySecondname )
    
//get month
router.get('/monthget',validateTokenonlogin,getMonthly );
      
//find and delete
router.delete('/delete',validateTokenonlogin,Deletemember )

//sum for all months
router.get('/sumforallmonths',validateTokenonlogin, sumallMonths )
  


//patch details 

router.patch('/updatemember',validateTokenonlogin, Patchinfo)
    
//sum for a specific year

router.get('/specificyear',validateTokenonlogin,sumYearly)

module.exports = router