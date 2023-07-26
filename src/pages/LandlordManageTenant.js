import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import tableIcons from "../components/tenantComponents/MaterialIconComponents";
import AddBuildForm from "../components/landlordComponents/AddBuildForm";
import Popup from "reactjs-popup";
import {Link, createSearchParams, useNavigate} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import NavbarLandlord from "../components/headers/NavBarLandlord";

const LandlordManageTenantsPage = () => {
    const navigate = useNavigate()
    const [data,setData] = useState([])
    const [buildFormOpen,setBuildFormOpen] = useState(false)
    const handleAddBuilding = async() =>{
        setBuildFormOpen(true)
    }
    const handleClosePopup = ()=>{
        setBuildFormOpen(false)
    }
    const handleDeleteBuilding = ()=>{
            /**TODO */
    }

    const fetchData = async() => {
        const userID = "647f393928c6e292aebd9999"
        const response = await axios.get(`http://localhost:8000/landlord/buildingsOwned/${userID}`)
        var data = response.data
        if(data.status === 200){
            setData(data.buildings)
        } else {
            console.log("Error getting buildings") /** TODO: Display error component */
        }
    }
    useEffect(()=>{
        try{
            fetchData()
        } catch(error){
            console.log(`Error getting building data`)
        }
        
    },[])

    const columns = [
        { title: 'Building Name', field: 'buildingName',fontFamily:'Calibri'},
        { title: 'Address', field: 'address', align:'center' },
        {
          title: 'Details', align:'center',
          render: (rowData) => (
            <Link to="/landlord/buildingManage" state={{ rowData }}>
              Manage Tenants
            </Link>
          ),},
          {title: "Actions", align:'center',
          field: "actions",
          sorting: false,
          cellStyle: {
            paddingLeft: "16px", 
          },
          render: (rowData) => (
            <div>
            <IconButton onClick={() => handleDeleteBuilding(rowData)}>
                <DeleteIcon />
            </IconButton>
        </div>
        ),}
      ];


    return (
        <div>
            <NavbarLandlord/>
            <div className = "App" >
            <h2 style={{textAlign:"center",fontSize:25,marginTop:50}}>
                Manage Buildings
            </h2>
            <Grid container spacing ={0}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
            <MaterialTable mt={90}
            title={"Buildings Information"}
            data={data}
            columns={columns}
            icons={tableIcons}
            options = {{
                selection:true,
                headerStyle: { background: "lightgrey"},
                exportButton:true,
                exportAllData:true,
                actionsColumnIndex:-1,
                actionsCellStyle: {
                  paddingLeft: "16px", 
                  textAlign: "right", 
              },
            }}
            actions={[
                {
                  icon: tableIcons.Add,
                  tooltip: "Add Building",
                  isFreeAction: true,
                  onClick: (event) => handleAddBuilding()
                },
                
              ]}
           
            />

      </Grid>
      <Grid item xs={1}></Grid>
        </Grid>
        <Popup
  open={buildFormOpen}
  onClose={handleClosePopup}
  modal
  contentStyle={{
    maxWidth: "400px",
    maxHeight: "500px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }}
  overlayStyle={{
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  }}
>
  <AddBuildForm onClose={handleClosePopup} onAddition={fetchData} />
</Popup>

    </div>
</div>
    )
}

export default LandlordManageTenantsPage;

