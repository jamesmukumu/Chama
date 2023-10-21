import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Preloader from "../preloader";
import Cookie from "js-cookie"

function Login() {
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [passwordlength, setPasswordLength] = useState("");
 
  const [loginInProgress, setLoginInProgress] = useState(false);
 
  async function Postlogin(e) {
    e.preventDefault();
    setLoginInProgress(true);

    if (password.length <= 5) {
      setPasswordLength("Password must be at least 5 characters");
      setLoginInProgress(false);
    } else {
      try {
        const response = await axios.post("http://localhost:5000/login", {
          Username: username,
          password: password,
        });

        if (response.data.message === "Successfully logged in") {
          const token = response.data.token
          Cookie.set("Access cookie",token,{expires:1/24})
          axios.defaults.headers.common["Authorization"] = token
        
          setLoading(true);
          

          setTimeout(() => {
            navigate("/nav");
          }, 3000);
        } else if (response.data.error === "Username not Found") {
          setLoading(false);
          setErrormsg("Invalid Username");

          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else if (response.data.error === "Invalid password") {
          setErrormsg("Wrong Password...");

          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } catch (error) {
        setErrormsg("Internal Server Error");
      }

      setLoginInProgress(false);
    }
  }

  return (
    <div className="cont">
      <div className="welcome">
        <strong className="verse" style={{ fontFamily: " 'Sono', monospace" }}>
          Matthew:23:11
        </strong>
      </div>
      <div className="welcome">
        <strong className="text" style={{ fontFamily: "'Buda', serif" }}>
          "But the greatest among you shall be your servant"
        </strong>
      </div>

      {loginInProgress ? (
        <Preloader />
      ) : (
        <form onSubmit={Postlogin}>
          <strong>Login</strong>
          <div>
            <input
              type="text"
              required
              placeholder="Enter Your Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter Your Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>Login</button>
          <p className="error">{errormsg}</p>
          <p className="error">{passwordlength}</p>

          <strong>
            <Link to="/register">Register</Link>
          </strong>
        </form>
      )}
    </div>
  );
}

export default Login;
