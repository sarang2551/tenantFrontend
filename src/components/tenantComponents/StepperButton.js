import React from 'react';
import "./StepperButton.css"

const StepperButton = ({progressData}) => {

  return (
    <div className="container">
      <div class="customCheckBoxHolder">
        <div
          class={`customCheckBox ${progressData[0] ? 'completed' : 'incomplete'}`}
          style={progressData[0] ? {backgroundColor:"lightgreen"} : {backgroundColor:"red"}}
        >
          <div class="inner">Tenant</div>
        </div>

        <div
          class={`customCheckBox ${progressData[1] ? 'completed' : 'incomplete'}`}
          style={progressData[1] ? {backgroundColor:"lightgreen"} : {backgroundColor:"red"}}
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
