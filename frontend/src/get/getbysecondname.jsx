import React from "react";
import { useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";


function Secondname(){
const[Secondname,setSecondname] = useState('')
const [memberinfo,setMemberinfo] = useState([])
const  [error,setError] = useState('')
async function  GetSecondname(e){
e.preventDefault()
try {
const response = await axios.get('http://localhost:5000/secondname',{
params:{secondname:Secondname}
})

if(response.data.message==='found by secondname'){
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
   <form onSubmit={GetSecondname}>
    <h1>Find By Secondname</h1>
   <div>
    <label >Enter Member Secondname</label>
    <input type="text" 
    required
    onChange={(e)=>setSecondname(e.target.value)}
    
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
<Link to='/'><strong>Home</strong></Link>
   </form>







   
    </div>
)







}
export default Secondname