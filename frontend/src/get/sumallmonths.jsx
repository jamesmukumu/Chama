import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../index.css";
function Sumamount() {
  let navigate = useNavigate();
  const [Month, setMonth] = useState([]);
  const [error, setError] = useState("");
  const [summembers, setSummembers] = useState([]);
  const [nullmsg, setNullmsg] = useState("");
  const [querymonth, setQuerymonth] = useState("");
  const token = Cookie.get("Access cookie");
  useEffect(() => {
    async function Getmembers() {
      try {
        const response = await axios.get(
          "http://localhost:5000/sumforallmonths",
          {
            headers: { Authorization: token },
          }
        );
        if (response.data.message === "sum months") {
          setMonth(response.data.data);
        } else if (response.data.message === "token expired") {
          navigate("/");
        } else if (response.data.message === "No token found") {
          navigate("/");
        } else if (response.data.error === "Invalid token") {
          navigate("/");
        } else {
          setError("Error in Fetching information");
        }
      } catch (error) {
        setError("Internal server Error");
      }
    }

    Getmembers();
  }, []);

  //count members
  async function countMembers() {
    try {
      const response = await axios.get("http://localhost:5000/countmembers", {
        params: { month: querymonth },
        headers: { Authorization: token },
      });
      if (response.data.message === "Sum all members") {
        setSummembers(response.data.data);
      } else if (response.data.message === "No members counted") {
        setNullmsg("No member found");
      } else if (response.data.message === "token expired") {
        navigate("/");
      } else if (response.data.message === "No token found") {
        navigate("/");
      } else if (response.data.error === "Invalid token") {
        navigate("/");
      }
    } catch (error) {
      setNullmsg("Internal server error");
    }
  }

  return (
    <div className="container">
      <h2>Total Contribution Monthly</h2>
      {Month.map((item) => (
        <div className="item" key={item._id}>
          <p className="month">Month: {item._id}</p>
          <p>
            Total Amount:{" "}
            <span className="total-amount">{item.totalamount}</span>
          </p>
        </div>
      ))}
      <div className="count">
        <div>
          <strong>Count Members Who Contributed To a specific month</strong>
        </div>
        <input
          type="text"
          onChange={(e) => setQuerymonth(e.target.value)}
          placeholder="Enter month eg October,November"
        />

        <button onClick={countMembers}>find number</button>

        {summembers.map((item) => (
          <div className="member-info">
            <p>
              Month:<span>{item._id}</span>
            </p>
            <p>
              No of members who contributed:<span>{item.month}</span>
            </p>
          </div>
        ))}
      </div>
      <p>{nullmsg}</p>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Sumamount;
