import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import "./st_form_style.css"
import axios from "axios"

const ServiceTicketForm = ({onClose}) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [landlordOptions, setLandlordOptions] = useState([{landlordName:"landlord 1",landlordID:"ll1"}]); // change this to an empty object later
  const [unitOptions,setUnitOptions] = useState([{unitID:"B01"}]) 
  const onSubmit = async(data) => {
    // handle submission of serviceTicket
    // var document = {
                // "tenantID":"Sarang",check
                // "description":"", check
                // "images":[], check
                // "title":"", check
                // "landlordName":"", check
                // "landlordID":"", check
                // "tenantName":"testID", check
                // "unitID":"" check
                // }
                const {title,description,images} = data
                var {landlordID, landlordName} = landlordOptions[data.landlordIdx];
                var {unitID} = unitOptions[data.unitIdx]
                var tenantName = "test" /**TODO: Get user data from session  */
                var tenantID = "64875a59bd2e5989a5e90e1d"
                const serviceTicketObject = {tenantName,tenantID,unitID,landlordID,landlordName,title,description,images}
                const result = await axios.post("http://localhost:8000/tenant/addServiceTicket",serviceTicketObject)
                if(result.status === 200){
                    onClose()
                }
  }
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://localhost:8000/tenant/getLandlordList');
//         const data = await response.json();
//         setLandlordOptions(data);
//         const unitResponse = await fetch('http://localhost:8000/tenant/getUnitsList)
//          const unitData = await unitResponse.json();
//       } catch (error) {
//         console.error('Error fetching dropdown options:', error);
//       }
//     };
  
//     fetchData();
//   }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <input type='text' defaultValue="Ticket Title" {...register("title", { required: true })} />
    <br/>
    <input type='text' defaultValue="Description" {...register("description", { required: true })} />
    <br/>
    <label>
    Choose a landlord
    <select id="landlord_selection" {...register("landlordIdx", { required: true })}>
        {landlordOptions.map((option,idx) => (
          <option key={idx} value={idx} >
            {option.landlordName}
          </option>
        ))}
      </select>
    Choose a Unit
      <select id="unit_selection" {...register("unitIdx", { required: true })}>
        {unitOptions.map((option,idx) => (
          <option key={idx} value={idx} >
            {option.unitID}
          </option>
        ))}
      </select>
    </label>
      Attach Images 
      <input
            type="file"
            id="fileInput"
            multiple
            {...register("images", { required: true })}
        />
        <input type="submit" />
      {errors.ticket_name && <span>Name is required</span>}
      {errors.description && <span>Description is required</span>}
      {errors.unitIdx && <span>A Unit needs to be selected</span>}
      {errors.landlordIdx && <span>A Landlord needs to be selected</span>}
      {/* {errors.documents && <span>At least one document is required</span>} */}
    </form>
  );
  
};
export default ServiceTicketForm;