import React from "react";
import { useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
function Sumspecificmonth(){
const [Month,setMonth] = useState('')
const [error,setError] = useState('')
const  [memberdata,setMemberdata] = useState([])
function Selectmonth(e){
setMonth(e.target.value)

}


async function Getsumformonth(e){
e.preventDefault()
try {
    const response = await axios.get('http://localhost:5000/sumforspecificmonth',{
  params:{month:Month}

    })
if(response.data.message==='month found'){
setMemberdata(response.data.data)
}
if(response.data.message=='month not found'){

setError('No total amount')

}


} catch (error) {
    setError('Internal Server Error')
}

}

return(
<div className="container">
<form onSubmit={Getsumformonth}>
<h1>Get Sum For a Specific Month</h1>

<div>
<label>Choose month</label>
<select onChange={Selectmonth}>
<option value="January">January</option>
<option value="Februry">February</option>
<option value="March">March</option>
<option value="April">April</option>
<option value="May">May</option>
<option value="June">June</option>
<option value="July">July</option>
<option value="August">August</option>
<option value="Septemeber">September</option>
<option value="October">October</option>
<option value="November">November</option>
<option value="December">December</option>

</select>



</div>



{memberdata.map((item)=>(
<div className="results">
<p>month:<span>{item._id}</span></p>
<p>totalamount:<span>{item.totalamount}</span></p>


</div>
))}




<p>{error}</p>
<button>Find sum</button>
<Link to='/'><strong>Home</strong></Link>
</form>












</div>










)



}
export default Sumspecificmonth