import React, { useState } from "react";
import axios from "axios";
import {useForm} from "react-hook-form"
import "../components/tenantComponents/st_form_style.css"
import {useNavigate} from 'react-router-dom'
import "./loginStyle.css"
import { useError } from "../components/errorBox";
import { useSuccess } from "../components/successBox";
import './loginStyle.css';

const FirstLoginPage = ({userDetails}) => {
    // page to allow the change of password
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { showError } = useError();
    const { showSuccess } = useSuccess();
    const navigate = useNavigate()
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
    }
   return (
        <>
        <div className='container-fluid d-flex justify-content-center align-items-center vh-100 vw-100 loginPageFirst'>
            <div className='p-3 rounded w-25 loginForm'>
              <div className='adminmsg'>
                <h1  style={{ color: "white" }}>Change of Password</h1>
              </div>
              <div className='d-flex justify-content-center align-items-center'>
              </div>
              <div className='form'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='input-container'>
                  <input type="password" placeholder="New password" {...register('password_first', { required: true })} style={{ color: 'black' }} />
                  </div>
                  <div className='input-container'>
                  <input type="password" placeholder="Confirm password" {...register('password_second', { required: true })} style={{ color: 'black' }}/>
                  </div>
                  <div className='button-container'>
                    <button type='submit' onClick={handleSubmit}>Submit</button>
                  </div>
                  {errors.password_first && <span>New password is required</span>}
                  {errors.password_second && <span>Confirm password</span>}
                </form>
              </div>
            </div>
          </div>
          {<showError />}
        </>
      );
    };


export default FirstLoginPage;
