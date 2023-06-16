import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import "./st_style.css"

const ServiceTicketForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = data => {
    // handle submission of serviceTicket
    console.log(data)
  }
  const [options, setOptions] = useState([{label:"landlord 1"}]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://localhost:3000/getLandlordList');
//         const data = await response.json();
//         setOptions(data);
//       } catch (error) {
//         console.error('Error fetching dropdown options:', error);
//       }
//     };
  
//     fetchData();
//   }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <input type='text' defaultValue="Ticket Name" {...register("ticket_name", { required: true })} />
    <br/>
    <input type='text' defaultValue="Description" {...register("description", { required: true })} />
    <br/>
    <label>
    Choose a landlord
    <select id="landlord_selection">
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
      
      <input
            type="file"
            id="fileInput"
            multiple
            {...register("documents", { required: true })}
        />
        <input type="submit" />
      {errors.ticket_name && <span>Name is required</span>}
      {errors.description && <span>Description is required</span>}
      {errors.documents && <span>At least one document is required</span>}
    </form>
  );
  
};
export default ServiceTicketForm;