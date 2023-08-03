import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import buildingImage from "../headers/assets/images/building_image.png";
import"./style_form.css";

const StyledForm = styled.div`
  font-family: "Raleway", Raleway;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
`;

const PopupWrapper = styled.div`
  background: #ffffff;
  max-width: 500px;
  width: 90%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: row; 

  &:hover {
  transform: scale(1.1); 
  transition: transform 0.3s ease; 
  }
`;

const BuildingImageContainer = styled.div`
  flex: 1;
  padding: 0 10px;
  display: flex;
  align-items: center;
`;

const BuildingImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
`;

const Heading1 = styled.h1`
  font-size: 40px;
  text-align: center;
  color: #666666;
  margin: 0 0 15Spx 0;
  
`;
const TenantDetailsContainer = styled.div`
  text-align: center; /* Center the tenant details */
`;

const Text = styled.span`
  font-size: 16px;
  color: #666666;
  margin-bottom: 0px;
  text-align: center;
`;

const CloseButton = styled.button`
  background: #9ad3de;
  border: 0;
  border-radius: 7px;
  padding: 10px 30px;
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;
  margin-top: 20px;

  &:focus {
    outline: none;
  }

  &:hover {
    background: #b4e1ea;
  }
`;

const UnitDetailsForm = ({ buildingName, unitDetails, onPopupClose }) => {
  const [tenantData, setTenantData] = useState(undefined);

  const fetchData = async () => {
    if (unitDetails.tenantRef) {
      try {
        const response = await axios.get(
          `http://localhost:8000/landlord/getTenantInfo/${unitDetails.tenantRef}`
        );
        const data = response.data;
        if (data.status === 200) {
          setTenantData(data.tenantInfo);
        } else {
          console.log("Error getting tenant data for unit details");
        }
      } catch (err) {
        console.log("Error getting tenant data:", err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [unitDetails.tenantRef]);

  const handleClosePopup = () => {
    onPopupClose();
  };

  return (
    <StyledForm>
      <PopupWrapper>
        <BuildingImageContainer>
          <BuildingImage src={buildingImage} />
        </BuildingImageContainer>
        <ContentContainer>
          <Heading1>Unit details</Heading1>
          <Text>In building: {buildingName}</Text>
          <Text>Unit Number: {unitDetails?.unitNumber}</Text>
          <Text>Monthly Rental: {unitDetails?.monthlyRental}</Text>
          {unitDetails.tenantRef && (
            <TenantDetailsContainer>
              <Text>Tenant name: {tenantData?.tenantName}</Text>
              <Text>Tenant Contact Number: {tenantData?.contactNumber}</Text>
              </TenantDetailsContainer>
          )}
          <CloseButton onClick={handleClosePopup}>Close</CloseButton>
        </ContentContainer>
      </PopupWrapper>
    </StyledForm>
  );
};

export default UnitDetailsForm;







