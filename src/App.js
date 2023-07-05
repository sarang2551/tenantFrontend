import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/loginPage.js';
import Home from "./pages/homePage";
import About from "./pages/aboutPage";
import ServiceTicketPage from "./pages/serviceTicketPage";
import LandlordHome from "./pages/Landlordhomepage.js";
//import NavBar from "./components/headers/NavBar";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" Component={Login} />
        <Route exact path="/serviceTicketPage" Component={ServiceTicketPage}/>
        <Route exact path="/tenant/home" Component={Home}/>
        <Route exact path="/about" Component={About}/>
        <Route exact path="/landlord/home" Component={LandlordHome}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
