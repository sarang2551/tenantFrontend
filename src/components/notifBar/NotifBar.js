import React, { useState } from "react";
import NotifCard from "./NotifCard";
import { Drawer, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#f5f5f5',
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
    },
    notificationTitle: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(2),
    },
  }));

const NotifBar = (props) => {
    // useEffect(() => {
    //     fetchData();
    //   }, []);
    const itemsArray = [
        {title:"Added Service Ticket for Unit B01", 
        description:"Sending to tenant",
        landlordID:"123", tenantID:"456", date:new Date().getDate()},
        {title:"Updated Service Ticket to Stage 3", 
        description:"Sending to tenant",
        landlordID:"123", tenantID:"456", date:new Date().getDate()}
        ]
    const classes = useStyles();
    return (
    <Drawer anchor="right" 
    variant="persistent" 
    open={props.props} 
    classes={{ paper: classes.drawerPaper }}
    >
        <div>
          {itemsArray.map((item, index) => (
            <div key={index}>
              <NotifCard props={item} />
            </div>
          ))}
        </div>

      
      </Drawer>
    );
};

export default NotifBar;