// import React, { useState, useEffect } from 'react';
// import {useForm} from 'react-hook-form';
// import "./st_form_style.css";
// import stepper from "../components/stepper/stepper";

// const ServiceTicketStatus = () => {
// //   const { register, handleSubmit, watch, formState: { errors } } = useForm();

// //   const onSubmit = data => {
// //     // handle submission of serviceTicket
// //     console.log(data)np
// //   }
// //   const [options, setOptions] = useState([{label:"landlord 1"}]);
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await fetch('https://localhost:3000/getLandlordList');
// //         const data = await response.json();
// //         setOptions(data);
// //       } catch (error) {
// //         console.error('Error fetching dropdown options:', error);
// //       }
// //     };
  
// //     fetchData();
// //   }, []);

// return (
//     <div>
//       <div className='adminmsg'>
//         <h1>Service Ticket Status</h1>
//       </div>
//       <div className="Status">
//         <label>Ticket Name:</label>
//         <span className='FromDataBase'>Ticket Name Info</span>
//         <br/>
//         <label>Description:</label>
//         <span className='FromDataBase'>Description Info</span>
//         <br/>
//         <label>Landlord:</label>
//         <span className='FromDataBase'>Landlord Info</span>
//         <br/>
//         <label>Files Submitted:</label>
//         <span className='FromDataBase'>Files submitted Info</span>
//         <br/>
//         <label>Progress:</label>
//         <Stepper />
//       </div>
//       <br></br>
//     </div>
//   );
// };
// export default ServiceTicketStatus;