import React from "react";
import { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Secondname() {
  let navigate = useNavigate();
  const [Secondname, setSecondname] = useState("");
  const [memberinfo, setMemberinfo] = useState([]);
  const [error, setError] = useState("");
  const [downloaddata, setDownloaddata] = useState(null);
  const token = Cookie.get("Access cookie");
  async function GetSecondname(e) {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/secondname", {
        params: { secondname: Secondname },
        headers: { Authorization: token },
      });

      if (response.data.message === "found by secondname") {
        setMemberinfo(response.data.data);
        setDownloaddata(response.data.data);
      } else if (response.data.message === "token expired") {
        navigate("/");
      } else if (response.data.message === "No token found") {
        navigate("/");
      } else if (response.data.error === "Invalid token") {
        navigate("/");
      } else if (response.data.error === "error") {
        setError("Member Not Found");
      }
    } catch (error) {
      setError("Internal Server Error");
    }
  }

  function Downloadinfo() {
    if (downloaddata) {
      const jsonData = JSON.stringify(downloaddata, null, 2);
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
      <form onSubmit={GetSecondname}>
        <h1>Find By Secondname</h1>
        <div>
          <label>Enter Member Secondname</label>
          <input
            type="text"
            required
            onChange={(e) => setSecondname(e.target.value)}
          />
        </div>

        {memberinfo.map((item) => (
          <div className="member-info">
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
          <strong>Home</strong>
        </Link>
      </form>

      <button onClick={Downloadinfo}>Download</button>
    </div>
  );
}
export default Secondname;
