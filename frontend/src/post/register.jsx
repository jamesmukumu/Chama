import React from "react";
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../authorization";


function Register(){
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
        const response = await axios.post('https://site-a1s8.onrender.com/register',{
        Username:username,
        password:Password,
        email:Email
        })
        
        if(response.data.message==='Saved'){
        setRegistermessage('Registered Successfully')
        navigate('/nav')
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
<form onSubmit={Postregister}>
    <strong>Register</strong>
    <div>
    <label>Enter Username</label>
<input type="text" 
onChange={(e)=>setUsername(e.target.value)}
required
/>
    </div>



    <div>
    <label>Enter Password</label>
<input type="text" 
onChange={(e)=>setPassword(e.target.value)}
required
/>
    </div>


    <div>
    <label>Enter Email</label>
<input type="email" 
onChange={(e)=>setEmail(e.target.value)}
required
/>
    </div>

<button>Register</button>

<p>{registermessage}</p>
<p>{passwordlength}</p>


<Link to='/'><strong>Already Have an account??</strong></Link>
</form>




</div>

)

}
export default Register