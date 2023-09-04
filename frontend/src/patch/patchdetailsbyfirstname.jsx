import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Updatedetails() {
  const [Firstname, setFirstname] = useState("");
  const [memberinfo, setMemberinfo] = useState(null); 
  const [updatemessage, setUpdatemessage] = useState("");
  const [Amount, setAmount] = useState("");
  const [successmessage, setSuccessMessage] = useState("");
  const  [Month,setMonth] = useState('')
  const  [Mpesamessage,setMpesamessage] = useState('')
  
  async function Patchdetails(e) {
    e.preventDefault();

    try {
      const response = await axios.patch(
        'http://localhost:5000/updatemember',
        { amount: Amount,
          month:Month,
          mpesamessage:Mpesamessage
        
        },
        { params: { firstname: Firstname } }
      );

      if (response.data.message === 'details patched') {
        setMemberinfo(response.data.data);
        setUpdatemessage('Member found');
        setSuccessMessage('Details updated');
      }

      if (response.data.message === 'Could not Find member') {
        setUpdatemessage('Member does not exist');
        setMemberinfo(null); 
      }
    } catch (error) {
      setUpdatemessage('Internal Server Error');
      setMemberinfo(null); 
    }
  }

  return (
    <div>
      <form onSubmit={Patchdetails}>
        <h1>Find Member By Firstname and Update details</h1>
        <div>
          <label>Enter Firstname:</label>
          <input
            type="text"
            required
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>

        {memberinfo && (
          <div>
            <p>Firstname: <span>{memberinfo.firstname}</span></p>
            <p>Secondname: <span>{memberinfo.secondname}</span></p>
            <p>Amount: <span>{memberinfo.amount}</span></p>
            <p>month: <span>{memberinfo.month}</span></p>
            <p>Year: <span>{memberinfo.year}</span></p>
            <p>mpesamessage: <span>{memberinfo.mpesamessage[0]}</span></p>
          </div>
        )}

        <button>Search</button>
        <p>{updatemessage}</p>
      </form>

      <form onSubmit={Patchdetails}>
        <h1>Update amount</h1>
        <div>
          <input
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button>Update</button>
        <p>{successmessage}</p>
        <Link to='/'><strong>Home</strong></Link>
      </form>








      <form onSubmit={Patchdetails}>
        <h1>Update Month</h1>
        <div>
          <textarea
            type="text"
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>

        <button>Update</button>
        <p>{successmessage}</p>
      </form>








      <form onSubmit={Patchdetails}>
        <h1>Update Mpesamessage</h1>
        <div>
          <textarea
            type="text"
            onChange={(e) => setMpesamessage(e.target.value)}
          />
        </div>

        <button>Update</button>
        <p>{successmessage}</p>
      </form>



    </div>
  );
}

export default Updatedetails;
