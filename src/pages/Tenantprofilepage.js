import React, { useState } from 'react';
import Navbar from '../components/headers/NavBar'
import { useNavigate } from "react-router-dom"; 
import "./loginStyle.css"
import CustomPopup from '../components/landlordComponents/CustomPopup';
import Passwordchange from '../components/tenantComponents/Passwordchange';
import Editprofile from '../components/tenantComponents/Editprofile';

const Tenantprofilepage = () => {
  // Replace these with actual user data retrieved from your backend or state management
  const [addChangePassword, setChangePasswordOpen] = useState();
  const [addEditProfile, setEditProfileOpen] = useState();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: 'john_doe',
    phonenumber:'XXXXXXXXX',
    email: 'john.doe@example.com',
    profilePicture: 'https://randomuser.me/api/portraits/men/70.jpg',
  });


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

  return (
    <div>
    <Navbar/>
    <div class="profile-container"> 
        <div class="profile-content">
            <h1>{user.username}</h1>
        </div>
        <div>
            <img src={user.profilePicture} alt="Profile" className="profile-picture" />
        </div>
        <div class="profile-details"> 
            <p>User ID: {user.username}</p>
            <p>Phone number: {user.phonenumber}</p>
            <p>Email: {user.email}</p> 
        </div>
        <div className="sidebar">
          <div className="button-container-profile">
            <button type='submit' onClick={handleEditProfile}>Edit Profile</button>
            <button type='submit' onClick={handleUnitsRented}>Units Rented</button>
            <button type='submit' onClick={handleChangePassword}>Change Password</button>
          </div>
          
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
