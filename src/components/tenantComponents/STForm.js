import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import "./st_form_style.css"
import axios from "axios"


const ServiceTicketForm = ({onClose}) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [landlordOptions, setLandlordOptions] = useState([{landlordName:"landlord 1",landlordID:"ll1"}]); // change this to an empty object later
  const [unitOptions,setUnitOptions] = useState([{unitID:"B01"}]) 
  const [images, setImages] = useState([]);

//   const handleFileChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     setImages(selectedFiles);
//     handleImageUpload();
//   };


//   const convertToBase64 = async (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result.split(',')[1]);
//       reader.onerror = (error) => reject(error);
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleImageUpload = async () => {
//     try {
//       const base64Images = await Promise.all(images.map((file) => convertToBase64(file)));
    

//       const imagesData = images.map((file, index) => {
//         return {
//           name: file.name,
//           base64: base64Images[index],
//         };
//       });

//       const jsonData = JSON.stringify(imagesData);
//       console.log('Images JSON', jsonData);
//     } catch (error) {
//       console.error('Error converting images to Base64:', error);
//     }
//   };

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
                // handleImageUpload();


                const serviceTicketObject = {
                  tenantName,tenantID,unitID,landlordID,landlordName,title,description,images}


                try {
                  const result = await axios.post("http://localhost:8000/tenant/addServiceTicket",
                    serviceTicketObject
                  );
              
                  if (result.status === 200) {
                    onClose();
                  }
                } catch (error) {
                  console.error("Error sending service ticket", error);
                }
              };

      
  
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
    <form onSubmit={handleSubmit(onSubmit)} >
    <input type='text' placeholder="Ticket Title" {...register("title", { required: true })} />
    <br/>
    <input type='text' placeholder="Description" {...register("description", { required: true })} />
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
            accept="image/*"
            // onChange = {(e) => {handleFileChange}}
            {...register("images", { required: true })}
        />

        <input type="submit"/>
      {errors.ticket_name && <span>Name is required</span>}
      {errors.description && <span>Description is required</span>}
      {errors.unitIdx && <span>A Unit needs to be selected</span>}
      {errors.landlordIdx && <span>A Landlord needs to be selected</span>}
      {/* {errors.documents && <span>At least one document is required</span>} */}
    </form>
  );
  
};
export default ServiceTicketForm;