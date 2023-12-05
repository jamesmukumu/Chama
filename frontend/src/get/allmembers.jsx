import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Preloader from "../preloader";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

function Allmembers() {
  let navigate = useNavigate();
  const [allmembers, setAllmembers] = useState([]);
  const [error, setErrormessage] = useState("");
  const [loading, setLoading] = useState(true);
  const token = Cookie.get("Access cookie");

  useEffect(() => {
    async function Getmember() {
      try {
        const response = await axios.get("http://localhost:5000/allmembers", {
          headers: {
            Authorization: token,
          },
        });

        if (response.data.message === "found") {
          setAllmembers(response.data.data);
          setLoading(false);
        } else if (response.data.message === "token expired") {
          navigate("/");
        } else if (response.data.message === "No token found") {
          navigate("/");
        } else if (response.data.error === "Invalid token") {
          navigate("/");
        } else {
          setErrormessage("Error in finding all contributions");
        }
      } catch (error) {
        console.log(error);
        setErrormessage("Internal Server Error");
      }
    }

    Getmember();
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Secondname</th>
            <th>Amount</th>
            <th>Month</th>
            <th>Year</th>
            <th>Mpesa Message</th>
          </tr>
        </thead>

        {loading ? (
          <Preloader />
        ) : (
          <tbody>
            {allmembers.map((item) => (
              <tr>
                <td>{item.firstname}</td>
                <td>{item.secondname}</td>
                <td>{item.amount}</td>
                <td>{item.month}</td>
                <td>{item.year}</td>
                <td>{item.mpesamessage[0]}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <p>{error}</p>
      <Link to="/nav">
        <strong>Home</strong>
      </Link>
    </div>
  );
}

export default Allmembers;
