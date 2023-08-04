import React from "react";
import axios from "axios";
import {useForm} from "react-hook-form"
import "./tenantComponents/st_form_style.css"
import { useError } from "../components/errorBox";
import { useSuccess } from "../components/successBox";

const FeedbackForm = ({ticketData, onSubmission}) => {
    // send feedback to backend
    // attach feedback attribute to the service ticket
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
    const { showError } = useError();
    const { showSuccess } = useSuccess();
    const onSubmit = async(data) =>{
        try{
            
            const userType = sessionStorage.getItem("userType")
            const serviceTicketID = ticketData._id

            const response = await axios.put(`http://localhost:8000/${userType}/submitFeedback`,{...data,serviceTicketID})
            if(response.status === 200){
                
                showSuccess(`Successfully sent feedback`, 3000);
                onSubmission()
            } else {
                console.log(`Error sending feedback form`) /**TODO: Add Error component */
                showError('Error sending feedback form', 3000);
            }
        }catch(err){
            console.log(`Error sending feedback form`) /**TODO: Add Error component */
            showError('Error sending feedback form', 3000);
        }
    }

    
    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{alignContent:"center"}}>
        <h3>Feedback Form</h3>
        <h5>Rate from 1 to 5 (1 being the worst and 5 being the best)</h5>
        <br/>
        <label> Time taken:
        <input type="number" min="1" max="5" {...register("timeTaken",{required: true})} placeholder="1-5"/>
        </label>
        <br/>
        <label> Cost:
        <input type="number" min="1" max="5" {...register("cost",{required: true})} placeholder="1-5"/>
        </label>
        <br/>
        <label> Quality of work:
        <input type="number" min="1" max="5" {...register("quality",{required: true})} placeholder="1-5"/>
        </label>
        <br/>
        <button type="submit">Submit Feedback</button>
        {errors.timeTaken && <span>Pls specify a rating for time taken</span>}
        {errors.cost && <span>Pls specify a rating for cost</span>}
        {errors.quality && <span>Pls specify a rating for quality</span>}
        </form>
    )
}

export default FeedbackForm;
