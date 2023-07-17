import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import {useLocation, useSearchParams} from "react-router-dom"
import axios from "axios";
import tableIcons from "../tenantComponents/MaterialIconComponents";
import Popup from "reactjs-popup";
import AddTenantForm from "./AddTenantForm";
import Navbar from "../headers/NavBar";
import AddUnitForm from "./AddUnitForm";

const BuildingManageTable = ()=> {
    const location = useLocation()
    const {rowData} = location.state
    const {_id,buildingName} = rowData
    const [data,setData] = useState([])
    const [openUnitPopup, setOpenPopup] = useState()
    const [openUnitForm,setUnitForm] = useState()
    const handleOpenPopUp = ()=>{
        setOpenPopup(true)
    }
    const handleClosePopUp = ()=>{
        setOpenPopup(false)
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
    const handleDeleteTenant = ()=>{
        /**TODO */
    }
    const handleAddTenant =()=>{
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
    const columns = [{ title: "Building Name", field: "buildingName" },
    { title:"Unit Name", field:"address"},
    { title: "Tenant", render:(rowData)=><button onClick={handleOpenPopUp}>More Details</button>
      }]

    return (
        <div>
            <Navbar/>
            <MaterialTable
            title={`Units information for building ${buildingName}`}
            data={data}
            columns={columns}
            actions={[
                {
                    icon: tableIcons.Delete,
                    tooltip: "Delete Tenant",
                    onClick: (event, rowData) => handleDeleteTenant(rowData)
                  },
                  {
                    icon: tableIcons.Add,
                    tooltip: "Add Unit",
                    isFreeAction: true,
                    onClick: (event) => handleAddTenant()
                  },
            ]}
            icons={tableIcons}
            />
            <Popup open={openUnitForm} onClose={handleCloseUnitForm} modal>
            <AddUnitForm onClose={handleCloseUnitForm} onAddition={fetchData} buildingID={_id}/> 
            </Popup>
            </div>
    )
}

export default BuildingManageTable;