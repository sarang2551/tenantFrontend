import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import tableIcons from './MaterialIconComponents'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ServiceTicketForm from './STForm';
// import ServiceTicketStatus from './STStatus';
import axios from 'axios';
import ServiceTicketCard from './STCard';

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
        const userID = "64ad758ce3307f7723aa6330" /** TODO: get ID from session */
        const response = await axios.get(`http://localhost:8000/tenant/getAllServiceTickets/${userID}`)
        var data = response.data 
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error); /**TODO: Display an error on the UI instead */
      }
    };
    const handleDeleteTicket = async(rowData) => {
      
      const response = await axios.delete("http://localhost:8000/tenant/deleteServiceTicket",{data:rowData})
      var data = response.data
      if(data.status === 200){
          fetchData()
          console.log(data.message)
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
      }, []);
    // const data = [
    //     // name: Service Ticket Name
    //     // details: Ticket information
    //     {title: 'Air conditioning repair', unit: 'B01',},
    //     {title: 'Washing Machine replacement', unit: 'B02'}
    // ]
    const columns = [
        { title: "Title", field: "title" },
        {title:"Unit", field:"unitID"},
        { title: "Status", render:(rowData)=>{
            return <div>
            <button className='StatusInfo' onClick={()=>handleInfoTicket(data[rowData.tableData.id])}>
              Check Status</button>
              {/* {infoTicketOpen && <ServiceTicketCard props = {rowData}/>} */}
              </div>
        }
        
        }
      
  ];

  return (
    <div>
    <MaterialTable
      title="Service Tickets History"
      columns={columns}
      data={data}
      icons={tableIcons}
      actions={[
        {
          icon: tableIcons.Delete,
          tooltip: "Delete Ticket",
          onClick: (event, rowData) => handleDeleteTicket(rowData).then(()=>fetchData())
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
        paging: true,
      }}
    />
     <Popup open={addTicketOpen} onClose={handleClosePopup} modal>
        <ServiceTicketForm onClose={handleClosePopup} onAddition={fetchData}/> 
      </Popup>

      {selectedTicket && (
        <Popup open={infoTicketOpen} onClose={() => setInfoTicketOpen(false)} modal>
        <ServiceTicketCard ticketData = {selectedTicket}/>
      </Popup>

      )}

      

    </div>

  );
  
};

export default ServiceTicketHistoryTable;
