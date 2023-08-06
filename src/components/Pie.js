import React,{ useEffect, useState } from "react";
import "./Piechart.css";
import PieChart from "./tenantComponents/PieChart";
import axios from "axios";

function Pie() {
  const [pieData,setPieData] = useState([])
  const getPieData = async()=>{
    const userID = sessionStorage.getItem('userID')
    const userType = sessionStorage.getItem('userType')
    const response = await axios.get(`http://localhost:8000/${userType}/getPieChartData/${userID}`) // get all service tickets
    var data = response.data
    setPieData(data)
  }
  useEffect(()=>{
    getPieData()
  },[])
  useEffect(() => {
    const userData = {
      labels: pieData.map(data => data.progressStage).sort(),
      datasets: [
        {
          label: "Progress Stages for Tickets",
          data: pieData.map(data => data.count),
          backgroundColor: [
            "#005f73",
            "#0a9396",
            "#94d2bd",
            "#ee9b00",
            "#bb3e03",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    };
    setUserData(userData);
  }, [pieData]);
  const [userData,setUserData] = useState({
    labels: pieData.map(data=>data.progressStage),
    datasets: [
      {
        label: "Progress Stages for Tickets",
        data: pieData.map(data=>data.count),
        backgroundColor: [
          "#005f73",
          "#0a9396",
          "#94d2bd",
          "#ee9b00",
          "#bb3e03",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });


  return (
    <div>
    <label> Service Ticket Progress Stage Chart
    <div className="Piechart">

      <div style={{ width: 500 }}>
        <PieChart chartData={userData} />
      </div>
    </div>
    </label>
    </div>
  );
}

export default Pie;
