import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form';
import "./st_form_style.css";
// import stepper from "./components/stepper";

const ServiceTicketStatus = () => {
//   const { register, handleSubmit, watch, formState: { errors } } = useForm();

//   const onSubmit = data => {
//     // handle submission of serviceTicket
//     console.log(data)np
//   }
//   const [options, setOptions] = useState([{label:"landlord 1"}]);
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
    <body>
      <div className='adminmsg'>
        <h1>Service Ticket Status</h1>
      </div>
      <div className="Status">
        <label>Ticket Name:</label>
        <text className='FromDataBase'>Ticket Name Info</text>
        <br/>
        <label>Description:</label>
        <text className='FromDataBase'>Description Info</text>
        <br/>
        <label>Landlord:</label>
        <text className='FromDataBase'>Landlord Info</text>
        <br/>
        <label>Files Submitted:</label>
        <text className='FromDataBase'>Files submitted Info</text>
        <br/>
        <label>Progress</label>
        <text className='FromDataBase'>Stepper/Status</text> 
        <br/>
        {/* <stepper />  */}
      </div>
      <br></br>
    </body>
  );
  
};
export default ServiceTicketStatus;