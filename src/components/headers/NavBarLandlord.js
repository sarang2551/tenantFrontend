import React,{useState} from 'react'; 
import { 
Nav, 
NavLink, 
Bars, 
NavMenu, 
NavBtn, 
NavBtnLink, 
} from './NavElements'; 
import NotifBar from '../notifBar/NotifBar'; 
import tableIcons from '../LandlordComponents/MaterialIconComponents'; 
import "./assets/css/style.css"

const NavbarLandlord = () => { 

    const  [notifOpen, setNotifOpen] = useState(false) 
    const toggleNotifBar = () =>{ 
        setNotifOpen(!notifOpen); 
        console.log(notifOpen) 
    } 
    return ( 
        <nav className="nav flex-between"> 
      <div className="nav__menu-wrapper flex"> 

        <div className="nav__menu flex-between"> 
          <div className="nav__menu-list flex"> 
            <div className="nav__item nav__item--dropdown"> 
              <a href="/" className="nav__link">Home</a> 

              <div className="nav__dropdown with-icons"> 
              </div> 
            </div> 
            <div className="nav__item nav__item--dropdown"> 
              <a href="#" className="nav__link">Tenant Requests</a> 


            </div> 
            <div className="nav__item"> 
              <a href="#" className="nav__link">Quotations</a> 
            </div> 
            <div className="nav__item"> 
              <a href="#" className="nav__link">Profile</a> 
            </div> 
          </div> 
          <div className="nav__item"> 
              <a href="/TenantInformationPage" className="nav__link">Tenant Information</a> 
            </div> 
        </div> 
      </div> 

      <div className="nav__overlay"></div> 
    </nav> 
    ) 
}; 
export default NavbarLandlord;