import React, { useEffect, useState } from 'react';
import Navbar from '../components/headers/NavBar'
import { useNavigate } from "react-router-dom"; 
import "./loginStyle.css"
import CustomPopup from '../components/landlordComponents/CustomPopup';
import Passwordchange from '.././components/Passwordchange';
import Editprofile from '../components/tenantComponents/Editprofile';
import "./profilepage.css"
import axios from 'axios';
import { useError } from '../components/errorBox';
import { useSuccess } from '../components/successBox';

const Tenantprofilepage = () => {
  // Replace these with actual user data retrieved from your backend or state management
  const [addChangePassword, setChangePasswordOpen] = useState();
  const [addEditProfile, setEditProfileOpen] = useState();
  const {showSuccess} = useSuccess()
  const {showError} = useError()
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const convertToImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      return objectURL;
    } catch (error) {
      console.error('Error converting image:', error);
      return null;
    }
  };
  const handleChangePassword = () => {
    setChangePasswordOpen(true)
  }

  const handleClosePopupCP = () => {
    setChangePasswordOpen(false);
  };

  const handleEditProfile = () => {
    setEditProfileOpen(true)
  }

  const handleClosePopupEP = () => {
    setEditProfileOpen(false);
  };

  const handleUnitsRented = () => {
    // Implement the edit profile logic here
    console.log('Units rented displayed');
    navigate('/tenant/unitPage')
  };

  const fetchData = async() => {
      try{
        const userID = sessionStorage.getItem('userID')
        const response = await axios.get(`http://localhost:8000/landlord/getTenantInfo/${userID}`)
        var data = response.data
        if(data.status === 200){
          const userObject = data.tenantInfo
          console.log(userObject)
          const processedImage = await Promise.all([userObject?.profilePic].map(convertToImage));
          userObject.profilePic = processedImage[0]
          setUser(userObject)
        } else {
          showError("Response error getting profile information. Contact admin",3000)
        }
      }catch(err){
        console.log(err)
        showError(`Server error getting profile information. Contact admin`,3000)
      }
  }

  useEffect(()=>{
    fetchData()
  }, [user])

  return (
    <div>
    <Navbar/>
    <div class="profile-container"> 
        <div class="profile-content">
            <h1>{user.username}</h1>
        </div>
        <div>
        {user.profilePic ?
            <img src={user.profilePic} alt="Profile" className="profile-picture" /> : 
            <div>
            <h3>No profile pic submitted</h3>
            </div>
            }
        </div>
        <div class="profile-details"> 
            <p>Username: {user.username}</p>
            <p>Phone number: {user.phoneNumber}</p>
            <p>Email: {user.email}</p> 
        </div>
      </div>
      <div className="sidebar">
        <div className="button-container-profile">
            <button type='submit' onClick={handleEditProfile}>Edit Profile</button>
            <button type='submit' onClick={handleChangePassword}>Change Password</button>
        </div>
       </div>
      <CustomPopup open={addChangePassword} onClose={handleClosePopupCP} modal>
        <Passwordchange onClose={handleClosePopupCP}  />
      </CustomPopup>
      <CustomPopup open={addEditProfile} onClose={handleClosePopupEP} modal>
        <Editprofile onClose={handleClosePopupEP}  />
      </CustomPopup>
    </div>
    
  );
};

export default Tenantprofilepage;
