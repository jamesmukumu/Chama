import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Preloader from "../preloader";
function Allmembers() {
  const [allmembers, setAllmembers] = useState([]);
  const [error, setErrormessage] = useState("");
  const [downloadData, setDownloaddata] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function Getmember() {
      try {
        const response = await axios.get("http://localhost:5000/allmembers");
        if (response.data.message === "found") {
          setAllmembers(response.data.data);
          setDownloaddata(response.data.data);
          setLoading(false);
          setIs;
        } else {
          setErrormessage("Error in finding all contributions");
        }
      } catch (error) {
        setErrormessage("Internal Server Error");
      }
    }

    Getmember();
  }, []);

  function downloadJSON() {
    if (downloadData) {
      const jsonData = JSON.stringify(downloadData, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "month_data.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

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
      <button onClick={downloadJSON}>Download</button>
    </div>
  );
}

export default Allmembers;
