import React, { useState } from 'react';
import MaterialTable from 'material-table';
import tableIcons from './MaterialIconComponents'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ServiceTicketForm from './STForm';
// import ServiceTicketStatus from './STStatus';
import ServiceTicketCard from './STCard';

const ServiceTicketHistoryTable = (props) => {
  const [addTicketOpen, setAddTicketOpen] = useState(false);
  const [infoTicketOpen, setInfoTicketOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState (false);
    const handleAddTicket = () => {
      setAddTicketOpen(true)
    }

    const handleInfoTicket = (ticketData) => {
      setSelectedTicket(ticketData);
      setInfoTicketOpen(true)
      
    }
    const data = [
        // name: Service Ticket Name
        // details: Ticket information
        {name: 'Fix Aircon', surname: 'Baran',
      ticketData:{
        ticketNameInfo:'Fix Aircon',
        description:' aircon spoil',
        landlordName: ' Franco',
        documents:['file1','file2'],
        progressStage: 3
      }
    },
        {name: 'Fix Plumbing', surname: 'Baran',
      ticketData:{
        ticketNameInfo:'Fix Plumbing',
        description:' pipe burst',
        landlordName: ' Alice',
        documents:['file3','file6'],
        progressStage: 2
      }}
        
    ]
    const columns = [
        { title: "Name", field: "name" },
        { title: "Surname", field: "surname", render:(rowData)=>
        <div>
          <button className='StatusInfo' onClick={() => handleInfoTicket(rowData.ticketData)}
            >Check Status</button>{infoTicketOpen }
            </div>
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
          tooltip: "Delete User",
          onClick: (event, rowData) => alert("Deleting service ticket")
        },
        {
          icon: tableIcons.Add,
          tooltip: "Add User",
          isFreeAction: true,
          onClick: (event) => handleAddTicket()
        },
        
      ]}
      options={{
        search: true,
        paging: true,
      }}
    />
     <Popup open={addTicketOpen} onClose={() => setAddTicketOpen(false)} modal>
        <ServiceTicketForm />
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
