import React, { useEffect, useState } from "react"
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
import PrivateRoute from "./components/PrivateRoute.js";
//import NavBar from "./components/headers/NavBar";

function App() {
  const [isSignedIn,setSignedIn] = useState()
  useEffect(()=>{
    const userExists = !!sessionStorage.getItem('UserID');
    setSignedIn(userExists)
  },[])
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" Component={Login} />

        <Route exact path="/serviceTicketPage" element={
          <PrivateRoute desiredUser={"tenant"} isAuthenticated={isSignedIn}>
            <ServiceTicketPage/>
          </PrivateRoute>
        }/>
        <Route exact path="/tenant/home" element={
          <PrivateRoute desiredUser={"tenant"} isAuthenticated={isSignedIn}>
            <Home/>
            </PrivateRoute>
        } />
        <Route exact path="/tenant/unitPage" element={
          <PrivateRoute desiredUser={"tenant"} isAuthenticated={isSignedIn}>
            <UnitPage/>
          </PrivateRoute>
        }/>
        <Route
            exact path="/landlord/home"
            element={
              <PrivateRoute desiredUser={"landlord"} isAuthenticated={isSignedIn}>
                <LandlordHome/>
              </PrivateRoute>
            }
            />
        <Route exact path="/landlord/serviceTicketPage" element={
          <PrivateRoute desiredUser={"landlord"} isAuthenticated={isSignedIn}>
              <LandlordServiceTicketPage/>
          </PrivateRoute>
        }/>
        <Route exact path="/landlord/manageTenants" element={
          <PrivateRoute desiredUser={"landlord"} isAuthenticated={isSignedIn}>
            <LandlordManageTenantsPage/>
          </PrivateRoute>
        }/>
        <Route exact path="/landlord/buildingManage" element={
          <PrivateRoute desiredUser={"landlord"} isAuthenticated={isSignedIn}>
            <BuildingManageTable/>
          </PrivateRoute>
        }/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
