import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import {useLocation, useSearchParams} from "react-router-dom"
import axios from "axios";
import tableIcons from "../tenantComponents/MaterialIconComponents";
import Popup from "reactjs-popup";
import AddTenantForm from "./AddTenantForm";
import AddUnitForm from "./AddUnitForm";
import NavbarLandlord from "../headers/NavBarLandlord";
import UnitDetailsForm from "./UnitDetailsForm";
import CustomPopup from "./CustomPopup";
import Grid from "@material-ui/core/Grid";
import"./style_form.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";


const BuildingManageTable = ()=> {
    const location = useLocation()
    const {rowData} = location.state 
    const {_id,buildingName} = rowData 
    // for fetched data
    const [data,setData] = useState([])
    // for opening and closing unit details 
    const [openUnitDetailsPopup, setUnitDetailsPopup] = useState(false)
    // for passing popup data from UnitDetailsForm
    const [ popupData, setPopupData] = useState()
    // for add units
    const [openUnitForm,setUnitForm] = useState()
    // for selecting unit data for unit details
    const [selectedUnitDetails,setSelectedUnitDetails] = useState()
    // for adding tenants to units
    const [AddTenant,setAddTenant] = useState()

    const handleOpenUnitDetailsPopUp = (rowData)=>{
        setSelectedUnitDetails(rowData)
        setUnitDetailsPopup(true)
    }
    const handleCloseUnitDetailsPopUp = (dataFromChild) => {
        setPopupData(dataFromChild);
        setUnitDetailsPopup(false);
      };
    const handleOpenAddTenant = (rowData)=>{
        setSelectedUnitDetails(rowData)
        setAddTenant(true)
    }
    const handleCloseAddTenant = (rowData)=>{
        setSelectedUnitDetails(undefined)
        setAddTenant(false)
    }
    const fetchData = async()=>{
        const response = await axios.get(`http://localhost:8000/landlord/getBuildingInformation/${_id}`)
        var data = response.data

        if(data.status === 200){
            setData(data.unitsList)
        } else {
            console.log("Error getting building information") /**TODO: Add Error component */
        }
    }
    const handleDeleteUnit = ()=>{
        /**TODO */
    }
    const handleAddUnit =()=>{
        setUnitForm(true)
    }
    const handleCloseUnitForm = ()=>{
        setUnitForm(false)
    }
    useEffect(()=>{
        try{
            fetchData()
        }catch(error){
            console.log("Error getting building information")
        }
    },[])
    const columns = [
    { title:"Unit Number", field:"unitNumber"},
    { title: "More details", render:(rowData)=><button onClick={()=>handleOpenUnitDetailsPopUp(rowData)}>Unit details</button>
      },
    {title:"Tenant",field:"tenantRef",render:(rowData)=>rowData.tenantRef?
    <button>Edit Tenant</button>:
    <button onClick={()=>handleOpenAddTenant(rowData)}>Add Tenant</button>},
    {title: "Actions", align:'center',
    field: "actions",
    sorting: false,
    cellStyle: {
      paddingLeft: "0px", 
    },
    render: (rowData) => (
      <div>
      <IconButton onClick={() => handleDeleteUnit(rowData)}>
          <DeleteIcon />
      </IconButton>
  </div>
  ),}
];
    return (
        <div>
        <NavbarLandlord />
        <div className = "App" >
            <h2 style={{textAlign:"center",fontFamily:"sans-serif",fontSize:25,marginTop:50}}>
                Unit details
            </h2>
        <Grid container spacing={0}>
          <Grid item xs={1}></Grid>
            <Grid item xs={10}>

            <MaterialTable mt={90}
              title={`Units information for building ${buildingName}`}
              data={data}
              columns={columns}
              actions={[
                {
                  icon: tableIcons.Delete,
                  tooltip: "Delete Tenant",
                  onClick: (event, rowData) => handleDeleteUnit(rowData),
                },
                {
                  icon: tableIcons.Add,
                  tooltip: "Add Unit",
                  isFreeAction: true,
                  onClick: (event) => handleAddUnit(),
                },
              ]}
              icons={tableIcons}
              style={{ zIndex: 999 }}
              options = {{
                sorting:true,
                selection:true,
                headerStyle: { background: "lightgrey"}, 
                exportButton:true,
                exportAllData:true,
                actionsColumnIndex:-1,
                actionsCellStyle: {
                  paddingLeft: "10px", 
                  textAlign: "right", 
              },
            }}
            />
          </Grid>
          <Grid item xs={1}>
          {selectedUnitDetails && (
          <CustomPopup open={openUnitDetailsPopup} onClose={handleCloseUnitDetailsPopUp} modal>
            <UnitDetailsForm
              buildingName={buildingName}
              unitDetails={selectedUnitDetails}
              onPopupClose={handleCloseUnitDetailsPopUp}
            />
          </CustomPopup>
        )}
          </Grid>
          <Grid item xs={1}>
            <CustomPopup open={openUnitForm} onClose={handleCloseUnitForm} modal>
              <AddUnitForm onClose={handleCloseUnitForm} onAddition={fetchData} buildingID={_id}/>
            </CustomPopup>
          </Grid>
          <Grid item xs={1}>
            <CustomPopup open={AddTenant} onClose={handleCloseAddTenant} modal>
              <AddTenantForm unitDetails={selectedUnitDetails} onClose={handleCloseAddTenant} onAddition={fetchData}/>
            </CustomPopup>
          </Grid>
        </Grid>
        </div>
      </div>
    );
  };

export default BuildingManageTable;




