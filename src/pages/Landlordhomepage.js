import React,{useEffect, useState} from 'react' 
import NavbarLandlord from '../components/headers/NavBarLandlord' 
import "../components/headers/assets/css/style.css" 
import "../components/landlordComponents/LandlordChecklist.css" 
import Checklist from '../components/landlordComponents/LandlordChecklist'
import axios from 'axios'
import Pie from '../components/Pie'



function LandlordHome() { 

  return ( 
  <div> 
  <NavbarLandlord/> 
  <div class="container hero"> 
            <div class="hero__left"> 
              <section class="home-collection">
                <div class="home-content">
                 <Pie/>
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