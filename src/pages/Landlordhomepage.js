import React,{useState} from 'react' 
import NavbarLandlord from '../components/headers/NavBarLandlord' 
import "../components/headers/assets/css/style.css" 
import "../components/landlordComponents/LandlordChecklist.css" 
import LandlordPie from '../components/landlordComponents/LandlordPie'
import Checklist from '../components/landlordComponents/LandlordChecklist'



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
              <section class="home-collection">
                <div class="home-content">
                  <LandlordPie/>
                </div>
                <div class="home-container4">
                </div>
              </section>
            </div> 
            <div class ="hero_right">
              <section class="home-collection-right">
              <div class="home-main">
  
                <div class="home-container3">
                <Checklist/>
                <div className="header">
                  
                </div>

                    
              </div> 
              </div>
                
              </section>
            </div>
        </div> 
  </div>) 
} 
export default LandlordHome