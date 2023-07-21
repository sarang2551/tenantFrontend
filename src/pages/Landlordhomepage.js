import React,{useState} from 'react' 
import NavbarLandlord from '../components/headers/NavBarLandlord' 

import "../components/headers/assets/css/style.css" 

function LandlordHome() { 

const  [notifOpen, setNotifOpen] = useState(false) 
    const toggleNotifBar = () =>{ 
        setNotifOpen(!notifOpen); 
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