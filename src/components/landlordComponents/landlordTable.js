import React from "react";
import MaterialTable from "material-table";
import tableIcons from "../tenantComponents/MaterialIconComponents";
import Popup from "reactjs-popup";
import axios from "axios";

const LandlordServiceTicketTable = () => {
    const [infoTicketOpen, setInfoTicketOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState (false);
    const [data,setData] = useState([])

    const fetchData = async () => {
        try {
          const userID = "64873c12bd2e5989a5e90e1c" /** TODO: get ID from session */
          const response = await axios.get(`http://localhost:8000/landlord/getAllServiceTickets/${userID}`)
          var data = response.data 
          setData(data);
        } catch (error) {
          console.error('Error fetching data:', error); /**TODO: Display an error on the UI instead */
        }
      };

    const handleInfoTicket = (ticketData) => {
        setSelectedTicket(ticketData);
        setInfoTicketOpen(true)
        
      }
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
  )


}

export default LandlordServiceTicketTable;