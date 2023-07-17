import React from "react";
import {useForm} from 'react-hook-form'
import "../tenantComponents/st_form_style.css"
import axios from "axios"

const AddTenantForm = ({unitDetails,onClose,onAddition})=>{
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async(data)=>{
        const {images,tenantName} = data // data collected from form
        const userID = "64873c12bd2e5989a5e90e1c" /** TODO: Get from user session */
        console.log("Sending unit details")
        console.log(unitDetails)
        const {unitNumber,_id} = unitDetails
        const addTenant = async()=>{
          const imageList = [];
          for (let i = 0; i < images.length; i++) {
            const base64Image = await convertToBase64(images[i]);
            imageList.push(base64Image);
          }
          const tenantObject = {
            tenantName,
            unitNumber,
            unitRef:_id,
            landlordRef:userID,
            images: imageList,
          };
        
          try {
            const result = await axios.post("http://localhost:8000/landlord/addTenants", tenantObject); 
            if (result.status === 200) {
              onClose();
              onAddition();
            }
          } catch (error) {
            console.error("Error adding Tenant");
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
        addTenant();
    }
    return(
            <form onSubmit={handleSubmit(onSubmit)} >
            <input type='text' placeholder="Tenant Name" {...register("tenantName", { required: true })} />
            <br/>
            <span>{unitDetails?.unitNumber}</span>
            <br/>
              Attach Tenant Image (optional)
              <input
                    type="file"
                    id="fileInput"
                    multiple 
                    accept="image/*"
                    {...register("images", { required: false })}
                />
                <input type="submit"/>
              {errors.tenantName && <span>Tenant Name is required</span>}
            </form>
          );
}

export default AddTenantForm;