import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import tableIcons from './MaterialIconComponents'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ServiceTicketForm from './STForm';
// import ServiceTicketStatus from './STStatus';
import axios from 'axios';
import ServiceTicketCard from './STCard';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css"
import 'swiper/css/scrollbar';
import {Scrollbar,Mousewheel} from "swiper/modules"
import Ticket from ".././STTicketsNew"


const ServiceTicketHistoryTable = (props) => {
  const [addTicketOpen, setAddTicketOpen] = useState(false);
  const [infoTicketOpen, setInfoTicketOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState (false);
  const [data,setData] = useState([])

    const handleAddTicket = () => {
      setAddTicketOpen(true)
    }
    const fetchData = async () => {
      try {
        const userID = sessionStorage.getItem('userID')
        const response = await axios.get(`http://localhost:8000/tenant/getAllServiceTickets/${userID}`)
        var data = response.data 
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error); /**TODO: Display an error on the UI instead */
      }
    };
    const handleDeleteTicket = async(rowData) => {
      const idx = rowData.tableData.id
      const response = await axios.delete("http://localhost:8000/tenant/deleteServiceTicket",{data:rowData})
      var res_data = response.data
      if(res_data.status === 200){
        setData([...data.splice(0,idx),...data.splice(idx,data.length)])
      } else {
        console.log(data) /** TODO: Add UI Error component */
      }
    }

    const handleClosePopup = () => {
        setAddTicketOpen(false);
      };
    const handleInfoTicket = (ticketData) => {
      setSelectedTicket(ticketData);
      setInfoTicketOpen(true)

    }
    useEffect(() => {
        // Fetch data from the API endpoint
        fetchData();
      }, [data]);

    const columns = [
      { title: "Title", field: "title" },
      { title:"Date", field:"startDate"},
      { title: "Unit", field: "Status Check", render:(rowData)=>
      <div>
        <button className='StatusInfo' onClick={() => handleInfoTicket(rowData)}
            >Check Status</button>
            </div>
        }];

  return (
    <div>
    <Swiper
      spaceBetween={5}
      slidesPerView={5}
      modules={[Scrollbar,Mousewheel]}
      mousewheel={{
        enable: true,
        sensitivity: 10,}
      }
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data.map((ticketData,idx)=><SwiperSlide>
        <Ticket STData={{idx,...ticketData}}/>
      </SwiperSlide>)}
    </Swiper>
    <br style={{marginTop:"20px"}}/>
    <MaterialTable
      title="Service Tickets History"
      columns={columns}
      data={data}
      icons={tableIcons}
      actions={[
        {
          icon: tableIcons.Delete,
          tooltip: "Delete Ticket",
          onClick: (event, rowData) => handleDeleteTicket(rowData)
        },
        {
          icon: tableIcons.Add,
          tooltip: "Add Ticket",
          isFreeAction: true,
          onClick: (event) => handleAddTicket()
        },
        
      ]}
      options={{
        search: true,
      }}
    />
     <Popup open={addTicketOpen} onClose={handleClosePopup} modal>
        <ServiceTicketForm onClose={handleClosePopup} onAddition={fetchData}/> 
      </Popup>

      {selectedTicket && (
        <Popup open={infoTicketOpen} onClose={() => setInfoTicketOpen(false)} contentStyle={{
          width: '50%', // Set the desired width for the Popup (adjust as needed)
          height: '50vh', // Set the desired height for the Popup (adjust as needed)
          overflow: 'auto', // Add overflow:auto to enable scrolling if the content overflows the Popup's dimensions
        }} modal>
        <ServiceTicketCard ticketData = {selectedTicket}/>
      </Popup>
      )}
    </div>
  );
};

export default ServiceTicketHistoryTable;
