import React, { useState, useEffect } from 'react';
import "./StepperButton.css";
import axios from 'axios';

const StepperButton = () => {
  const [progressData, setProgressData] = useState([false, false]);

  useEffect(() => {
  
    const fetchProgressData = async () => {
      try {
        const response = await axios.get("http://localhost:8000//general/getServiceTicketInfo/{serviceticketID}"); 
        const data = response.data;
        setProgressData(data); 
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };

    fetchProgressData();
  }, []);

  return (
    <div className="container">
      <div class="customCheckBoxHolder">
        <div
          class={`customCheckBox ${progressData[0] ? 'completed' : 'incomplete'}`}
        >
          <div class="inner">Tenant</div>
        </div>

        <div
          class={`customCheckBox ${progressData[1] ? 'completed' : 'incomplete'}`}
        >
          <div class="inner">Landlord</div>
        </div>
      </div>
    </div>
  );
};

export default StepperButton;





// const StepperButton = () => {
//   const handleButtonClick = () => {
//     // Your event handling code here
//     console.log("StepperButton clicked!");
//   };

//   return (
//     <div className="container">
//       <button onClick={handleButtonClick}>StepperButton</button>
//     </div>
//   );
// };


//   return (
// <div class="customCheckBoxHolder">

// <input class="customCheckBoxInput" id="cCB1" type="checkbox"></input>
// <label class="customCheckBoxWrapper" for="cCB1">
//     <div class="customCheckBox">
//         <div class="inner">Tenant</div>
//     </div>
// </label>

// <input class="customCheckBoxInput" id="cCB2" type="checkbox"></input>
// <label class="customCheckBoxWrapper" for="cCB2">
//     <div class="customCheckBox">
//         <div class="inner">Landlord</div>
//     </div>
// </label>

// </div>


//   );
// ;

// export default StepperButton;
