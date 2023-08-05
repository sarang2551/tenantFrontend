import React,{useState,useEffect} from "react";
import MaterialTable from "material-table";
import tableIcons from "../tenantComponents/MaterialIconComponents";
import Popup from "reactjs-popup";
import axios from "axios";
import ServiceTicketCard from "../tenantComponents/STCard";
import Grid from "@material-ui/core/Grid";
import CustomPopup from "./CustomPopup";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import"./style_form.css";
import { useError } from "../errorBox";
import { useSuccess } from "../successBox";

const LandlordServiceTicketTable = () => {
    const [infoTicketOpen, setInfoTicketOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState (false);
    const [ popupData, setPopupData] = useState();
    const [data,setData] = useState([])
    const { showError } = useError();
    const { showSuccess } = useSuccess();

    const handleDeleteTicket = ()=>{
      /**TODO */
}
    const fetchData = async () => {
        try {
          const userID = sessionStorage.getItem("userID") 
          const response = await axios.get(`http://localhost:8000/landlord/getAllServiceTickets/${userID}`)
          var data = response.data 
          setData(data);
        } catch (error) {
          console.error('Error fetching data:', error); /**TODO: Display an error on the UI instead */
          showError(('Error fetching data:', error), 3000);
        }
      };

      useEffect(() => {
        // Fetch data from the API endpoint
        fetchData();
      }, [data]);

    const handleInfoTicket = (ticketData) => {
        setSelectedTicket(ticketData);
        setInfoTicketOpen(true)

      };

    const handleClosePopup= () => {
        setInfoTicketOpen(false)
        setPopupData();
      }

    const columns = [
        { title: "Title", field: "title" },
        {title:"Unit", field:"unitName" },
        {title:"Start Date", field:"startDate"},
        { title: "Status",render:(rowData)=>{
            return <div>
            <button className='StatusInfo' onClick={()=>handleInfoTicket(data[rowData.tableData.id])}>
              Check Status</button>
              {/* {infoTicketOpen && <ServiceTicketCard props = {rowData}/>} */}
              </div>
        },},
        {title: "Actions", align:'center',
        field: "actions",
        sorting: false,
        cellStyle: {
          paddingLeft: "0px", 
        },
        render: (rowData) => (
          <div>
          <IconButton onClick={() => handleDeleteTicket(rowData)}>
              <DeleteIcon />
          </IconButton>
      </div>
      ),}
    ];

      

  return (
    <div>
    <div className = "App" >
        <h2 style={{textAlign:"center",fontFamily:"sans-serif",fontSize:25,marginTop:50}}>
            Service Tickets History
        </h2>
     <Grid container spacing={0}>
      <Grid item xs={1}></Grid>
        <Grid item xs={10}>
        <div style={{ overflow: "hidden" }}>
        <MaterialTable
         mt={80}
          title="Service Tickets History"
          columns={columns}
          data={data}
          icons={tableIcons}
          options={{
            search: true,
            paging: true,
            sorting: true,
            selection:true,
            exportButton:true,
            exportAllData:true,
            headerStyle: { background: "#fff8e1"}, 
          }}
          onRowClick={(event, rowData) => handleInfoTicket(rowData)}
        />
         </div>
        </Grid>
        <Grid item xs={1}>
        {selectedTicket && (
          <CustomPopup open={infoTicketOpen} onClose={handleClosePopup} contentStyle={{
            width: '50%', // Set the desired width for the Popup (adjust as needed)
            height: '50vh', // Set the desired height for the Popup (adjust as needed)
            overflow: 'auto', // Add overflow:auto to enable scrolling if the content overflows the Popup's dimensions
          }} modal>
          <ServiceTicketCard _id = {selectedTicket._id} onPopupClose={handleClosePopup} />
        </CustomPopup>
        )}
        </Grid>
      </Grid>
    </div>
  </div>
);
};



export default LandlordServiceTicketTable;

