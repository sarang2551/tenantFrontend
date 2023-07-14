import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import tableIcons from './MaterialIconComponents'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ServiceTicketForm from './STForm';
// import ServiceTicketStatus from './STStatus';
import axios from 'axios';
import ServiceTicketCard from './STCard';

import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

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
      progressStage: 3,
      images: [
        'https://en.kepoper.com/seventeen-hoshi-profile-facts-and-tmi/',
        'https://www.wikidata.org/wiki/Q21825470'
      ]

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
               <Popup open={addTicketOpen} modal>
                  <ServiceTicketForm />
                </Popup>
          
                {selectedTicket && (
                  <Popup open={infoTicketOpen} onClose={() => setInfoTicketOpen(false)} modal>
                  <ServiceTicketCard ticketData = {selectedTicket} />
                </Popup>
          
                )}
              <div>
              
              </div>
          
              </div>
           
          
            );
            
          };
        
   
  
  
 
  
//   const [addTicketOpen, setAddTicketOpen] = useState(false);
//   const [infoTicketOpen, setInfoTicketOpen] = useState(false);
//   const [selectedTicket, setSelectedTicket] = useState (false);
//   const [data,setData] = useState([])

//     const handleAddTicket = () => {
//       setAddTicketOpen(true)
//     }
//     const handleClosePopup = () => {
//         setAddTicketOpen(false);
//       };
//     const handleInfoTicket = (ticketData) => {
//       setSelectedTicket(ticketData);
//       setInfoTicketOpen(true)
//     }

//     useEffect(() => {
//         // Fetch data from the API endpoint
//         const fetchData = async () => {
//           try {
//             const userID = "64875a59bd2e5989a5e90e1d" /** TODO: get ID from session */
//             const response = await axios.get(`http://localhost:8000/tenant/getAllServiceTickets/${userID}`)
//             var data = response.data 
//             console.log("Data retrieved")
//             console.log(data)
//             setData(data);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
    
//         fetchData();
//       }, []);

      

//     const data = [
//         // name: Service Ticket Name
//         // details: Ticket information
//         {title: 'Air conditioning repair', unit: 'B01',},
//         {title: 'Washing Machine replacement', unit: 'B02'}
        
//     ]
//     const columns = [
//         { title: "Title", field: "title" },
//         {title:"Unit", field:"unitID"},
//         { title: "Status", render:(rowData)=>{
//             return <div>
//             <button className='StatusInfo' onClick={()=>handleInfoTicket(data[rowData.tableData.id])}>
//               Check Status</button>
//               {/* {infoTicketOpen && <ServiceTicketCard props = {rowData}/>} */}
//               </div>
//         }
        
//         }
      
//   ];

//   return (
//     <div>
//     <MaterialTable
//       title="Service Tickets History"
//       columns={columns}
//       data={data}
//       icons={tableIcons}
//       actions={[
//         {
//           icon: tableIcons.Delete,
//           tooltip: "Delete User",
//           onClick: (event, rowData) => alert("Deleting service ticket")
//         },
//         {
//           icon: tableIcons.Add,
//           tooltip: "Add User",
//           isFreeAction: true,
//           onClick: (event) => handleAddTicket()
//         },

        
//       ]}
//       options={{
//         search: true,
//         paging: true,
//       }}
//     />
//      <Popup open={addTicketOpen} onClose={handleClosePopup} modal>
//         <ServiceTicketForm onClose={handleClosePopup}/>
//       </Popup>

//       {selectedTicket && (
//         <Popup open={infoTicketOpen} onClose={() => setInfoTicketOpen(false)} modal>
//         <ServiceTicketCard ticketData = {selectedTicket}/>
//       </Popup>

//       )}
//     <div>
//     <ImageUpload/>
//     </div>

//     </div>
 

//   );
  
// };

export default ServiceTicketHistoryTable;
