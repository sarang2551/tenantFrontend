import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import "./st_form_style.css"
import axios from "axios"
import"../landlordComponents/style_form.css";
import { Grid, Typography } from "@material-ui/core";
import tableIcons from "../tenantComponents/MaterialIconComponents";
import { useError } from "../errorBox";
import { useSuccess } from "../successBox";
import { useNavigate } from "react-router-dom"; 

const Passwordchange = ({onClose, onAddition}) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { showError } = useError();
    const { showSuccess } = useSuccess();
    const navigate = useNavigate();
    const onSubmit = async(data)=>{
        const {password_first,password_second} = data
        if(password_first === password_second){
            const userID = sessionStorage.getItem('userID')
            const response = await axios.put("http://localhost:8000/tenant/changePassword",{password:password_first,userID})
            if(response.status === 200){
                showSuccess('Password has been successfuly changed', 3000);
                navigate('/')
            }else{
                showError('Server error changing password', 3000);
                }
        } else {
             showError('Passwords do not match', 3000);
        }
    }       //Todo : have logic to confirm if old password is correct first before changing password
  return (
    <div className="custom-popup-content">
      <form onSubmit={handleSubmit(onSubmit)} className="style-form">
        <div className="style-form-container">
          <tableIcons.Close onClick={onClose} />
        </div>
        <Typography variant="h4" gutterBottom style={{ fontSize: "24px" }}>
          Change password
        </Typography>
        <br></br>
        <Grid item xs={20}>
        <input type="password" placeholder="Old password" {...register('password_first', { required: true })}></input> 
        <input type="password" placeholder="New password" {...register('password_first', { required: true })}></input>
        <input type="password" placeholder="Confirm password" {...register('password_second', { required: true })}></input>
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
export default Passwordchange;
