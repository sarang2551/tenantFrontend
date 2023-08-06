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
import CustomPopup from "../components/landlordComponents/CustomPopup";
import { useError } from "../components/errorBox";
import { useSuccess } from "../components/successBox";
import addBuilding from "../components/headers/assets/images/addbuilding.png";

const LandlordManageTenantsPage = () => {
    const navigate = useNavigate()
    const [data,setData] = useState([])
    const [buildFormOpen,setBuildFormOpen] = useState(false)
    const { showError } = useError();
    const { showSuccess } = useSuccess();

    const addbuilding= (
      <div
      style={{
        display: "flex",
        color: 'white',
        alignItems: "center",
        fontFamily: "Raleway",
        backgroundColor: "#fbc02d",
        fontSize: "20px",
        border: "5px solid #fbc02d",
        borderRadius: "10px", 
        padding: "5px 10px", 
      }}
    >
        <img src={addBuilding} alt="Add Building" style={{ marginRight: 8, height: 20 }} />
        <span>Add Building</span>
      </div>
    );

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
        const userID = sessionStorage.getItem('userID')
        const response = await axios.get(`http://localhost:8000/landlord/buildingsOwned/${userID}`)
        var data = response.data
        if(data.status === 200){
            setData(data.buildings)
        } else {
            console.log("Error getting buildings") /** TODO: Display error component */
            showError('Error getting buildings', 3000);
        }
    }
    useEffect(()=>{
        try{
            fetchData()
        } catch(error){
            console.log(`Error getting building data`)
            showError('Error getting building data', 3000);
        }
        
    },[])

    const columns = [
        { title: 'Building Name', field: 'buildingName',fontFamily:'Calibri'},
        { title: 'Address', field: 'address', align:'center' },
        {title: "Registration Date", field:"registrationDate",align:'center'},
        {
          title: 'Details', align:'center',
          render: (buildingData) => (
            <Link to="/landlord/buildingManage" state={{ buildingData }}>
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
            <h2 style={{textAlign:"center",fontFamily:"sans-serif",fontSize:25,marginTop:50}}>
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
                sorting:true,
                paging: true,
                selection:true,
                headerStyle: { background: "#fff8e1"}, 
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
                  icon:  () => addbuilding,
                  tooltip: "Add Building",
                  isFreeAction: true,
                  onClick: (event) => handleAddBuilding()
                },
                
              ]}
           
            />

      </Grid>
      <Grid item xs={1}></Grid>
        </Grid>
        <Popup open={buildFormOpen} onClose={handleClosePopup} contentStyle={{
          width: '24%', // Adjust the width to a smaller value
          height: '40vh',
          overflow: 'auto',
          borderRadius: '15px',
        }} modal>
        <AddBuildForm onClose={handleClosePopup} onAddition={fetchData} />
        </Popup>
    </div>
</div>
    )
}

export default LandlordManageTenantsPage;

