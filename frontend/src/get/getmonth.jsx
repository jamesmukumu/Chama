import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Getmonth() {
  const [Month, setMonth] = useState('');
  const [info, setInfo] = useState([]);

  function Selectmonth(e) {
    setMonth(e.target.value); 
  }

  async function Getmonthbckend(e) {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/monthget', {
        params: { month: Month }
      });

      if (response.data.message === 'Found month') {
        setInfo(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={Getmonthbckend}>
        <div>
          <label>Choose month To view all contributions</label>
          <select value={Month} onChange={Selectmonth}>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>

        {info.map((item) => (
          <div key={item._id}>
            <p>id:<span>{item._id}</span></p>
            <p>firstname:<span>{item.firstname}</span></p>
            <p>secondname:<span>{item.secondname}</span></p>
            <p>month:<span>{item.month}</span></p>
            <p>year:<span>{item.year}</span></p>
            <p>amount:<span>{item.amount}</span></p>
            <p>mpesamessage:<span>{item.mpesamessage[0]}</span></p>
          </div>
        ))}

        <button>Get info</button>
        <Link to='/'><strong>Home</strong></Link>
      </form>
    </div>
  );
}

export default Getmonth;
