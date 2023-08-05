import React, { useEffect, useState } from 'react'
import NavbarLandlord from '../components/headers/NavBarLandlord' 
import axios from 'axios'
import { useError } from "../components/errorBox";
import { useSuccess } from "../components/successBox";
import "./loginStyle.css"

function UnitOwned() {
    return (
      <div>
        <NavbarLandlord/>
        <div >
            <h1>Units Owned</h1>
        </div>
      </div>
    );
  };
  export default UnitOwned
  
