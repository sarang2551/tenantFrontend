import React from "react";
import {useForm} from 'react-hook-form'
import "../tenantComponents/st_form_style.css"
import axios from "axios"

const AddUnitForm = ({onClose,onAddition,buildingID})=>{
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async(data)=>{
        const {unitName,unitNumber,monthlyRental,images} = data
        const addUnit = async()=>{
            const imageList = [];
            const userID = sessionStorage.getItem('userID')
                  for (let i = 0; i < images.length; i++) {
                    const base64Image = await convertToBase64(images[i]);
                    imageList.push(base64Image);
                  }
                
                  const unitObject = {
                    unitName,
                    unitNumber,
                    buildingID,
                    userID,
                    monthlyRental,
                    images: imageList,
                  };
                
                  try {
                    const result = await axios.post("http://localhost:8000/landlord/addUnit", unitObject); 
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
        }
      
        addUnit()
    }
    return(
            <form onSubmit={handleSubmit(onSubmit)} >
            <input type='text' placeholder="Unit Name" {...register("unitName", { required: true })} />
            <br/>
            <input type='text' placeholder="Unit Number" {...register("unitNumber", { required: true })} />
            <br/>
            <input type='text' placeholder="Monthly Rental" {...register("monthlyRental", { required: true })} />
            <br/>
              Attach Images 
              <input
                    type="file"
                    id="fileInput"
                    multiple 
                    accept="image/*"
                    {...register("images")}
                />
                <input type="submit"/>
              {errors.unitNumber && <span>Unit Number is required</span>}
              {errors.monthlyRental && <span>Monthly Rental is required</span>}
              {errors.unitName && <span>Unit Name is required</span>}
              
            </form>
          );
}

export default AddUnitForm;