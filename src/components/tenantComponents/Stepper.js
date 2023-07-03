import React, { useState } from "react";
import "./Stepper.css";
import {TiTick} from "react-icons/ti";


const Stepper = () => {
    const steps = ["Processing request" , "Acception quotation" , "Service Scheduling", "Work In Progress" , "Completed"];
    const [currentStep, setCurrentStep] = useState(1);
    const [complete, setComplete] = useState(false);
    return (
       <>
        <div className="flex justify-between">
            {steps?.map((step,i)=>(
                <div 
                key={i} 
                className={'step-item ${currentStep === i + 1 && "active" } ${(i+1 < currentStep || complete)&& "complete"}' }
                > 
                    <div className="step">
                        {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1 }
                    </div> 
                    <p className = "text-gray-500">{step}</p>
              </div>
            ))}
          </div>
          {
            !complete && <button 
            className="btn" 
            onClick={()=>{
                currentStep === steps.length ? setComplete(true)
                : setCurrentStep(prev =>prev+1);
            }}
            >
                {currentStep === steps.length ? "Finish" : "Next"}
                </button>

          }
          
          </>

   );
};


//     const steps = ["Processing request" , "Acception quotation" , "Service Scheduling", "Work In Progress" , "Completed"];
//     const [currentStep, setCurrentStep] = useState(0);
//     const [completedSteps, setCompletedSteps] = useState([]);

//     const goToPreviousStep = () => {
//         setCurrentStep(prevStep => prevStep - 1);
//       };
    
//       const goToNextStep = () => {
//         if (!completedSteps.includes(currentStep)) {
//           setCompletedSteps(prevSteps => [...prevSteps, currentStep]);
//         }
//         setCurrentStep(prevStep => prevStep + 1);
//       };

//     return (
//     <div className="stepper">
//       {steps.map((step, index) => (
//         <div
//           key={index}
//           className={`step ${
//             index === currentStep ? 'active' : ''
//           } ${completedSteps.includes(index) ? 'complete' : ''}`}
//         >
//           <div className="step-icon">
//             {completedSteps.includes(index) ? <TiTick /> : index + 1}
//           </div>
//           <div className="step-label">{step}</div>
//         </div>
//       ))}
//       <div className="stepper-buttons">
//         <button onClick={goToPreviousStep} disabled={currentStep === 0}>
//           Previous
//         </button>
//         <button
//           onClick={goToNextStep}
//           disabled={currentStep === steps.length - 1}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };







export default Stepper;