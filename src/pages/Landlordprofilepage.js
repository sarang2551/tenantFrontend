import React, { useEffect, useState } from 'react';
import NavbarLandlord from '../components/headers/NavBarLandlord' 
import { useNavigate } from "react-router-dom";
import "../components/headers/assets/css/style.css" 
import CustomPopup from '../components/landlordComponents/CustomPopup';
import Passwordchange from '../components/Passwordchange';
import Editprofile from '../components/tenantComponents/Editprofile';
import "./profilepage.css"
import axios from 'axios';
import { useError } from '../components/errorBox';

const Landlordprofilepage = () => {
  // Replace these with actual user data retrieved from your backend or state management
  const [addChangePassword, setChangePasswordOpen] = useState();
  const [addEditProfile, setEditProfileOpen] = useState();
  const navigate = useNavigate();
  const showError = useError()
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
  const fetchData = async () => {
    try{
      const userID = sessionStorage.getItem('userID');
      const response  = await axios.get(`http://localhost:8000/landlord/getUserInfo/${userID}`)
      if(response.status === 200){
        const userObject = response.data.userData
        const processedImage = await Promise.all([userObject?.profilePic].map(convertToImage));
        userObject.profilePic = processedImage[0]
        setUser(userObject)
      } else {
      showError("Error getting user data")
      }
    }catch(err){
        console.log(`Error getting userInfo: ${err}`)
    }
    
  }

  useEffect(()=>{
    fetchData()
  },[])

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
    fetchData()
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
            <h2>{user.username}</h2>
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
        <div className="sidebar">
          <div className="button-container-profile">
              <button type='submit' onClick={handleEditProfile}>Edit Profile</button>
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
