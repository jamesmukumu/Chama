import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Sumamount() {
  const [Month, setMonth] = useState([]);
  const [error, setError] = useState("");
  const [downloadData, setDownloadData] = useState(null);
  useEffect(() => {
    async function Getmembers() {
      try {
        const response = await axios.get(
          "http://localhost:5000/sumforallmonths"
        );
        if (response.data.message === "sum months") {
          setMonth(response.data.data);
        } else {
          setError("Error in Fetching information");
        }
      } catch (error) {
        setError("Internal server Error");
      }
    }

    Getmembers();
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

      <Link to="/">Home</Link>
      <button onClick={downloadJSON}>Download</button>
    </div>
  );
}

export default Sumamount;
