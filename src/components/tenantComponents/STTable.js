import React, { useState } from 'react';
import MaterialTable from 'material-table';
import tableIcons from './MaterialIconComponents'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ServiceTicketForm from './STForm';
// import ServiceTicketStatus from './STStatus';
import ServiceTicketCard from './STCard';

const ServiceTicketHistoryTable = () => {
  const [addTicketOpen, setAddTicketOpen] = useState(false);
  const [infoTicketOpen, setInfoTicketOpen] = useState(false);
    const handleAddTicket = () => {
      setAddTicketOpen(true)
    }

    const handleInfoTicket = () => {
      setInfoTicketOpen(true)
    }
    const data = [
        // name: Service Ticket Name
        // details: Ticket information
        {name: 'Mehmet', surname: 'Baran',},
        {name: 'Zerya Betül', surname: 'Baran'}
        
    ]
    const columns = [
        { title: "Name", field: "name" },
        { title: "Surname", field: "surname", render:(rowData)=>
        <div>
          <button className='StatusInfo' onClick={handleInfoTicket}>
            Check Status</button>{infoTicketOpen && <ServiceTicketCard />}
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

      <Popup open={infoTicketOpen} onClose={() => setInfoTicketOpen(false)} modal>
        <ServiceTicketCard />
      </Popup>

    </div>

  );
  
};

export default ServiceTicketHistoryTable;
