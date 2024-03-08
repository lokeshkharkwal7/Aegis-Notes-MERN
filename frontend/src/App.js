import "./App.css";
import About from "./components/about";
import Home from "./components/home";
import Navbar from "./components/navbar";

import { Routes, Route  } from "react-router-dom";
 import Alert from "./components/alert";
import {   useState } from "react";
import Loginpage from "./components/loginpage";
import Signup from "./components/signup";
 
function App() {
  // creating a state for alert message
  // const {fetchData, authToken} = useContext(MyContext)
  const [alertstatus, SetAlertStatus] = useState(true);
  function status() {
    {
      setTimeout(() => {
        SetAlertStatus(false);
      }, 1000);
    }
  }

  // useEffect(()=>{

  //   fetchData();
  // },[])

  return (
    <>
      {/* for using context api  */}
     
        {/* your normal code  */}
        <Navbar />
        {/* <Alert message={"Hi, Please Login to Continue or Sign Up "} /> */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Loginpage />} />
          <Route path="/" element={<Loginpage />} />
 
          <Route path="/signup" element={<Signup />} />
        </Routes>
     </>
  );
}

export default App;
