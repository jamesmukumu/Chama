import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookie from "js-cookie"
import { useNavigate } from "react-router-dom";
function Firstname() {
  let navigate = useNavigate()
  const [Firstname, setFirstname] = useState("");
  const [memberinfo, setMemberinfo] = useState([]);
  const [error, setError] = useState("");
  const [downloadData, setDownloadData] = useState(null);
  const token = Cookie.get("Access cookie")
  async function Getfirstname(e) {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/firstname", {
        params: { firstname: Firstname },
        headers:{Authorization:token}
      });

      if (response.data.message === "found by firstname") {
        setMemberinfo(response.data.data);
        setDownloadData(response.data.data);
      }
      else if(response.data.message=== "token expired"){
          
        navigate('/')
        }
        
      if (response.data.error === "error") {
        setError("Member Not Found");
      }
    } catch (error) {
      setError("Internal Server Error");
    }
  }

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
      <form onSubmit={Getfirstname}>
        <h1>Find By Firstname</h1>
        <div>
          <label>Enter Member Firstname</label>
          <input
            type="text"
            required
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>

        {memberinfo.map((item) => (
          <div>
            <p>
              Firstname:<span>{item.firstname}</span>
            </p>
            <p>
              Secondname:<span>{item.secondname}</span>
            </p>
            <p>
              month:<span>{item.month}</span>
            </p>
            <p>
              year:<span>{item.year}</span>
            </p>
            <p>
              Mpesamessage:<span>{item.mpesamessage[0]}</span>
            </p>
          </div>
        ))}

        <button>Search</button>
        <h1 className="error">{error}</h1>
        <Link to="/">
          <strong>home</strong>
        </Link>
      </form>

      <button onClick={downloadJSON}>Download</button>
    </div>
  );
}
export default Firstname;
