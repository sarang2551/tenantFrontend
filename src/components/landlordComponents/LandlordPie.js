import { useState } from "react";
import "./LandlordPieDesign.css";
import LandlordPieChart from "./LandlordPieChart";
import { UserData } from "./LandlordData";

function LandlordPie() {
  const [userData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "#17594A",
          "#213363",
          "#1F6E8C",
          "#2E8A99",
          "#8EAC50",
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  });


  return (
    <div className="Piechart">
      <div style={{ width: 450 }}>
        <LandlordPieChart chartData={userData} />
      </div>
    </div>
  );
}

export default LandlordPie;