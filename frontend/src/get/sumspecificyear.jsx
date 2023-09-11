import React from "react";
import { useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
function Sumspecificyear(){
const [Year,setYear] = useState('')
const [error,setError] = useState('')
const  [memberdata,setMemberdata] = useState([])
const   [downloadData,setDownloadData] = useState(null)
function Selectyear(e){
setYear(e.target.value)

}


async function Getsumforyear(e){
e.preventDefault()
try {
    const response = await axios.get('https://site-a1s8.onrender.com/specificyear',{
  params:{year:Year}

    })
if(response.data.message==='year found'){
setMemberdata(response.data.data)
setDownloadData(response.data.data)
}
if(response.data.message=='month not found'){

setError('No total amount')

}


} catch (error) {
    setError('Internal Server Error')
}

}


function downloadJSON() {
  if (downloadData) {
    const jsonData = JSON.stringify(downloadData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "year.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}









return(
<div className="container">
<form onSubmit={Getsumforyear}>
<h1>Get Sum For a Specific Year</h1>

<div>
<label>Choose Year</label>
<select onChange={Selectyear}>
<option value="2021">2021</option>
<option value="2022">2022</option>
<option value="2023">2023</option>
<option value="2024">2024</option>
<option value="2025">2025</option>
<option value="2026">2026</option>
<option value="2027">2027</option>
<option value="2028">2028</option>
<option value="2029">2029</option>
<option value="2030">2030</option>

</select>



</div>



{memberdata.map((item)=>(
<div className="results">
<p>year:<span>{item._id}</span></p>
<p>totalamount:<span>{item.totalamount}</span></p>


</div>
))}




<p>{error}</p>
<button>Find sum</button>
<Link to='/'><strong>Home</strong></Link>
</form>










<button onClick={downloadJSON}>Download</button>

</div>










)



}
export default Sumspecificyear