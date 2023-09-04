import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



function Firstname(){
const[Firstname,setFirstname] = useState('')
const [memberinfo,setMemberinfo] = useState([])
const  [error,setError] = useState('')
async function  Getfirstname(e){
e.preventDefault()
try {
const response = await axios.get('http://localhost:5000/firstname',{
params:{firstname:Firstname}
})

if(response.data.message==='found by firstname'){
setMemberinfo(response.data.data)
}
if(response.data.error==='error'){
setError('Member Not Found')
}


    
} catch (error) {
    setError('Internal Server Error')
}

}

return(
    <div>
   <form onSubmit={Getfirstname}>
    <h1>Find By Firstname</h1>
   <div>
    <label >Enter Member Firstname</label>
    <input type="text" 
    required
    onChange={(e)=>setFirstname(e.target.value)}
    
    />
   </div>

  

  {memberinfo.map((item)=>(
      <div>
      <p>Firstname:<span>{item.firstname}</span></p>
      <p>Secondname:<span>{item.secondname}</span></p>
      <p>month:<span>{item.month}</span></p>
      <p>year:<span>{item.year}</span></p>
      <p>Mpesamessage:<span>{item.mpesamessage[0]}</span></p>
      </div>





  ))}



<button>Search</button>
<h1 className="error">{error}</h1>
<Link to='/'><strong>home</strong></Link>
   </form>







   
    </div>
)







}
export default Firstname