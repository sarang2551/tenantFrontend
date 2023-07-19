import React,{useState,useEffect} from "react";
import {useForm} from 'react-hook-form'
import "../tenantComponents/st_form_style.css"
import axios from "axios"

const AddBuildForm = ({onClose,onAddition})=>{
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async(data) => {
                var userID = "64873c12bd2e5989a5e90e1c" /**TODO: Get user data from session  */
                const {buildingName, address, postalCode, images} = data
                
                const addBuilding = async () => {
                  const imageList = [];
                
                  for (let i = 0; i < images.length; i++) {
                    const base64Image = await convertToBase64(images[i]);
                    imageList.push(base64Image);
                  }
                
                  const buildingObject = {
                    buildingName,
                    userID,
                    address,
                    postalCode,
                    images: imageList,
                  };
                  console.log(`Adding building object`)
                    console.log(buildingObject)
                  try {
                    const result = await axios.post("http://localhost:8000/landlord/addBuilding", buildingObject); 
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
                
                addBuilding();
              }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
    <input type='text' placeholder="Building Name" {...register("buildingName", { required: true })} />
    <br/>
    <input type='text' placeholder="Address" {...register("address", { required: true })} />
    <br/>
    <input type="text" placeholder="postal code" {...register("postalCode", {required: true})}/>
    <br/>
      Attach Images 
      <input
            type="file"
            id="fileInput"
            multiple 
            accept="image/*"
            {...register("images", { required: true })}
        />
        <input type="submit"/>
      {errors.buildingName && <span>Name is required</span>}
      {errors.address && <span>Description is required</span>}
      {errors.postalCode && <span>Postal Code is required</span>}
    </form>
  );
}
export default AddBuildForm;