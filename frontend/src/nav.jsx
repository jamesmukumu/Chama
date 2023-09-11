
import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./authorization";
import { BsFilePersonFill } from "react-icons/bs";
import { FcSearch } from "react-icons/fc";
import { GiReceiveMoney } from "react-icons/gi";
import { BsFillPenFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { BsBackspaceFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function Nav() {
  const [imagedata,setImagedata] = useState([])
  let navigate = useNavigate()
  const [menuVisible, setMenuVisible] = useState(false);
  const { isAuthenticated } = useAuth();  
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };


useEffect(()=>{
  if (!isAuthenticated) {
    navigate('/'); 
     
  }


},[])

useEffect(()=>{
  async function Fetchimages(){
    try {
      const response = await axios.get('https://chama-1ztm.onrender.com/getimages')
     
    if(response.data.message==='Found images'){
    setImagedata(response.data.data)
    
    }
    
    } catch (error) {
      error
    }}



    Fetchimages()
},[])












  return (
    <div className="navv">
      <header>
        
       
          <FaBars onClick={toggleMenu} className="menu-icon" />
      
      </header>

      <div>
     {imagedata.map((item)=>(

      <div>
      <img src={item.imageUrl} alt="" />
      

      </div>


     ))}
      </div>


      <div className={`nav-links ${menuVisible ? "show" : ""}`}>

        <div>
        <BsBackspaceFill
            onClick={toggleMenu}
            className={`backspace-icon ${menuVisible ? "show" : ""}`}
          />
        </div>
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
      <h1>&copy; Leah Wambuku @ 2023</h1>

     
    </div>
  );
}

export default Nav;
