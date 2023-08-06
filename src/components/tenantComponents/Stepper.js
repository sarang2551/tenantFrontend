import React, { useState,useEffect } from "react";
// import "./Stepper_style.css";
import {TiTick} from "react-icons/ti";
import axios from "axios";
import QuotationForm from "../quotationForm";
import StepperButton from "./StepperButton";
import { useError } from "../errorBox";
import { useSuccess } from "../successBox";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Styledbutton = styled.button`
  display: flex;
  color: white;
  align-items: center;
  font-family: Raleway;
  background-color: #80cbc4;
  font-size: 18px;
  border: 4px solid #80cbc4;
  border-radius: 10px;
`;


const Stepper = ({initialData}) => {
    const [ticketData,setTicketData] = useState(initialData)
    const navigate = useNavigate()
    const userType = sessionStorage.getItem("userType")
    const [currentStep, setCurrentStep] = useState(ticketData?.progressStage);
    const [complete, setComplete] = useState(false);
    const [letLandlordAddQuotation,setLandlordAddQuotation] = useState(ticketData?.quotationAmount === undefined && userType === "landlord" && ticketData?.progressStage == 1)
    const [letTenantAcceptQuotation,setTenantAcceptQuotation] = useState(ticketData?.quotationAmount !== undefined && userType === "tenant" && ticketData?.progressStage == 1)
    const { showError } = useError();
    const { showSuccess } = useSuccess();
    
    const updateServiceTicket = async() => {
      try{
        const userType = sessionStorage.getItem("userType")
        const result = await axios.put(`http://localhost:8000/${userType}/updateServiceTicketProgress`,ticketData);
        var data = result.data
        if(data.status === 200){
          setCurrentStep(data.stepNumber)
          setTicketData(data)
          showSuccess("Updated Progress Successfully",3000)
        } else {
        showError(data.message, 3000);
        }
      }catch(err){
        console.log(`Error updating service ticket ${err}`)
        showError(`Error updating service ticket`, 3000);
      }
      
    }
    const fetchData = async()=>{
      try{
        const serviceTicketID = ticketData?._id
      const response = await axios.get(`http://localhost:8000/general/getServiceTicketInfo/${serviceTicketID}`)
      if(response.status === 200){
        const data = response.data
        setLandlordAddQuotation(data?.quotationAmount === undefined && userType === "landlord" && data.progressStage == 1)
        setTenantAcceptQuotation(data?.quotationAmount !== undefined && userType === "tenant" && data.progressStage == 1)
        setTicketData(data)
      }else{
        showError(response.data.message)
      }
      }catch(err){
        showError("This ticket has been deleted")
        navigate("/serviceTicketPage")
      }
      
    }
    useEffect(()=>{
      fetchData()
    },[ticketData])

    const steps = ["Processing request" , 
    userType === "tenant"?
    ticketData?.quotationAmount ? 
      "Accept/Reject Quotation": "Awaiting Quotation":
    ticketData?.quotationAmount ? 
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
          <div className= "Stepperbutton">
            {ticketData && <StepperButton progressData={ticketData?.progressBar[currentStep]} />}
            {/* hide Stepperbutton for awaiting quotation */}
          </div>

      {!complete && ( //hide "next" for Awaiting quotation
        <button
          className="btn"
          onClick={ticketData?.endDate ? ()=>{
            showError("Service ticket is finished",3000)
          }:() => {
            currentStep === steps.length ? setComplete(true) : updateServiceTicket();
          }}
        >

          {ticketData?.endDate ? "Finish" : "Next"}
        </button>

      )}    
      {letLandlordAddQuotation?
      <QuotationForm onSubmission={()=>setLandlordAddQuotation(false)} ticketData={ticketData}/>:
      userType === "landlord" && ticketData?.progressStage === 1?<span><br/>Awaiting response from tenant</span>:<></>
      }
      {letTenantAcceptQuotation? 
      <QuotationForm onSubmission={()=>setTenantAcceptQuotation(false)} ticketData={ticketData}/>: 
      userType === "tenant" && ticketData?.progressStage === 1? <span><br/>Waiting for Landlord to add Quotation</span>:<></>
    } 
    <showSuccess/>
    <showError/>
      </div>

   );
   
};

export default Stepper;
