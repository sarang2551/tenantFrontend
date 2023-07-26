import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import tableIcons from "../components/tenantComponents/MaterialIconComponents";
import AddBuildForm from "../components/landlordComponents/AddBuildForm";
import Popup from "reactjs-popup";
import {Link, createSearchParams, useNavigate} from 'react-router-dom'
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
        { title: "Building Name", field: "buildingName" },
        { title:"Address", field:"address"},
        { title: "Details", render:(rowData)=><Link to="/landlord/buildingManage" state={{rowData}}>Manage Tenants</Link>
          }];
    return (
        <div>
            <NavbarLandlord/>
            <MaterialTable
            title={"Manage Buildings"}
            data={data}
            columns={columns}
            actions={[
                {
                  icon: tableIcons.Delete,
                  tooltip: "Delete Building",
                  onClick: (event, rowData) => handleDeleteBuilding(rowData)
                },
                {
                  icon: tableIcons.Add,
                  tooltip: "Add Building",
                  isFreeAction: true,
                  onClick: (event) => handleAddBuilding()
                },
                
              ]}
            icons={tableIcons}
            />
            <Popup open={buildFormOpen} onClose={handleClosePopup} modal>
        <AddBuildForm onClose={handleClosePopup} onAddition={fetchData}/> 
      </Popup>
        </div>
    )
}

export default LandlordManageTenantsPage;