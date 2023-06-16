import React, { useState } from 'react';
import MaterialTable from 'material-table';
import tableIcons from './MaterialIconComponents'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ServiceTicketForm from './STForm';

const ServiceTicketHistoryTable = () => {
    const [isOpen,setOpen] = useState(false)
    const handleAddTicket = () => {
        setOpen(true)
    }
    const data = [
        // name: Service Ticket Name
        // details: Ticket information
        {name: 'Mehmet', surname: 'Baran',},
        {name: 'Zerya Betül', surname: 'Baran'}
        
    ]
    const columns = [
        { title: "Name", field: "name" },
        { title: "Surname", field: "surname", render:(rowData)=><button>Click this</button> },
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
    <Popup open={isOpen} onClose={()=>setOpen(false)} modal>
        <ServiceTicketForm/>
    </Popup>
    </div>

  );
  
};

export default ServiceTicketHistoryTable;
