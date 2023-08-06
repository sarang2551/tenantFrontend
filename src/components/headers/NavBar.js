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
import {useNavigate} from 'react-router-dom'
import anacle from "./assets/images/anacle.jpg"


const Navbar = () => {
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate()
  const toggleNotifBar = () => {
    setNotifOpen(!notifOpen);
  };
  const handleLogout = ()=>{
    sessionStorage.clear()
    navigate("/")
  }
  return (
      <nav className="nav">
      <div className="nav__menu-wrapper flex-center">

      <div className="nav__item" >
          <img src={anacle} alt="Logo" className="nav__logo-image" />
          <span className="nav__portal-text">Tenant Portal</span>
        </div>
        <div className="nav__menu">
            <div className="nav__menu-list flex" style={{ justifyContent: 'left', marginLeft:'150px' }}>
              <div className="nav__item">
                <a href="/tenant/home" className="nav__link">Home</a>
              </div>
              <div className="nav__item">
                <a href="/serviceTicketPage" className="nav__link">
                  Make Requests
                </a>
              </div>
              <div className="nav__item">
                <a href="/tenant/profilepage" className="nav__link">
                  Profile
                </a>
              </div>
              <div className="nav__item">
                <tableIcons.Notifications
                  onClick={toggleNotifBar}
                  style={notifOpen ? { color: 'lightgreen' } : {}}
                />
              </div>
              <div className="nav__icon-item"><tableIcons.Logout onClick={handleLogout} /></div>
            </div>
          </div>
        </div>
     
      {notifOpen && <NotifBar props={notifOpen} />}
      </nav>
  );
};

export default Navbar;  
