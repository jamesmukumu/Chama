import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./post/register";
 import Login from "./post/login";
 import Member from "./post/member";
 import Allmembers from "./get/allmembers";
 import Sumamount from "./get/sumallmonths";
 import Sumspecificmonth from "./get/sumspecificmonth";
import Getmonth from "./get/getmonth";
import Firstname from "./get/getbyfirstname";
 import Secondname from "./get/getbysecondname";
 import Sumspecificyear from "./get/sumspecificyear";
import Updatedetails from "./patch/patchdetailsbyfirstname";
import Nav from "./nav";
import { AuthProvider } from "./authorization";
function App(){



return(
  <div>
<AuthProvider>
<BrowserRouter>
  <Routes>
<Route path="/" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/nav" element={<Nav/>}/>
<Route path="/member" element={<Member/>}/>
<Route path="/allmembers" element={<Allmembers/>}/>
<Route path="/sumamount" element={<Sumamount/>}/>
<Route path="/sumspecificmonth" element={<Sumspecificmonth/>}/>
<Route path="/getmonth" element={<Getmonth/>}/>
<Route path="/firstname" element={<Firstname/>}/>
<Route path="/secondname" element={<Secondname/>}/>
<Route path="/sumspecificyear" element={<Sumspecificyear/>}/>
<Route path="/updatedetails" element={<Updatedetails/>}/>

  </Routes>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  </BrowserRouter>

















</AuthProvider>



  </div>
)


}
export default App