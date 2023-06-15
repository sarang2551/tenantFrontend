import './App.css';
import React, { useState } from "react";

function LoginPage() {

  return(
    <body>
      <div className='adminmsg'>
        <h1>Landlord and Tenant Portal</h1>
      </div>
      <div className='headings'>
        <h2>Login Page</h2>
      </div>
      <div className="form">
          <form >
          <div className="input-container">
          <p>
          <label>User Type:</label>
            <br></br>
            <label className='option'>
              <input type="radio" name="Tenant" value="Tenant" />
              Tenant
            </label>
            <br></br>
            <label className='option'>
              <input type="radio" name="Landlord" value="Landlord" />
              Landlord
            </label>
            </p>
          </div>
          <div className="input-container">
            <label>Username: </label>
            <input type="text" name="uname" required placeholder="Username"/>
          </div>
          <div className="input-container">
            <label>Password: </label>
            <input type="password" name="pass" required placeholder="Password"/>
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
      <br></br>
      <div className='adminmsg'>
        <p>Contact adminstrator in the case of forgetting your password</p>
      </div>
    </body>
    
);

}


export default LoginPage;
