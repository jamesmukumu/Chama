import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Preloader from "../preloader";

function Member() {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [Firstname, setFirstname] = useState("");
  const [Secondname, setSecondname] = useState("");
  const [Year, setYear] = useState("");
  const [Month, setMonth] = useState("");
  const [Mpesamessage, setMpesamessage] = useState("");
  const [Amount, setAmount] = useState("");
  const [successmessage, setSuccessmessage] = useState("");

  function Selecttagmonth(e) {
    setMonth(e.target.value);
  }

  function Selecttagyear(e) {
    setYear(e.target.value);
  }

  async function Postmember(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/member", {
        firstname: Firstname,
        secondname: Secondname,
        amount: Amount,
        year: Year,
        month: Month,
        mpesamessage: Mpesamessage,
      });

      if (response.data.message === " Information Saved") {
        setSuccessmessage("Information Successfully saved");
        setLoading(true);

        setTimeout(() => {
          navigate("/nav");
        }, 4000);
      } else {
        setSuccessmessage("Error try again...");
      }
    } catch (error) {
      setSuccessmessage("Internal Server Error");
    }
  }

  return (
    <div>
      {loading ? (
        <Preloader />
      ) : (
        <form onSubmit={Postmember}>
          <strong>Add Contribution</strong>
          <div>
            <label>Enter Firstname</label>
            <input
              type="text"
              autoCapitalize="on"
              required
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div>
            <label>Enter Secondname</label>
            <input
              type="text"
              required
              onChange={(e) => setSecondname(e.target.value)}
            />
          </div>

          <div>
            <label>Enter amount</label>
            <input
              type="number"
              required
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label>Enter mpesamessage</label>
            <textarea
              type="text"
              required
              onChange={(e) => setMpesamessage(e.target.value)}
            />
          </div>

          <div>
            <label>Select month</label>
            <select onChange={Selecttagmonth}>
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

          <div>
            <label>Select Month</label>
            <select onChange={Selecttagyear}>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <button>Submit</button>
          <p className="error">{successmessage}</p>
        </form>
      )}
    </div>
  );
}

export default Member;
