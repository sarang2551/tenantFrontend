import React from "react";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import Stepper from "./Stepper";

const ServiceTicketCard = (props) => {
  const content = props.images; // list of images for this particular service ticket
  const ticketData = props.ticketData
  
    // <div>
    //   <Slider>
    //     {content.map((item, index) => (
    //       <div
    //         key={index}
    //         style={{ background: `url('${item}') no-repeat center center` }}
    //       >
    //         <div className="center">
    //           <Stepper />
    //           {/* <h1>{item.title}</h1>
    //           <p>{item.description}</p>
    //           <button>{item.button}</button> */}
    //         </div>
    //       </div>
    //     ))}
    //   </Slider>

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
        <div className='adminmsg'>
          <h1>Service Ticket Status</h1>
        </div>
        <div className="Status">
          <label>Ticket Name:</label>
          <span className='ticketNameInfo'> {ticketData.ticketNameInfo} </span>
          <br/>
          <label>Description:</label>
          <span className='DescriptionInfo'>{ticketData.description}</span>
          <br/>
          <label>Landlord:</label>
          <span className='landlordName'>{ticketData.landlordName}</span>
          <br/>
          <label>Files Submitted:</label>
          <span className='FromDataBase'>{ticketData.documents}</span>
          <br/>
          <label>Progress:</label>
		  <div className = "stepper-container">
		  	<Stepper initialStep = {ticketData.progressStage}/>
		  </div>
        </div>
        <br></br>
      </div>
  );
};

export default ServiceTicketCard;