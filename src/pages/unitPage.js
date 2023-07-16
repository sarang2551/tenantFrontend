import React, { useEffect, useState } from 'react'
import Navbar from '../components/headers/NavBar'
import axios from 'axios'

function UnitPage() {
  const [unitData, setUnitData] = useState()
  const fetchData = async() => {
    const userID = "64ad758ce3307f7723aa6330" /**TODO: get userID from session management */
    const response = await axios.get(`http://localhost:8000/tenant/getUnitData/${userID}`);
    var data = response.data;
    if(data.status == 200){
         // data should include the entire unit object from the database
         setUnitData(data.unitData)
    }else{
      console.log(`Error getting unit data: ${response}`) /**TODO: UI Component for Error */
    }

  }
  
  useEffect(() => {
    // Fetch data from the API endpoint
    fetchData();
  }, []);
  return (
    <div>
    <Navbar/>
    {unitData && 
    <div style={{ textAlign: 'center' , marginTop: '50px'}}>
    <h3>Unit information</h3>
    <h4>{unitData?.UnitID}</h4>
    <h4>{unitData?.monthlyRental}</h4>
    </div>
    }
    </div>
  )
}
export default UnitPage