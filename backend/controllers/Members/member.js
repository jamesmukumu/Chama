const Member = require('../../schemas/members')



//post member
async function Postmember(req,res){
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
    
    }


//get members all
async function Fetchallmembers(req,res){

    try {
        const allmembers = await Member.find()
         
        res.json({message:'found',data:allmembers})
    } catch (error) {
        res.json({error:'Error in finding all patients'})
    }
    
    
    }


//get Firstname
async function getbyFirstname(req,res){
    try {
        const desiredfirstname = req.query.firstname
        const Foundmember = await Member.find({firstname:{$regex:new RegExp(desiredfirstname,'i')}})
      
    
    
        if(Foundmember.length===0){
            res.json({error:'error'})
        }
        else{
            res.json({message:'found by firstname',data:Foundmember})
        }
    } catch (error) {
        res.json({message:'Internal Error'})
    }
    
    } 


//get by secondname
async function getbySecondname(req,res){
    try {
        const desiredsecondname = req.query.secondname
        const Foundmember = await Member.find({secondname:{$regex:new RegExp(desiredsecondname,'i')}})
        
    
    
        if(Foundmember.length===0){
            res.json({error:'error'})
        }
        else{
            res.json({message:'found by secondname',data:Foundmember})
        }
    } catch (error) {
        res.json({message:'Internal Error'})
    }
    
    }



//getMonthContribution
async function getMonthly(req, res){
    try {
      const desiredmonth = req.query.month;
      const foundmonth = await Member.find({ month:{$regex:new RegExp(desiredmonth,'i')}});
  
      if (foundmonth.length === 0) { 
        res.json({ error: 'Month not found' });
      } else {
        res.json({ message: 'Found month', data: foundmonth });
      }
    } catch (error) {
      res.json({ error: 'Internal Server Error' });
    }
  }


  //delete member
  async function Deletemember(req,res){
    try {
    const deleteMember = req.query.secondname 
    const Foundmember  = await Member.findOneAndDelete({secondname:{$regex: new RegExp(deleteMember,'i')}})  
    if(!Foundmember){
    res.json({message:'Member Not found'})
    }
    if(Foundmember){
    res.json({message:'Deleted',data:Foundmember})
    
    }
    } catch (error) {
       res.json({error:'Error'}) 
    }
    
    }


    //sum all months
    async function sumallMonths(req, res){
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
      }



      //patch details
      async function Patchinfo(req,res){
        const queryfirstname = req.query.firstname
        try {
            
        const patchDetails = await Member.findOneAndUpdate(
            {firstname:{$regex:new RegExp(queryfirstname,'i')}},
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
        }


        //sum desired month
        async function sumYearly(req,res){

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
            }
            
            


            module.exports = {
        Postmember,
        Patchinfo,
        Deletemember,
        Fetchallmembers,
        getMonthly,
        getbyFirstname,
        getbySecondname,
        sumYearly,
        sumallMonths
}