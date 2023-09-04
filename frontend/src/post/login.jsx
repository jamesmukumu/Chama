import React from "react";
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../authorization";

function Login(){
    let navigate = useNavigate()
const [Password,setPassword] = useState('')
const [username,setUsername] = useState('')
const [loginmessage,setLoginmessage] = useState('')
const [passwordlength,setPasswordlenght] = useState('')
const { setIsAuthenticated } = useAuth();
async function Postlogin(e){
e.preventDefault()

if(Password.length <=5){
    setPasswordlenght('Password Must be at least 5 Charachters')
}
else{
    try {
        const response = await axios.post('http://localhost:5000/login',{
          Username:username,
          password:Password
        })
      
        if(response.data.message==='Successfully logged in'){
        setLoginmessage('Login Successful')
        navigate('/nav')
        setIsAuthenticated(true)
        }
          

        if(response.data.error==='Username not Found'){
         setLoginmessage('Invalid Username')
        }
      if(response.data.error==='Invalid password'){
     setLoginmessage('Wrong Password...')
      }
      
      } catch (error) {
          setLoginmessage('Internal Server Error')
      }
      

}

}


return(
<div>
<form onSubmit={Postlogin}>
    <strong>Login</strong>
<div>
    <label>Enter Username</label>
    <input type="text"
    required
    onChange={(e)=>setUsername(e.target.value)}
    
    />
</div>



<div>
    <label>Enter password</label>
    <input type="text"
    required
    onChange={(e)=>setPassword(e.target.value)}
    
    />
</div>
<button>Login</button>
<p>{loginmessage}</p>
<p>{passwordlength}</p>


<Link to='/register'><strong>Register</strong></Link>

</form>





</div>



)

}

export default Login