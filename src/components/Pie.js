import { useState } from "react";
import "./Piechart.css";


import PieChart from "./tenantComponents/PieChart";
import { UserData } from "./PieData";

function Pie() {
  const [userData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => String(data.userGain)),
        backgroundColor: [
          "#005f73",
          "#0a9396",
          "#94d2bd",
          "#ee9b00",
          "#bb3e03",
        ],
        borderColor: ["white"],
        borderWidth: 2,
      },
    ],
  });


  return (
    <div className="Piechart">

      <div style={{ width: 450 }}>
        <PieChart chartData={userData} />
      </div>
    </div>
  );
}

export default Pie;
