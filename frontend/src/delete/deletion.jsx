import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
function Deletemember() {
  const [deletemessage, setDeletemessage] = useState("");
  const [errormessage, setErrormessage] = useState("");

  const [Secondname, setSecondname] = useState("");
  const [memberdata, setMemberdata] = useState([]);
  async function Deletedmember(e) {
    e.preventDefault();
    try {
      const response = await axios.delete("http://localhost:5000/delete", {
        params: { secondname: Secondname },
      });

      if (response.data.message === "Member Not found") {
        setErrormessage("Member Does Not Exist.Check Spelling or spaces");
      }

      if (response.data.message === "Deleted") {
        setDeletemessage("Information Deleted Successfully");
        setMemberdata([response.data.data]);
      }
    } catch (error) {
      setErrormessage("Internal server Error");
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={Deletedmember}>
          <header>Search and Delete Member</header>
          <label>Enter Secondname:</label>
          <input
            type="text"
            onChange={(e) => setSecondname(e.target.value)}
            required
          />
          <div>
            <button>Search and Delete</button>
          </div>
        </form>
        {memberdata.map((item) => (
          <div>
            <p>
              Firstname:<span>{item.firstname}</span>
            </p>
            <p>
              Secondname:<span>{item.secondname}</span>
            </p>
            <p>
              Amount:<span>{item.amount}</span>
            </p>
            <p>
              Year:<span>{item.year}</span>
            </p>
            <p>
              mpesamessage:<span>{item.mpesamessage}</span>
            </p>
            <p>
              month:<span>{item.month}</span>
            </p>
          </div>
        ))}

        <p className="error">{errormessage}</p>
        <p className="error">{deletemessage}</p>
        <Link to="/nav">
          <strong>Home</strong>
        </Link>
      </div>
    </div>
  );
}
export default Deletemember;
