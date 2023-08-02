import React, { useState,useEffect } from "react";
// import "./Stepper_style.css";
import {TiTick} from "react-icons/ti";
import axios from "axios";
import QuotationForm from "../quotationForm";
import { useError } from "../errorBox";
import { useSuccess } from "../successBox";

const Stepper = ({ticketData}) => {
    const userType = sessionStorage.getItem("userType")
    const [currentStep, setCurrentStep] = useState(ticketData.progressStage);
    const [complete, setComplete] = useState(false);
    const [letLandlordAddQuotation,setLandlordAddQuotation] = useState(!ticketData.quotationDocument && userType === "landlord" && ticketData.progressStage == 1)
    const [letTenantAcceptQuotation,setTenantAcceptQuotation] = useState(!!ticketData.quotationDocument && userType === "tenant" && ticketData.progressStage == 1)
    const { showError } = useError();
    const { showSuccess } = useSuccess();
    
    const updateServiceTicket = async() => {
      try{
        const userType = sessionStorage.getItem("userType")
        const result = await axios.put(`http://localhost:8000/${userType}/updateServiceTicketProgress`,ticketData);
        var data = result.data
        if(result.status === 200){
          console.log(data)
          setCurrentStep(data.stepNumber)
        } else {
        console.log(data.message) /**TODO: Show UI error component */
        showError(data.message, 3000);
        }
      }catch(err){
        console.log(`Error updating service ticket`) /**TODO: Show UI error component */
        showError(`Error updating service ticket`, 3000);
      }
      
    }

    const steps = ["Processing request" , 
    userType === "tenant"?
    ticketData.quotation ? 
      "Accept/Reject Quotation": "Awaiting Quotation":
    ticketData.quotation ? 
    "Awaiting Acceptance/Rejection" : "Submit Quotation Below"
    , 
    "Work In Progress" , "Completed"];
    return (
       <div>
        <div className="flex justify-between">
            {steps?.map((step,i)=>(
                <div 
                key={i} 
                className={'step-item ${currentStep ===  i + 1 && "active" } ${(i+1 < currentStep || complete)&& "complete"}' }
                > 
                    <div className="step">
                        {i  < currentStep || complete ? <TiTick size={24} /> : i + 1 }
                    </div> 
                    <p className = "text-gray-500">{step}</p>
              </div>
            ))}
          </div>
       
      {!complete && (
        <button
          className="btn"
          onClick={() => {
            currentStep === steps.length ? setComplete(true) : updateServiceTicket();
          }}
        >
          {ticketData.endDate ? "Finish" : "Next"}
        </button>
      )}    
      {letLandlordAddQuotation?
      <QuotationForm onSubmission={()=>setLandlordAddQuotation(false)} ticketData={ticketData}/>:
      userType === "landlord"?<span><br/>Awaiting response from tenant</span>:<></>
      }
      {letTenantAcceptQuotation? 
      <QuotationForm onSubmission={()=>setTenantAcceptQuotation(false)} ticketData={ticketData}/>: 
      userType === "tenant" ? <span><br/>Waiting for Landlord to add Quotation</span>:<></>
    } 
      </div>

   );
   
};

export default Stepper;
