import React, { useState } from "react";
import { Card } from "@material-ui/core";
import Popup from "reactjs-popup";
import { CardContainer, NotificationText,NotificationTitle, ExpandButton } from "./notifCardStyle";
const NotifCard = (props) => {
    const [modalOpen,setModalOpen] = useState(false)
    // props should have title, description, landlordID, tenantID, date sent,
    const {title, description, landlordID, tenantID, date,} = props.props
    
    return (
        <div>
          <Popup open={modalOpen} onClose={() => setModalOpen(false)} modal>
            <CardContainer>
              <NotificationTitle>{title}</NotificationTitle>
              <NotificationText>{description}</NotificationText>
              {/* <NotificationText>Landlord ID: {landlordID}</NotificationText>
              <NotificationText>Tenant ID: {tenantID}</NotificationText> */}
              <NotificationText>Date Sent: {date}</NotificationText>
              <button type="button" onClick={() => setModalOpen(false)}>
                Close
              </button>
            </CardContainer>
          </Popup>
          <CardContainer>
          <NotificationTitle>{title}</NotificationTitle>
            <NotificationText>{description}</NotificationText>
            <ExpandButton type="button" onClick={() => setModalOpen(true)}>
              Expand
            </ExpandButton>
          </CardContainer>
        </div>
      );
}
export default NotifCard;