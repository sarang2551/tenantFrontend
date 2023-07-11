import React from "react";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import Stepper from "./Stepper";

const ServiceTicketCard = ({ticketData}) => {
  var content = Array.isArray(ticketData.images) ? ticketData.images : []; // list of images for this particular service ticket

    // const ticketdata= {
    //   ticketNameInfo:'Fix Aircon',
    //   description:' aircon spoil',
    //   landlordName: ' Franco',
    //   documents:['file1','file2'],
    //   progressStage: 3

    // };
        // name: Service Ticket Name
        // details: Ticket information
        const allsteps = ["Processing request", "Acceptance quotation", "Service Scheduling", "Work In Progress", "Completed"];


     return (
        <div>
        <Slider>
          {content?.map((item, index) => (
            <div
              key={index}
              style={{ background: `url('${item}') no-repeat center center` }}
            >
              <div className="center">
                {/* <h1>{item.title}</h1>
                <p>{item.description}</p>
                <button>{item.button}</button> */}
              </div>
            </div>
          ))}
        </Slider>
      <div>
        <div className='adminmsg'>
          <h1>Service Ticket Status</h1>
        </div>
        <div className="Status">
          <label>Ticket Name:</label>
          <span className='ticketNameInfo'> {ticketData.title} </span>
          <br/>
          <label>Description:</label>
          <span className='DescriptionInfo'>{ticketData.description || "Air conditioning servicing needed for multiple rooms"}</span>
          <br/>
          <label>Unit:</label>
          <span className='DescriptionInfo'>{ticketData.unit}</span>
          <br/>
          <label>Landlord:</label>
          <span className='landlordName'>{ticketData.landlordName}</span>
          <br/>
          <label>Files Submitted:</label>
          <span className='FromDataBase'>{ticketData.documents}</span>
          <br/>
          <label>Progress:</label>
		  <div className = "stepper-container">
		  	<Stepper ticketData = {ticketData}/>
		  </div>
        </div>
        <br></br>
      </div>
      </div>
  );
};

export default ServiceTicketCard;