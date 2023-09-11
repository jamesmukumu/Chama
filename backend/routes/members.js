const express = require('express')

const Member = require('../schemas/members')

const router = express.Router()



//posting a member
router.post('/member',async(req,res)=>{
try {
    
    const member = new Member({
    firstname:req.body.firstname,
    secondname:req.body.secondname,
     month:req.body.month,
     year:req.body.year,
     amount:req.body.amount,
     mpesamessage:req.body.mpesamessage
    
    })

    await member.save()
 res.json({message:' Information Saved'})
    

} catch (error) {
    res.json({error:"Error in saving information"})
}

})


//geting all members
router.get('/allmembers',async(req,res)=>{

try {
    const allmembers = await Member.find()
     
    res.json({message:'found',data:allmembers})
} catch (error) {
    res.json({error:'Error in finding all patients'})
}


})


//get member by firstname
router.get('/firstname',async(req,res)=>{
try {
    const desiredfirstname = req.query.firstname
    const Foundmember = await Member.find({firstname:desiredfirstname})
  


    if(Foundmember.length===0){
        res.json({error:'error'})
    }
    else{
        res.json({message:'found by firstname',data:Foundmember})
    }
} catch (error) {
    res.json({message:'Internal Error'})
}



})


//get by secondname
router.get('/secondname',async(req,res)=>{
    try {
        const desiredsecondname = req.query.secondname
        const Foundmember = await Member.find({secondname:desiredsecondname})
        
    
    
        if(Foundmember.length===0){
            res.json({error:'error'})
        }
        else{
            res.json({message:'found by secondname',data:Foundmember})
        }
    } catch (error) {
        res.json({message:'Internal Error'})
    }
    
    
    
    })
    


 

//finding sum for a specific month

router.get('/sumforspecificmonth',async(req,res)=>{

try {
    const desiredmonth = req.query.month
const aggregatemonth = [
{
    $match:{month:desiredmonth}
},
{
    $group:{
        _id:`$month`,
        totalamount:{$sum:`$amount`}

    }
}
]

const results = await Member.aggregate(aggregatemonth)
if(!results){
    res.json({error:'month not found'})
}
else{
    res.json({message:'month found',data:results})
}

} catch (error) {
    res.json({error:'error'})
}




})

    //get month
    router.get('/monthget', async (req, res) => {
        try {
          const desiredmonth = req.query.month;
          const foundmonth = await Member.find({ month: desiredmonth });
      
          if (foundmonth.length === 0) { 
            res.json({ error: 'Month not found' });
          } else {
            res.json({ message: 'Found month', data: foundmonth });
          }
        } catch (error) {
          res.json({ error: 'Internal Server Error' });
        }
      });
      
      

//find and delete
router.delete('/delete',async(req,res)=>{
try {
const deleteMember = req.query.secondname 
const Foundmember  = await Member.findOneAndDelete({secondname:deleteMember})  
if(!Foundmember){
res.json({message:'Member Not found'})
}
if(Foundmember){
res.json({message:'Deleted',data:Foundmember})

}





} catch (error) {
   res.json({error:'Error'}) 
}

})



    

    

    









//sum for all months
router.get('/sumforallmonths', async (req, res) => {
    try {
      const aggregateAllMonths = [
        {
          $group: {  
            _id: "$month",
            totalamount: { $sum: "$amount" }
          }
        }
      ];
  
      const results = await Member.aggregate(aggregateAllMonths);
      res.json({message:'sum months',data:results});
    } catch (error) {
      res.json({ error: 'error' });
    }
  });
  


//patch details 

router.patch('/updatemember',async(req,res)=>{
    const queryfirstname = req.query.firstname
    try {
        
    const patchDetails = await Member.findOneAndUpdate(
        {firstname:queryfirstname},
        {$set:req.body},
        {new:true}
        
         )
    if(!patchDetails){
    res.json({message:'Could not Find member'})
    }
    
    else{
        res.json({message:'details patched',data:patchDetails})
    }
    
    } catch (error) { 
      res.json({error:'Error'})  
    }
    
    
    
    
    
    })
    
//sum for a specific year

router.get('/specificyear',async(req,res)=>{

    try {
        const desiredyear =  parseInt (req.query.year)
    const aggregateyear = [
    {
        $match:{year:desiredyear}
    },
    {
        $group:{
            _id:`$year`,
            totalamount:{$sum:`$amount`}
    
        }
    }
    ]
    
    const results = await Member.aggregate(aggregateyear)
    res.json({message:'year found',data:results})
    
    } catch (error) {
        res.json({error:'error'})
    }
    
    
    
    
    })








module.exports = router