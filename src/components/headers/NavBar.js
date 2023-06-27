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

const Navbar = () => {

    const  [notifOpen, setNotifOpen] = useState(false)
    const toggleNotifBar = () =>{
        setNotifOpen(!notifOpen);
        console.log(notifOpen)
    }
    
    return (
    	<>
    	<Nav>
    		<Bars />

    		<NavMenu>
    		<NavLink to='/' activeStyle>
    			Home
    		</NavLink>
    		<NavLink to='/about' activeStyle>
    			About
    		</NavLink>
    		<NavLink to='/serviceTicketPage' activeStyle>
    			ServiceTicket
    		</NavLink>

            <NavBtn onClick={toggleNotifBar}>
            <tableIcons.Notifications
              style={{
                color: notifOpen ? 'black' : 'white',
              }}
            />
          </NavBtn>
            {notifOpen && <NotifBar props={notifOpen}/>}
    		</NavMenu>
    		
    	</Nav>
    	</>
    );
};

export default Navbar;
