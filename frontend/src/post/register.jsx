import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Preloader from "../preloader";

function Register() {
  const [loading, setLoading] = useState(false);
  const [registrationprocess, setRegristrationprocess] = useState(false);
 
  const [username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [registermessage, setRegistermessage] = useState("");
  const [passwordlength, setPasswordlength] = useState("");
 

  async function Postregister(e) {
    e.preventDefault();
    if (Password.length <= 5) {
      setRegristrationprocess(false);
      setPasswordlength("Password Must Be at least 5 charachters long");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/register",
          {
            Username: username,
            password: Password,
            email: Email,
          }
        );

        if (response.data.message === "Saved") {
          setRegistermessage("Registered Successfully");
          setLoading(true);
          setTimeout(() => {
            navigate("/nav");
          }, 3200);
         
        }
        if (response.data.error === "email in use") {
          setRegistermessage(
            "Email or Username Already in Use..Try Registering with a different one"
          );
          setLoading(false);
          setRegristrationprocess(false);
        }
      } catch (error) {
        setRegistermessage("Internal Server");
      }
      setRegristrationprocess(true);
    }
  }

  return (
    <div>
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

      {registrationprocess ? (
        <Preloader />
      ) : (
        <form onSubmit={Postregister}>
          <strong>Register</strong>
          <div>
            <input
              type="text"
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button>Register</button>

          <p className="message">{registermessage}</p>
          <p className="message">{passwordlength}</p>

          <strong>
            <Link to="/" className="linkto">
              Already have an account??
            </Link>
          </strong>
        </form>
      )}
    </div>
  );
}
export default Register;
