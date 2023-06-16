//import './st_page_style.css'
import React, {useState} from 'react'
import Navbar from '../components/headers/NavBar';
import ServiceTicketForm from '../components/tenantComponents/STForm';

import ServiceTicketHistoryTable from '../components/tenantComponents/STTable';


const ServiceTicketPage = (props) => {
    // get all tenant service tickets

    return (
        <div>
        <Navbar/>
        <h1>
        ServiceTicketPage
        </h1>
        <ServiceTicketHistoryTable/>
    </div>
    )
}
export default ServiceTicketPage;