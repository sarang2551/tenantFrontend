import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import "./st_form_style.css"
import axios from "axios"


const ServiceTicketForm = ({onClose, onAddition}) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [landlordName, setLandlordName] = useState(); 
  
  const [unitData,setUnitData] = useState() 

  const onSubmit = async(data) => {
                const {title,description,images} = data
                var tenantName = sessionStorage.getItem('tenantName')
                var userID = sessionStorage.getItem('userID')
                const updateServiceTicket = async () => {
                  const imageList = [];
                
                  for (let i = 0; i < images.length; i++) {
                    const base64Image = await convertToBase64(images[i]);
                    imageList.push(base64Image);
                  }
                
                  const serviceTicketObject = {
                    tenantName,
                    userID,
                    unitName:unitData,
                    landlordName,
                    title,
                    description,
                    images: imageList,
                  };
                
                  try {
                    const result = await axios.post("http://localhost:8000/tenant/addServiceTicket", serviceTicketObject); 
                    if (result.status === 200) {
                      onClose();
                      onAddition();
                    }
                  } catch (error) {
                    console.error("Error updating service ticket:", error);
                  }
                };
                
                const convertToBase64 = (image) => {
                  return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      resolve(reader.result);
                    };
                    reader.onerror = () => {
                      reject(new Error("Failed to read image file."));
                    };
                    reader.readAsDataURL(image);
                  });
                };
                
                updateServiceTicket();
              }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        var userID = sessionStorage.getItem('userID')
        const response = await axios.get(`http://localhost:8000/tenant/getUnit&LandlordData/${userID}`);
        var data = response.data
        if(data.status == 200){
            const tenantObject = data.tenantObject
            setUnitData(tenantObject.unitName)
            setLandlordName(tenantObject.landlordName)
        }else{
          console.log(`Error getting tenant data for tenant ${userID} for addition `)
        }
      } catch (error) {
        console.error('Error fetching landlord and unit data', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Add Service Ticket Form</h3>
    <input type='text' placeholder="Ticket Title" {...register("title", { required: true })} />
    <br/>
    <input type='text' placeholder="Description" {...register("description", { required: true })} />
    <br/>
    <label>
    Landlord: <p id="landlord_name">{landlordName}</p>
    {/* <select id="landlord_selection" {...register("landlordIdx", { required: true })}>
        {landlordOptions.map((option,idx) => (
          <option key={idx} value={idx} >
            {option.landlordName}
          </option>
        ))}
      </select> */}
    Unit: <p id="unit_name">{unitData}</p>
    
      {/* <select id="unit_selection" {...register("unitIdx", { required: true })}>
        {unitOptions.map((option,idx) => (
          <option key={idx} value={idx} >
            {option.unitID}
          </option>
        ))}
      </select> */}
    </label>
    <br/>
      Attach Images 
      <input
            type="file"
            id="fileInput"
            multiple 
            accept="image/*"
            {...register("images",)}
        />
      <br/>
       <button type='submit'>Submit</button>
      {errors.ticket_name && <span>Name is required</span>}
      {errors.description && <span>Description is required</span>}
      
    </form>
  );
  
};
export default ServiceTicketForm;