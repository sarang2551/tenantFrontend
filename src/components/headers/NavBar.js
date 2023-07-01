import React,{useState} from 'react'; 
// import { 
// Nav, 
// NavLink, 
// Bars, 
// NavMenu, 
// NavBtn, 
// NavBtnLink, 
// } from './NavElements'; 
import NotifBar from '../notifBar/NotifBar'; 
import tableIcons from '../tenantComponents/MaterialIconComponents'; 
import "./assets/css/style.css"
 
const Navbar = () => { 
 
    const  [notifOpen, setNotifOpen] = useState(false) 
    const toggleNotifBar = () =>{ 
        setNotifOpen(!notifOpen); 
    } 
    return ( 
        <>
        <nav className="nav flex-between"> 
      <div className="nav__menu-wrapper flex"> 
        <div className="nav__menu flex-between"> 
          <div className="nav__menu-list flex"> 
            <div className="nav__item"> 
              <a href="/" className="nav__link">Home</a> 
            </div> 
            <div className="nav__item"> 
              <a href="/serviceTicketPage" className="nav__link">Make Requests</a> 
            </div> 
            <div className="nav__item"> 
              <a href="/about" className="nav__link">About</a> 
            </div> 
            <div className="nav__item"> 
              <a href="#" className="nav__link">Profile</a> 
            </div> 
            <div className="nav__item"> 
            <tableIcons.Notifications onClick={toggleNotifBar} style={notifOpen ? { color: 'lightgreen' } : {}}/>
            </div> 
            </div> 
            </div> 
        </div> 
      
        </nav> 
        {notifOpen && <NotifBar props={notifOpen}/>}
        </>
        
    ) 
}; 
 
export default Navbar;