import React from 'react' 
import NavbarLandlord from '../components/headers/NavBarLandlord' 
import axios from "axios" 
import "../components/headers/assets/css/style.css" 

function LandlordHome() { 
  const testingServer = async()=>{ 
    console.log("Clicked button") 
    const getTenant = { 
        name: 'test', 
        password: 'test123', 
      }; 
    await axios.post("http://localhost:8000/landlord/verifyLogin",getTenant).then(response => { 
        console.log('Response:', response.data); 
      }) 
      .catch(error => { 
        console.error('Error:', error); 
      }); 
  } 
  return ( 
  <div> 
  <NavbarLandlord/> 
  <div class="container hero"> 
            <div class="hero__left"> 
                <div class="hero__heading-wrapper"> 
                    <h1 class="hero__heading">hello hello&nbsp;hello</h1> 
                </div> 

                <div class="hero__subheading-wrapper"> 
                    <p> 
                        hello hello hello hello hello hello hello 
                        hello hello hello hello hello hello hello 
                        hello hello hello hello hello hello hello 
                        hello hello hello hello hello hello hello 
                    </p> 

                    <button class="button button--secondary">Learn more</button> 
                </div> 


            </div> 
        </div> 
  </div>) 
} 
export default LandlordHome