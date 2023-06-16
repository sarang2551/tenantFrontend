import React, {useState} from 'react'
import Navbar from '../components/headers/NavBar';
import ServiceTicketForm from '../components/tenantComponents/STForm';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const ServiceTicketPage = (props) => {

    return (
        <div>
        <Navbar/>
        <h1>
        ServiceTicketPage
        </h1>
        <Popup trigger={<button className="button"> Add Service Ticket </button>} modal>
        <ServiceTicketForm/>
        </Popup>
        
    </div>
    )
}
export default ServiceTicketPage;