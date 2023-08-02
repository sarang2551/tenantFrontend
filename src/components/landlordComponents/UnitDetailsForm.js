import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const UnitDetailsForm = ({ buildingName, unitDetails }) => {
    const [tenantData, setTenantData] = useState(undefined)
    const fetchData = async () => {
        if (unitDetails.tenantRef) {
            const response = await axios.get(`http://localhost:8000/landlord/getTenantInfo/${unitDetails.tenantRef}`)
            var data = response.data
            if (data.status === 200) {
                setTenantData(data.tenantInfo)
            } else {
                console.log("error getting tenant data for unit details")
            }
        }

    }
    useEffect(() => {
        try {
            fetchData()
        } catch (err) {
            console.log("Error getting unit data")
        }
    }, [])
    const { } = unitDetails
    return (
        <div>
            <span>In building: {buildingName}</span>
            <br />
            <span>Unit Number: {unitDetails?.unitNumber}</span>
            <br />
            <span>Monthly Rental: {unitDetails?.monthlyRental}</span>
            {unitDetails.tenantRef &&
                <div>
                    <span>
                        Tenant name: {tenantData?.tenantName}
                    </span>
                    <br />
                    <span>
                        Tenant Contact Number: {tenantData?.contactNumber}
                    </span>
                </div>
            }
        </div>
    )
}

export default UnitDetailsForm;