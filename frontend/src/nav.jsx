import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { BsFilePersonFill } from "react-icons/bs";
import { FcSearch } from "react-icons/fc";
import { GiReceiveMoney } from "react-icons/gi";
import { BsFillPenFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Preloader from "./preloader";

function Nav() {
  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [imagedata, setImagedata] = useState([]);
  let navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const token = Cookie.get("Access cookie");
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    async function Fetchimages() {
      try {
        const response = await axios.get("http://localhost:5000/getimages", {
          headers: { Authorization: token },
        });

        if (response.data.message === "Found images") {
          setImagedata(response.data.data);
          setLoading(false);
        } else if (response.data.message === "No token found") {
          navigate("/");
        } else if (response.data.error === "Invalid token") {
          navigate("/");
        } else if (response.data.message === "token expired") {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }

    Fetchimages();
  }, []);

  return (
    <div className="navv">
      <header>
        <FaBars onClick={toggleMenu} className="menu-icon" />
      </header>

      {loading ? (
        <Preloader />
      ) : (
        <div>
          {imagedata.map((item) => (
            <div>
              <img src={item.imageUrl} alt="" />
            </div>
          ))}
        </div>
      )}

      <div className={`nav-links ${menuVisible ? "show" : ""}`}>
        <Link to="/member">
          <i>
            <BsFilePersonFill />
          </i>
          Add Member
        </Link>
        <Link to="/allmembers">
          <i>
            <FcSearch />
          </i>
          See all Member
        </Link>
        <Link to="/sumamount">
          <i>
            <GiReceiveMoney />
          </i>
          Total sum Based Monthly
        </Link>

        <Link to="/getmonth">
          <i>
            <GiReceiveMoney />
          </i>
          View Month Contribution
        </Link>
        <Link to="/firstname">
          <i>
            <FcSearch />
          </i>
          Find a Member based on firstname
        </Link>
        <Link to="/secondname">
          <i>
            <FcSearch />
          </i>
          Find a Member based on Secondname
        </Link>
        <Link to="/sumspecificyear">
          <i>
            <GiReceiveMoney />
          </i>
          View Sum for a specific year
        </Link>

        <Link to="/deletemember">
          <i>
            <BsFillPenFill />
          </i>
          Delete member
        </Link>
      </div>
      <p>{errormsg}</p>
      <strong>&copy; Leah Wambuku @ 2023</strong>
    </div>
  );
}

export default Nav;
