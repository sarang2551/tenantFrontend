import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom"
import axios from "axios";
import tableIcons from "../tenantComponents/MaterialIconComponents";
import Popup from "reactjs-popup";
import AddTenantForm from "./AddTenantForm";
import AddUnitForm from "./AddUnitForm";
import NavbarLandlord from "../headers/NavBarLandlord";
import UnitDetailsForm from "./UnitDetailsForm";
import TenantDetailsForm from "./TenantDetails";

const BuildingManageTable = () => {
    const location = useLocation()
    const { rowData } = location.state
    const { _id, buildingName } = rowData
    // for fetched data
    const [data, setData] = useState([])
    // for opening and closing unit details 
    const [openUnitDetailsPopup, setUnitDetailsPopup] = useState()
    // for opening and closing tenant details
    const [openTenantDetailsPopup, setTenantDetailsPopup] = useState()
    // for add units
    const [openUnitForm, setUnitForm] = useState()
    // for selecting unit data for unit details
    const [selectedUnitDetails, setSelectedUnitDetails] = useState()
    // for adding tenants to units
    const [AddTenant, setAddTenant] = useState()

    const handleOpenUnitDetailsPopUp = (rowData) => {
        setSelectedUnitDetails(rowData)
        setUnitDetailsPopup(true)
    }
    const handleCloseUnitDetailsPopUp = () => {
        setUnitDetailsPopup(false)
        setSelectedUnitDetails(undefined)
    }
    const handleOpenTenantDetailsPopUp = (rowData) => {
        setSelectedUnitDetails(rowData)
        setTenantDetailsPopup(true)
    }
    const handleCloseTenantDetailsPopUp = () => {
        setTenantDetailsPopup(false)
        setSelectedUnitDetails(undefined)
    }
    const handleOpenAddTenant = (rowData) => {
        setSelectedUnitDetails(rowData)
        setAddTenant(true)
    }
    const handleCloseAddTenant = (rowData) => {
        setSelectedUnitDetails(undefined)
        setAddTenant(false)
    }
    const fetchData = async () => {
        const response = await axios.get(`http://localhost:8000/landlord/getBuildingInformation/${_id}`)
        var data = response.data

        if (data.status === 200) {
            setData(data.unitsList)
        } else {
            console.log("Error getting building information") /**TODO: Add Error component */
        }
    }
    const handleDeleteUnit = () => {
        /**TODO */
    }
    const handleAddUnit = () => {
        setUnitForm(true)
    }
    const handleCloseUnitForm = () => {
        setUnitForm(false)
    }
    useEffect(() => {
        try {
            fetchData()
        } catch (error) {
            console.log("Error getting building information")
        }
    }, [])
    const columns = [
        { title: "Unit Number", field: "unitNumber" },
        {
            title: "More details", render: (rowData) => <button onClick={() => handleOpenUnitDetailsPopUp(rowData)}>Unit details</button>
        },
        {
            title: "Tenant", field: "tenantRef", render: (rowData) => rowData.tenantRef ?
                <button onClick={() => handleOpenTenantDetailsPopUp(rowData)}>Edit Tenant</button> :
                <button onClick={() => handleOpenAddTenant(rowData)}>Add Tenant</button>
        }

    ]

    return (
        <div>
            <NavbarLandlord />
            <MaterialTable
                title={`Units information for building ${buildingName}`}
                data={data}
                columns={columns}
                actions={[
                    {
                        icon: tableIcons.Delete,
                        tooltip: "Delete Tenant",
                        onClick: (event, rowData) => handleDeleteUnit(rowData)
                    },
                    {
                        icon: tableIcons.Add,
                        tooltip: "Add Unit",
                        isFreeAction: true,
                        onClick: (event) => handleAddUnit()
                    },
                ]}
                icons={tableIcons}
            />
            <Popup open={openUnitDetailsPopup} onClose={handleCloseUnitDetailsPopUp} modal>
                <UnitDetailsForm buildingName={buildingName} unitDetails={selectedUnitDetails} />
            </Popup>
            <Popup open={openUnitForm} onClose={handleCloseUnitForm} modal>
                <AddUnitForm onClose={handleCloseUnitForm} onAddition={fetchData} buildingID={_id} />
            </Popup>
            <Popup open={AddTenant} onClose={handleCloseAddTenant} modal>
                <AddTenantForm unitDetails={selectedUnitDetails} onClose={handleCloseAddTenant} onAddition={fetchData} />
            </Popup>
            <Popup open={openTenantDetailsPopup} onClose={handleCloseTenantDetailsPopUp} modal>
                <TenantDetailsForm unitDetails={selectedUnitDetails} onClose={handleCloseTenantDetailsPopUp} onAddition={fetchData} />
            </Popup>
        </div>
    )
}

export default BuildingManageTable;



