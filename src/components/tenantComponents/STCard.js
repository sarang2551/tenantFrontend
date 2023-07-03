import React from "react";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import Stepper from "./Stepper";

const ServiceTicketCard = (props) => {
  const content = props.images; // list of images for this particular service ticket
  return (
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

      <div>
        <div className='adminmsg'>
          <h1>Service Ticket Status</h1>
        </div>
        <div className="Status">
          <label>Ticket Name:</label>
          <span className='FromDataBase'>Ticket Name Info</span>
          <br/>
          <label>Description:</label>
          <span className='FromDataBase'>Description Info</span>
          <br/>
          <label>Landlord:</label>
          <span className='FromDataBase'>Landlord Info</span>
          <br/>
          <label>Files Submitted:</label>
          <span className='FromDataBase'>Files submitted Info</span>
          <br/>
          <label>Progress:</label>
		  <div className = "stepper-container">
		  	<Stepper />
		  </div>
        </div>
        <br></br>
      </div>
  );
};

export default ServiceTicketCard;