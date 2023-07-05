import React, { useState } from "react";
import {useForm} from 'react-hook-form'
import "../components/tenantComponents/st_form_style.css"
import Navbar from "../components/headers/NavBar";
import axios from "axios";
import ErrorMessage from "../components/errorBox";
import { useNavigate } from "react-router-dom";


const LoginPage = ()=>{
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [errorShow,setErrorShow] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")
    var [userType,setUserType] = useState()
    const navigate = useNavigate();

    const onSubmit = async(data) => {
        try {
            await axios.post(`http://localhost:8000/${userType}/verifyLogin`,data).then(response=>{
                
                if(response.status === 200){
                    navigate(`/${userType}/home`)
                } else {
                    setErrorShow(true);
                    setErrorMessage("Error loging in") /** TODO: Need to make this error dynamic */
                    const timer = setTimeout(() => {
                      setErrorShow(false)
                      setErrorMessage("")
                    }, 1000);
                    clearTimeout(timer)
                }
            })
        } catch (error) {
                setErrorShow(true);
                setErrorMessage("Error loging in") /** TODO: Need to make this error dynamic */
                setTimeout(() => {
                  setErrorShow(false)
                  setErrorMessage("")
                }, 3000);
        }
        
    }
  return(
    <>
    <Navbar/>
    <body>
      <div className='adminmsg'>
        <h1>Landlord and Tenant Portal</h1>
      </div>
      <div className='headings'>
        <h2>Login Page</h2>
      </div>
      <div className="form">
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
          <p>
          <label>User Type:</label>
            <br></br>
            <label className='option'>
              <input type="radio" name="UserType" value="Tenant" onClick={()=>setUserType("tenant")} />
              Tenant
            </label>
            <br></br>
            <label className='option'>
              <input type="radio" name="UserType" value="Landlord" onClick={()=>setUserType("landlord")}/>
              Landlord
            </label>
            </p>
          </div>
          <div className="input-container">
            <input type="text" required placeholder="Username" {...register("username", { required: true })}/>
          </div>
          <div className="input-container">
            <input type="password" required placeholder="Password" {...register("password", { required: true })}/>
          </div>
          <div className="button-container">
            <input type="submit" onClick={handleSubmit}/>
          </div>
        </form>
      </div>
      <br></br>
      <div className='adminmsg'>
        <p>Contact adminstrator in the case of forgetting your password</p>
      </div>
    </body>
    {errorShow && <ErrorMessage message={errorMessage}/>}
    </>
);

}


export default LoginPage;
