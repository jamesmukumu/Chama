import React from "react";
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../authorization";
import Preloader from "../preloader";

function Register(){
    const [loading,setLoading] = useState(false)
    let navigate = useNavigate()
const [username,setUsername] = useState('')
const  [Email,setEmail]   = useState('')
const [Password,setPassword] = useState('')
const [registermessage,setRegistermessage] = useState('')
const [passwordlength,setPasswordlength] = useState('')
const { setIsAuthenticated } = useAuth();

async function Postregister(e){
e.preventDefault()
if(Password.length <= 5){
setPasswordlength('Password Must Be at least 5 charachters long')
}
else{
    try {
        const response = await axios.post('http://localhost:5000/register',{
        Username:username,
        password:Password,
        email:Email
        })
        
        if(response.data.message==='Saved'){
        setRegistermessage('Registered Successfully')
        setLoading(true)
       setTimeout(()=>{
        navigate('/nav')
       },3200)
        setIsAuthenticated(true)
        }
        else{
            setRegistermessage('Failed To register')
        }
        
    } catch (error) {
        setRegistermessage('Internal Server')
    }

}

}

return(
<div>
<div className="welcome">
<strong className="verse" style={{fontFamily:" 'Sono', monospace"}}>Matthew:23:11</strong>
</div>
<div className="welcome">
<strong className="text" style={{fontFamily:"'Buda', serif"}}>"But the greatest among you shall be your servant"</strong>
</div>



{loading?(
    <Preloader/>):(
<form onSubmit={Postregister}>
    <strong>Register</strong>
    <div>
    
<input type="text"
placeholder="Enter Username" 
onChange={(e)=>setUsername(e.target.value)}
required
/>
    </div>



    <div>
<input type="password" 
placeholder="Enter Your Password"
onChange={(e)=>setPassword(e.target.value)}
required
/>
    </div>


    <div>
  
<input type="email" 
placeholder="Enter Your Email"
onChange={(e)=>setEmail(e.target.value)}
required
/>
    </div>

<button>Register</button>

<p>{registermessage}</p>
<p>{passwordlength}</p>

<strong><Link to='/' className="linkto">Already have an account??</Link></strong>
</form>
    )
}








</div>

)

}
export default Register