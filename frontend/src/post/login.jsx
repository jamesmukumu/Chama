import React from "react";
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../authorization";
import Preloader from "../preloader";
function Login(){
let navigate = useNavigate()
const [Password,setPassword] = useState('')
const [loading,setLoading] = useState(false)
const [username,setUsername] = useState('')
const [errormsg,setErrormsg] = useState('')
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
        setLoading(true)
       setTimeout(()=>{
        navigate('/nav')
       },3000)
        setIsAuthenticated(true)
        }
          else if(response.data.error==='Username not Found'){
           setTimeout(()=>{
            navigate('/')
           },3000)
            setLoading(true)
         setErrormsg('Invalid Username')
        }
      if(response.data.error==='Invalid password'){
     setErrormsg('Wrong Password...')
     setTimeout(()=>{
        navigate('/')
     },3000)
      }
      
      } catch (error) {
          setErrormsg('Internal Server Error')
      }
      

}

}


return(
<div className="cont">
<div className="welcome">
<strong className="verse" style={{fontFamily:" 'Sono', monospace"}}>Matthew:23:11</strong>
</div>
<div className="welcome">
<strong className="text" style={{fontFamily:"'Buda', serif"}}>"But the greatest among you shall be your servant"</strong>
</div>




{loading?(
    <Preloader/>):(
<form onSubmit={Postlogin}>
    <strong>Login</strong>
<div>
    
    <input type="text"
    required
    placeholder="Enter Your Username"
    onChange={(e)=>setUsername(e.target.value)}
    
    />
</div>



<div>
    
    <input type="password"
    placeholder="Enter Your Password"
    required
    onChange={(e)=>setPassword(e.target.value)}
    
    />
</div>
<button>Login</button>
<p className="error">{errormsg}</p>
<p className="error">{passwordlength}</p>


<strong><Link to='/register'>Register</Link></strong>

</form>



    )
}










</div>



)

}

export default Login