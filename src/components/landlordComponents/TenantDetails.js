import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {useForm} from 'react-hook-form'
import { useError } from "../errorBox";
import { useSuccess } from "../successBox";

const TenantDetailsForm = ({ unitDetails, onClose, onAddition }) => {
  const [tenantData, setTenantData] = useState(undefined)
  const { register, handleSubmit, setValue } = useForm();
  const {showError} = useError()
  const {showSuccess} = useSuccess()
  const onSubmit = async (data) => {
    const {tenantName, email, contact, images} = data
    const editTenant = async() => {
      const imageList = [];
      for (let i = 0; i < images.length; i++) {
        const base64Image = await convertToBase64(images[i]);
        imageList.push(base64Image); 
      }

      const tenantObject = {
        tenantName,
        email,
        contact,
        images: imageList
      }

      try {
        const result = await axios.put(`http://localhost:8000/landlord/editTenant/${unitDetails.tenantRef}`, tenantObject);
        const data = result.data
        if (data.status === 200) {
          showSuccess("Editted successfully",3000)
          onClose();
          onAddition();
        }
      } catch (error) {
        showError("Error editing tenant info",3000)
      }

    }

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
  
    editTenant();
  }

  const fetchData = async () => {
    if (unitDetails.tenantRef) {
        const response = await axios.get(`http://localhost:8000/landlord/getTenantInfo/${unitDetails.tenantRef}`)
        var data = response.data
        if (data.status === 200) {
            setValue("tenantName",data.tenantInfo.tenantName)
            setValue("email",data.tenantInfo.email)
            setValue("contact",data.tenantInfo.contact)
            setTenantData(data.tenantInfo)
        } else {
            showError("error getting tenant data for unit details")
        }
    }

  }
  useEffect(() => {
      try {
          fetchData()
      } catch (err) {
          showError("Server error getting unit data")
      }
  }, [])


  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div>
        <input type="text" id="tenantName" defaultValue={tenantData?.tenantName} placeholder="TenantName" {...register("tenantName", { required: false })} />
        <br />
        <input type="text" id="email" defaultValue={tenantData?.email} placeholder="Email" {...register("email", { required: false })} />
        <br />
        <input type="text" id="number" defaultValue={tenantData?.contact} placeholder="Contact Number" {...register("contact", { required: false })} />
        <br />
        Attach Tenant Image (optional)
        <br />
        <input type="file" id="fileInput" multiple accept="image/*" {...register("images", { required: false })} />
        <br />
        <span>Last Login Date: {tenantData?.lastLoginDate}</span> 
        <br />
        <input type="submit"/>
      </div>
    </form>
  )
}

export default TenantDetailsForm;