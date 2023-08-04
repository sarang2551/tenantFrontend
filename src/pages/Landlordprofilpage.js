import React, { useState } from 'react';
import NavbarLandlord from '../components/headers/NavBarLandlord' 
import { useNavigate } from "react-router-dom";
import "../components/headers/assets/css/style.css" 
import CustomPopup from '../components/landlordComponents/CustomPopup';
import Passwordchange from '../components/tenantComponents/Passwordchange';
import Editprofile from '../components/tenantComponents/Editprofile';


const Landlordprofilepage = () => {
  // Replace these with actual user data retrieved from your backend or state management
  const [addChangePassword, setChangePasswordOpen] = useState();
  const [addEditProfile, setEditProfileOpen] = useState();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: 'john_doe',
    phonenumber:'XXXXXXXXX',
    email: 'john.doe@example.com',
    profilePicture: 'https://randomuser.me/api/portraits/men/15.jpg',
  });

  const handleChangePassword = () => {
    setChangePasswordOpen(true)
  }

  const handleClosePopup = () => {
    setChangePasswordOpen(false);
  };

  const handleEditProfile = () => {
    setEditProfileOpen(true)
  }

  const handleClosePopupEP = () => {
    setEditProfileOpen(false);
  };

  const handleOverallRevenue = () => {
    // Implement the overall revenue caluculator here
    console.log('View changes in overall revenue');
    navigate('/landlord/Overallrevenue')
  };

  const handleTotalUnitsOwned = () => {
    // page showing table of all units owned
    console.log('View all units owned');
    navigate('/landlord/unitOwned')
  };

  return (
    <div>
    <NavbarLandlord/>
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
              <button type='submit' onClick={handleOverallRevenue}>Overall Revenue</button>
              <button type='submit' onClick={handleTotalUnitsOwned}>Units Owned</button>
              <button type='submit' onClick={handleChangePassword}>Change Password</button>
          </div>
        </div>
      </div>
      <CustomPopup open={addChangePassword} onClose={handleClosePopup} modal>
        <Passwordchange onClose={handleClosePopup}  />
      </CustomPopup>
      <CustomPopup open={addEditProfile} onClose={handleClosePopupEP} modal>
        <Editprofile onClose={handleClosePopupEP}  />
      </CustomPopup>
    </div>
  );
};

export default Landlordprofilepage;
