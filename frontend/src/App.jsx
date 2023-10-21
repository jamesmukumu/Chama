import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./post/register";
 import Login from "./post/login";
 import Member from "./post/member";
 import Allmembers from "./get/allmembers";
 import Sumamount from "./get/sumallmonths";

import Getmonth from "./get/getmonth";
import Firstname from "./get/getbyfirstname";
 import Secondname from "./get/getbysecondname";
 import Sumspecificyear from "./get/sumspecificyear";

import Deletemember from "./delete/deletion";
import Nav from "./nav";

function App(){



return(
  <div>

<BrowserRouter>
  <Routes>
<Route path="/" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/nav" element={<Nav/>}/>
<Route path="/member" element={<Member/>}/>
<Route path="/allmembers" element={<Allmembers/>}/>
<Route path="/sumamount" element={<Sumamount/>}/>

<Route path="/getmonth" element={<Getmonth/>}/>
<Route path="/firstname" element={<Firstname/>}/>
<Route path="/secondname" element={<Secondname/>}/>
<Route path="/sumspecificyear" element={<Sumspecificyear/>}/>

<Route path="/deletemember" element={<Deletemember/>}/>
  </Routes>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  </BrowserRouter>





















  </div>
)


}
export default App