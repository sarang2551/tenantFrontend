import React, { useState } from "react";
import {useForm} from 'react-hook-form'
import "../components/tenantComponents/st_form_style.css"
import axios from "axios";
import { useError } from "../components/errorBox";
import { useNavigate } from "react-router-dom";
import './loginStyle.css';
import { useSuccess } from "../components/successBox";

const LoginPage = ()=>{
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { showError } = useError();
    const { showSuccess } = useSuccess();
    var [userType,setUserType] = useState()
    const navigate = useNavigate();

    const onSubmit = async(data) => {
        try {
            await axios.post(`http://localhost:8000/${userType}/verifyLogin`,data).then(response=>{
                var data = response.data
                if(response.status === 200){
                    sessionStorage.setItem("userID",data.userID)
                    sessionStorage.setItem("userType",userType)
                    if(userType === "tenant") {
                      sessionStorage.setItem("tenantName",data.tenantName)
                    } 
                    else {
                      sessionStorage.setItem("landlordName",data.landlordName)
                    }
                    if(data.firstLogin){
                      navigate(`/${userType}/firstLogin`)
                      showSuccess('Successfully logged in', 2000);
                    }else{
                      navigate(`/${userType}/home`)
                      showSuccess('Successfully logged in', 2000);
                    }
                    
                } else {
                  console.log(response)
                  showError('Error logging in', 3000);
                }
            })
        } catch (error) {
                showError('Error logging in', 3000);
        }
        
    }
    
    return (
      <>
      <div className='container-fluid d-flex justify-content-center align-items-center vh-100 vw-100 loginPage'>
          <div className='p-3 rounded w-25 loginForm'>
            <div className='adminmsg'>
              <h1  style={{ color: "white" }}>Login </h1>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
            </div>
            <div className='form'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='input-container'>
                    <label>User Type:</label>
                    <div className = 'd-flex'>
                    <div className='option mr-1'>
                      <input type='radio' name='UserType' value='Tenant' onClick={() => setUserType('tenant')} />
                      <label className='mr-4'>Tenant</label>
                    </div>
                    <div className='option'>
                      <input type='radio' name='UserType' value='Landlord' onClick={() => setUserType('landlord')} />
                      <label>Landlord</label>
                    </div>
                  </div>
                </div>
                <div className='input-container'>
                  <input type='text' required placeholder='Username' {...register('username', { required: true })} style={{ color: 'black' }} />
                </div>
                <div className='input-container'>
                  <input type='password' required placeholder='Password' {...register('password', { required: true })} style={{ color: 'black' }}/>
                </div>
                <div className='button-container'>
                  <button type='submit' onClick={handleSubmit}>Submit</button>
                </div>
              </form>
            </div>
            <br />
            <div className='adminmsg'>
              <p style={{ color: "white" }}>Contact administrator in case of forgetting your password.</p>
            </div>
          </div>
        </div>
        {<showError />}
      </>
    );
  };
  


export default LoginPage;
