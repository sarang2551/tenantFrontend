import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import "./st_form_style.css"
import axios from "axios"
import"../landlordComponents/style_form.css";
import { Grid, Typography } from "@material-ui/core";
import tableIcons from "../tenantComponents/MaterialIconComponents";
import { useError } from "../errorBox";
import { useSuccess } from "../successBox";

const Editprofile = ({onClose}) => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { showError } = useError();
    const { showSuccess } = useSuccess();

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

    const validatePhoneNumber = (value) => {
      // A simple example of phone number validation (accepts only numbers with 8 digits)
      const isValidPhoneNumber = /^\d{8}$/.test(value);
      return isValidPhoneNumber || 'Invalid phone number';
    };

    const handleFileChange = (e) => {
      if (e.target.files[0]) {
        setValue("profilePic", e.target.files);
      }
    };

    const onSubmit = async(data)=>{
        try{
            const userID = sessionStorage.getItem('userID')
            const userType = sessionStorage.getItem('userType')
            const updatingDocument = {}
            if(data.profilePic.length !== 0) updatingDocument.profilePic = await convertToBase64(data?.profilePic[0])
            if(data.username) updatingDocument.username = data.username
            if(data.email) updatingDocument.email = data.email
            if(data.phoneNumber) updatingDocument.phoneNumber = data.phoneNumber
            const response = await axios.put(`http://localhost:8000/${userType}/updateUserInfo`,{userID,...updatingDocument})
            if(response.status === 200){
                showSuccess(response.data.message, 3000);
                onClose()
            }else{
                showError('Response error changing information', 3000);
                }
        }catch(err){
          console.log(err)
          showError('Server error changing information', 3000);
        }
    }   
  return (
    <div className="custom-popup-content">
      <form onSubmit={handleSubmit(onSubmit)} className="style-form">
        <div className="style-form-container">
          <tableIcons.Close onClick={onClose} />
        </div>
        <Typography variant="h4" gutterBottom style={{ fontSize: "24px" }}>
          Edit profile
        </Typography>
        <br></br>
        <Grid item xs={20}>
        <input type="text" placeholder="username" {...register('username', { required: false })}></input> 
       
        <input type="text" placeholder="Phone number" {...register('phoneNumber', { required: false, validate: validatePhoneNumber })}></input>
        
        <input type="email" placeholder="Email address" {...register('email', { required: false })}></input>
        
        <label>Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleFileChange} {...register('profilePic', { required: false })}></input>
        
        </Grid>
        <br></br>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <input type="submit" />
        </Grid>
      </form>
      {<showError />}
    </div>
  );
};
export default Editprofile;
