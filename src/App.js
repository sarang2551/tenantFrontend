import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/loginPage.js';
import Home from "./pages/homePage";
import ServiceTicketPage from "./pages/serviceTicketPage";
import LandlordHome from "./pages/Landlordhomepage.js";
import 'bootstrap/dist/css/bootstrap.min.css'
import LandlordServiceTicketPage from "./pages/LandlordSTPage.js";
import LandlordManageTenantsPage from "./pages/LandlordManageTenant.js";
import BuildingManageTable from "./components/landlordComponents/BuildSelectTable.js";
import PrivateRoute from "./components/PrivateRoute.js";
import FirstLoginPage from "./pages/firstLogin.js";
import Landlordprofilepage from "./pages/Landlordprofilepage.js";
import Tenantprofilepage from "./pages/Tenantprofilepage.js";
//import NavBar from "./components/headers/NavBar";
import { ErrorProvider } from './components/errorBox.js';
import { SuccessProvider } from "./components/successBox.js";

function App() {
  const [isSignedIn,setSignedIn] = useState()
  useEffect(()=>{
    const userExists = !!sessionStorage.getItem('UserID');
    setSignedIn(userExists)
  },[])
  return (
    <>
    <SuccessProvider>
    <ErrorProvider>
    <Router>
      <Routes>
        <Route exact path="/" Component={Login} />
        
        <Route exact path="/tenant/firstLogin" element={
          <PrivateRoute desiredUser={"tenant"} isAuthenticated={isSignedIn}>
          <FirstLoginPage/>
          </PrivateRoute>
        }/>

        <Route exact path="/landlord/firstLogin" element={
          <PrivateRoute desiredUser={"landlord"} isAuthenticated={isSignedIn}>
          <FirstLoginPage/>
          </PrivateRoute>
        }/>
        
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
          <Route exact path="/landlord/profilepage" element={
          <PrivateRoute desiredUser={"landlord"} isAuthenticated={isSignedIn}>
            <Landlordprofilepage/>
          </PrivateRoute>
        }/>
        <Route exact path="/tenant/profilepage" element={
          <PrivateRoute desiredUser={"tenant"} isAuthenticated={isSignedIn}>
            <Tenantprofilepage/>
          </PrivateRoute>
        }/>
      </Routes>
    </Router>
    </ErrorProvider>
    </SuccessProvider>
    </>
  );
}

export default App;
