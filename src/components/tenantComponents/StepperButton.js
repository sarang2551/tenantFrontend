import React, { useEffect } from 'react';
import "./StepperButton.css"; 

const StepperButton = () => {
  useEffect(() => {
    const handleButtonClick = () => {
      // Your event handling code here
      console.log("StepperButton clicked!");
    };

    const container = document.querySelector('.container');
    if (container) {
      container.addEventListener('click', handleButtonClick);

      return () => {
        // Cleanup: Remove the event listener when the component unmounts
        container.removeEventListener('click', handleButtonClick);
      };
    }
  }, []);

  return (
<div class="customCheckBoxHolder">

<input class="customCheckBoxInput" id="cCB1" type="checkbox"></input>
<label class="customCheckBoxWrapper" for="cCB1">
    <div class="customCheckBox">
        <div class="inner">Tenant</div>
    </div>
</label>

<input class="customCheckBoxInput" id="cCB2" type="checkbox"></input>
<label class="customCheckBoxWrapper" for="cCB2">
    <div class="customCheckBox">
        <div class="inner">Landlord</div>
    </div>
</label>

</div>


  );
};

export default StepperButton;
