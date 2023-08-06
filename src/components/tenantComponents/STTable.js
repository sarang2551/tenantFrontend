import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import tableIcons from './MaterialIconComponents'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ServiceTicketForm from './STForm';
import axios from 'axios';
import ServiceTicketCard from './STCard';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css"
import 'swiper/css/scrollbar';
import {Scrollbar,Mousewheel} from "swiper/modules"
import Ticket from ".././STTicketsNew"
import CustomPopup from '../landlordComponents/CustomPopup';
import styled from 'styled-components';
import { useError } from "../errorBox";
import { useSuccess } from "../successBox";
import FeedbackForm from '../feedbackForm';

import addTicket from "../headers/assets/images/addticket.png";

import './TicketsColumn.css';



const Title = styled.h2`
  text-align: center;
  font-family: sans-serif;
  font-size: 25px;
  margin-top: 20px;
`;

const TicketsContainer = styled.div`
  padding: 10px;
`;

const BoldTitle = styled.span`
  font-weight: bold;
  font-size: 25px;
`;

const ServiceTicketHistoryTable = (props) => {
  const [addTicketOpen, setAddTicketOpen] = useState();
  const [infoTicketOpen, setInfoTicketOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState (false);
  const [data,setData] = useState([]);
  const [currentFilter,setFilter] = useState("all");
  const [showFeedBack,setShowFeedback] = useState(false)
  const { showError } = useError();
  const { showSuccess } = useSuccess();

  const addticket= (
    <div
    style={{
      display: "flex",
      color: 'white',
      alignItems: "center",
      fontFamily: "Raleway",
      backgroundColor: "#fbc02d",
      fontSize: "20px",
      border: "4px solid #fbc02d",
      borderRadius: "10px", 
      padding: "5px 10px", 
    }}
  >
      <img src={addTicket} alt="Create ticket" style={{ marginRight: 8, height:20 }} />
      <span>Create ticket</span>
    </div>
  );

  
    const handleAddTicket = () => {
      setAddTicketOpen(true)
    }

    const handleClosePopup = () => {
      setAddTicketOpen(false);
    };
    const fetchData = async () => {
      try {
        const userID = sessionStorage.getItem('userID')
        const response = await axios.get(`http://localhost:8000/tenant/getAllServiceTickets/${userID}`)
        var data = response.data 
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error); /**TODO: Display an error on the UI instead */
        showError(('Error fetching data:', error), 3000);
      }
    };

    const handleDeleteTicket = async(rowData) => {
      const idx = rowData.tableData.id
      const response = await axios.delete("http://localhost:8000/tenant/deleteServiceTicket",{data:rowData})
      var res_data = response.data
      if(res_data.status === 200){
        setData([...data.splice(0,idx),...data.splice(idx,data.length)])
      } else {
        showError(data, 3000);
      }
    }

    const handleInfoTicket = (ticketData) => {
      setSelectedTicket(ticketData);
      setInfoTicketOpen(true)
    }
    const handleOpenFeedback = (rowData)=> {
      setSelectedTicket(rowData)
      setShowFeedback(true)
    }
    var filterd_data = data.filter((ticket) => {
      if (currentFilter === 'all') {
        return true; // Show all items
      } else if (currentFilter === 'current') {
        return ticket.progressStage == 0 || ticket.progressStage == 1; // Change 'status' to the relevant property in your data
      } else if (currentFilter === 'inProgress') {
        return ticket.progressStage == 2 || ticket.progressStage == 3; // Change 'status' to the relevant property in your data
      } else if (currentFilter === 'completed') {
        return ticket.progressStage >= 4; // Change 'status' to the relevant property in your data
      } else {
        return false; // Invalid filter, don't show any items
      }
    });

    useEffect(() => {
        // Fetch data from the API endpoint
        fetchData();
      }, [data]);

    const columns = [
      { title: "Title", field: "title" },
      { title:"Date", field:"startDate"},
      { title: "Unit", field: "Status Check", render:(rowData)=>
      <div>
        {rowData.progressStage < 4? <button className='StatusInfo' onClick={() => handleInfoTicket(rowData)}
            >Check Status</button> : 
            <button onClick={()=>handleOpenFeedback(rowData)}>
              Submit Feedback
            </button>
          }
            </div>
        }];

    const swiperStyle = {
      margin: "2% 5% 0 5%" ,
    }

    const serviceTicketStyle = {
      fontSize: "30px"
    }

    const materialTableStyle = {
      margin: "2% 5% 0 5%" ,
      fontSize: "15px",
    }

  return (

    <TicketsContainer>

      <Title>Service Tickets</Title>

      <div class="Ticketscolumn">
        <button class="currentbutton" onClick={()=>setFilter("all")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none" class="svg-icon"><g stroke-width="2" stroke-linecap="round" stroke="#fff"><rect y="5" x="4" width="16" rx="2" height="16"></rect><path d="m8 3v4"></path><path d="m16 3v4"></path><path d="m4 11h16"></path></g></svg>
              <span class="rentlabel">All Tickets</span>
            </button>
         <button class="currentbutton" onClick={()=>setFilter("current")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none" class="svg-icon"><g stroke-width="2" stroke-linecap="round" stroke="#fff"><rect y="5" x="4" width="16" rx="2" height="16"></rect><path d="m8 3v4"></path><path d="m16 3v4"></path><path d="m4 11h16"></path></g></svg>
              <span class="rentlabel">Current Tickets :</span>
          </button>
              <button class="progressbutton" onClick={()=>setFilter("inProgress")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none" class="svg-icon"><g stroke-width="2" stroke-linecap="round" stroke="#fff"><rect y="5" x="4" width="16" rx="2" height="16"></rect><path d="m8 3v4"></path><path d="m16 3v4"></path><path d="m4 11h16"></path></g></svg>
                <span class="rentlabel">In-Progress Tickets :</span>
              </button>
              <button class="completebutton" onClick={()=>setFilter("completed")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none" class="svg-icon"><g stroke-width="2" stroke-linecap="round" stroke="#fff"><rect y="5" x="4" width="16" rx="2" height="16"></rect><path d="m8 3v4"></path><path d="m16 3v4"></path><path d="m4 11h16"></path></g></svg>
                <span class="rentlabel">Completed Tickets :</span>
              </button>
                </div>
      <Swiper
      style={swiperStyle}
        spaceBetween={5}
        slidesPerView={5}
        modules={[Scrollbar, Mousewheel]}
        mousewheel={{ enable: true, sensitivity: 10 }}
        scrollbar={{ draggable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {filterd_data.map((ticketData, idx) => (
          <SwiperSlide key={idx}>
            <Ticket STData={{ idx, ...ticketData }} />
          </SwiperSlide>
        ))}
      </Swiper>

      <br style={{ marginTop: '20px' }} />

      <MaterialTable mt={90}
        style={materialTableStyle}
        title={<BoldTitle>Service Tickets History</BoldTitle>}
        columns={columns}
        data={filterd_data}
        icons={tableIcons}
        actions={[
          {
            icon: tableIcons.Delete,
            tooltip: 'Delete Ticket',
            onClick: (event, rowData) => handleDeleteTicket(rowData),
          },
          {
            icon: () => addticket,
            tooltip: 'Add Ticket',
            isFreeAction: true,
            onClick: (event) => handleAddTicket(),
          },
        ]}
        options={{
          search: true,
          paging: true,
          sorting: true,
          exportButton: true,
          exportAllData: true,
          headerStyle: { background: '#fff8e1' },
        }}
      />

      <Popup open={addTicketOpen} onClose={handleClosePopup} contentStyle={{
          width: '26%', // Adjust the width to a smaller value
          height: '44vh',
          overflow: 'auto',
          borderRadius: '15px',
        }} modal>
        <ServiceTicketForm onClose={handleClosePopup} onAddition={fetchData} />
      </Popup>

      
      <CustomPopup open={infoTicketOpen} onClose={() => setInfoTicketOpen(false)} contentStyle={{
          width: '50%', // Set the desired width for the Popup (adjust as needed)
          height: '50vh', // Set the desired height for the Popup (adjust as needed)
          overflow: 'auto', // Add overflow:auto to enable scrolling if the content overflows the Popup's dimensions
        }} modal>
        <ServiceTicketCard _id = {selectedTicket._id} onPopupClose={()=>setInfoTicketOpen(false)}/>
      </CustomPopup>
      <Popup open={showFeedBack} onClose={()=>setShowFeedback(false)} modal>
        <FeedbackForm ticketData={selectedTicket} onSubmission={()=>setShowFeedback(false)}/>
      </Popup>
    </TicketsContainer>
  );
};
export default ServiceTicketHistoryTable;