import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/loginPage.js';
import Home from "./pages/homePage";
import ServiceTicketPage from "./pages/serviceTicketPage";
import LandlordHome from "./pages/Landlordhomepage.js";
import 'bootstrap/dist/css/bootstrap.min.css'
import LandlordServiceTicketPage from "./pages/LandlordSTPage.js";
import UnitPage from "./pages/unitPage.js";
import LandlordManageTenantsPage from "./pages/LandlordManageTenant.js";
import BuildingManageTable from "./components/landlordComponents/BuildSelectTable.js";
//import NavBar from "./components/headers/NavBar";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" Component={Login} />
        <Route exact path="/serviceTicketPage" Component={ServiceTicketPage}/>
        <Route exact path="/tenant/home" Component={Home}/>
        <Route exact path="/tenant/unitPage" Component={UnitPage}/>
        <Route exact path="/landlord/home" Component={LandlordHome}/>
        <Route exact path="/landlord/serviceTicketPage" Component={LandlordServiceTicketPage}/>
        <Route exact path="/landlord/manageTenants" Component={LandlordManageTenantsPage}/>
        <Route exact path="/landlord/buildingManage" Component={BuildingManageTable}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
