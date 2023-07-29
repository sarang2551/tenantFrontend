import React, { useState } from "react";
import {useForm} from 'react-hook-form'
import "../components/tenantComponents/st_form_style.css"
import axios from "axios";
import ErrorMessage from "../components/errorBox";
import { useNavigate } from "react-router-dom";
import './loginStyle.css';

const LoginPage = ()=>{
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [errorShow,setErrorShow] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")
    var [userType,setUserType] = useState()
    const navigate = useNavigate();

    const onSubmit = async(data) => {
        try {
            await axios.post(`http://localhost:8000/${userType}/verifyLogin`,data).then(response=>{
                var data = response.data
                if(response.status === 200){
                    sessionStorage.setItem("userID",data.userID)
                    sessionStorage.setItem("userType",userType)
                    if(userType === "tenant") sessionStorage.setItem("tenantName",data.tenantName)
                    if(data.firstLogin && userType === "tenant"){
                      navigate('/tenant/firstLogin')
                    }else{
                      navigate(`/${userType}/home`)
                    }
                    
                } else {
                  console.log(response)
                    setErrorShow(true);
                    setErrorMessage("Error logging in") /** TODO: Need to make this error dynamic */
                    const timer = setTimeout(() => {
                      setErrorShow(false)
                      setErrorMessage("")
                    }, 1000);
                    clearTimeout(timer)
                }
            })
        } catch (error) {
                setErrorShow(true);
                setErrorMessage("Error logging in") /** TODO: Need to make this error dynamic */
                setTimeout(() => {
                  setErrorShow(false)
                  setErrorMessage("")
                }, 3000);
        }
        
    }
    
    return (
      <>
      <div className='container-fluid d-flex justify-content-center align-items-center vh-100 vw-100 loginPage'>
          <div className='p-3 rounded w-25 loginForm'>
            <div className='adminmsg'>
              <h1>Login </h1>
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
              <p>Contact administrator in case of forgetting your password.</p>
            </div>
          </div>
        </div>
        {errorShow && <ErrorMessage message={errorMessage} />}
      </>
    );
  };
  


export default LoginPage;
