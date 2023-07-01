import React, { useState } from "react";
import { Card } from "@material-ui/core";
import Popup from "reactjs-popup";
import { CardContainer, NotificationText,NotificationTitle, ExpandButton } from "./notifCardStyle";
const NotifCard = (props) => {
    const [modalOpen,setModalOpen] = useState(false)
    // props should have title, text, landlordID, tenantID, date sent,
    const {title, text, landlordID, tenantID, dateSent,} = props.props
    
    return (
        <div>
          <Popup open={modalOpen} onClose={() => setModalOpen(false)} modal>
            <CardContainer>
              <NotificationTitle>Notification</NotificationTitle>
              <NotificationText>{title}</NotificationText>
              <NotificationText>{text}</NotificationText>
              <NotificationText>Landlord ID: {landlordID}</NotificationText>
              <NotificationText>Tenant ID: {tenantID}</NotificationText>
              <NotificationText>Date Sent: {dateSent}</NotificationText>
              <button type="button" onClick={() => setModalOpen(false)}>
                Close
              </button>
            </CardContainer>
          </Popup>
          <CardContainer>
            <NotificationTitle>Notification</NotificationTitle>
            <NotificationText>{title}</NotificationText>
            <NotificationText>{text}</NotificationText>
            <ExpandButton type="button" onClick={() => setModalOpen(true)}>
              Expand
            </ExpandButton>
          </CardContainer>
        </div>
      );
}
export default NotifCard;