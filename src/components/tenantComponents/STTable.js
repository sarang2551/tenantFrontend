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


const Title = styled.h2`
  text-align: center;
  font-family: sans-serif;
  font-size: 25px;
  margin-top: 20px;
`;

const TicketsContainer = styled.div`
  padding: 10px;
`;

const ServiceTicketHistoryTable = (props) => {
  const [addTicketOpen, setAddTicketOpen] = useState();
  const [infoTicketOpen, setInfoTicketOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState (false);
  const [data,setData] = useState([])
  const { showError } = useError();
  const { showSuccess } = useSuccess();

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
        console.log(data) /** TODO: Add UI Error component */
        showError(data, 3000);
      }
    }
  



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
    <TicketsContainer>
      <Title>Service Tickets</Title>
      <Swiper
        spaceBetween={5}
        slidesPerView={5}
        modules={[Scrollbar, Mousewheel]}
        mousewheel={{ enable: true, sensitivity: 10 }}
        scrollbar={{ draggable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data.map((ticketData, idx) => (
          <SwiperSlide key={idx}>
            <Ticket STData={{ idx, ...ticketData }} />
          </SwiperSlide>
        ))}
      </Swiper>
      <br style={{ marginTop: '20px' }} />
      <MaterialTable mt={90}
        title="Service Tickets History"
        columns={columns}
        data={data}
        icons={tableIcons}
        actions={[
          {
            icon: tableIcons.Delete,
            tooltip: 'Delete Ticket',
            onClick: (event, rowData) => handleDeleteTicket(rowData),
          },
          {
            icon: tableIcons.Add,
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
          headerStyle: { background: 'lightgrey' },
        }}
      />
      <CustomPopup open={addTicketOpen} onClose={handleClosePopup} modal>
        <ServiceTicketForm onClose={handleClosePopup} onAddition={fetchData} />
      </CustomPopup>

      {selectedTicket && (
        <CustomPopup open={infoTicketOpen} onClose={() => setInfoTicketOpen(false)} modal>
          <ServiceTicketCard _id={selectedTicket._id} />
        </CustomPopup>
      )}
    </TicketsContainer>
  );
};
export default ServiceTicketHistoryTable;
