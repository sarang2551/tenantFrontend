
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
import tableIcons from '../tenantComponents/MaterialIconComponents';
import "./assets/css/style.css"



const NavbarLandlord = () => { 

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear user session or local storage)
  
    // After performing the logout action, navigate to the login page
    // Replace '/login' with the actual URL of your login page
    window.location.href = '/';
  };
  

    const  [notifOpen, setNotifOpen] = useState(false) 
    const toggleNotifBar = () =>{ 
        setNotifOpen(!notifOpen); 
  
      

    } 
    return ( 
      <nav className="nav">
      <div className="nav__menu-wrapper flex-center">
        <div className="nav__menu">
          <div className="nav__menu-list flex" style={{ justifyContent: 'center' }}>
            <div className="nav__item">
              <a href="/landlord/home" className="nav__link">Home</a>
              <div className="nav__dropdown with-icons"></div>
            </div>
            <div className="nav__item">
              <a href="/landlord/serviceTicketPage" className="nav__link">Tenant Requests</a>
            </div>
            <div className="nav__item">
              <a href="#" className="nav__link">Quotations</a>
            </div>
            <div className="nav__item">
              <a href="/landlord/manageTenants" className="nav__link">Manage Tenants</a>
            </div>

              <div className="nav__icon-item">
                <tableIcons.Notifications onClick={toggleNotifBar} style={notifOpen ? { color: 'lightgreen', marginRight: '20px' } : { marginRight: '20px' }} />
                <tableIcons.Logout onClick={handleLogout} />
        
            </div>
          </div>
        </div>
      </div>
      {notifOpen && <NotifBar props={notifOpen} />}
    </nav>
  );
};


export default NavbarLandlord;




// import React,{useState} from 'react'; 
// import { 
// Nav, 
// NavLink, 
// Bars, 
// NavMenu, 
// NavBtn, 
// NavBtnLink, 
// } from './NavElements'; 
// import NotifBar from '../notifBar/NotifBar'; 
// import tableIcons from '../tenantComponents/MaterialIconComponents';
// import "./assets/css/style.css"

// const NavbarLandlord = () => { 

//     const  [notifOpen, setNotifOpen] = useState(false) 
//     const toggleNotifBar = () =>{ 
//         setNotifOpen(!notifOpen); 
//     } 
//     return ( 
//         <>
//         <nav className="nav flex-between"> 
//       <div className="nav__menu-wrapper flex"> 

//         <div className="nav__menu flex-between"> 
//           <div className="nav__menu-list flex"> 
//             <div className="nav__item "> 
//               <a href="/landlord/home" className="nav__link">Home</a> 

//               <div className="nav__dropdown with-icons"> 
//               </div> 
//             </div> 
//             <div className="nav__item "> 
//               <a href="/landlord/serviceTicketPage" className="nav__link">Tenant Requests</a> 
//             </div> 
//             <div className="nav__item"> 
//               <a href="#" className="nav__link">Quotations</a> 
//             </div> 
//             <div className="nav__item"> 
//               <a href="/landlord/manageTenants" className="nav__link">Manage Tenants</a> 
//             </div> 
//             <div className="nav__item"> 
//             <tableIcons.Notifications onClick={toggleNotifBar} style={notifOpen ? { color: 'lightgreen' } : {}}/>
//             </div> 
//           </div> 
        
//         </div> 
//       </div> 

//       <div className="nav__overlay"></div> 
//     </nav> 
//     {notifOpen && <NotifBar props={notifOpen}/>}
//     </>
//     ) 
// }; 
// export default NavbarLandlord;