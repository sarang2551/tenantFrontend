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
        <div class="rating">
      <input type="radio" id="timeTaken5" name="timeTaken" value="5" {...register("timeTaken",{required: true})} />
      <label for="timeTaken5" title="5"></label>
      <input type="radio" id="timeTaken4" name="timeTaken" value="4" {...register("timeTaken",{required: true})} />
      <label for="timeTaken4" title="4"></label>
      <input type="radio" id="timeTaken3" name="timeTaken" value="3" {...register("timeTaken", { required: true })} />
    <label htmlFor="timeTaken3" title="3"></label>
      <input type="radio" id="timeTaken2" name="timeTaken" value="2" {...register("timeTaken",{required: true})} />
      <label for="timeTaken2" title="2"></label>
      <input type="radio" id="timeTaken1" name="timeTaken" value="1" {...register("timeTaken",{required: true})} />
      <label for="timeTaken1" title="1"></label>
        </div>
        </label>
        <br/>
        <label> Cost:
  <div className="rating">
    <input type="radio" id="cost5" name="cost" value="5" {...register("cost", { required: true })} />
    <label htmlFor="cost5" title="5"></label>
    <input type="radio" id="cost4" name="cost" value="4" {...register("cost", { required: true })} />
    <label htmlFor="cost4" title="4"></label>
    <input type="radio" id="cost3" name="cost" value="3" {...register("cost", { required: true })} />
    <label htmlFor="cost3" title="3"></label>
    <input type="radio" id="cost2" name="cost" value="2" {...register("cost", { required: true })} />
    <label htmlFor="cost2" title="2"></label>
    <input type="radio" id="cost1" name="cost" value="1" {...register("cost", { required: true })} />
    <label htmlFor="cost1" title="1"></label>
  </div>
</label>

    <br/>
    <label> Quality of work:
  <div className="rating">
    <input type="radio" id="quality5" name="quality" value="5" {...register("quality", { required: true })} />
    <label htmlFor="quality5" title="5"></label>
    <input type="radio" id="quality4" name="quality" value="4" {...register("quality", { required: true })} />
    <label htmlFor="quality4" title="4"></label>
    <input type="radio" id="quality3" name="quality" value="3" {...register("quality", { required: true })} />
    <label htmlFor="quality3" title="3"></label>
    <input type="radio" id="quality2" name="quality" value="2" {...register("quality", { required: true })} />
    <label htmlFor="quality2" title="2"></label>
    <input type="radio" id="quality1" name="quality" value="1" {...register("quality", { required: true })} />
    <label htmlFor="quality1" title="1"></label>
  </div>
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
