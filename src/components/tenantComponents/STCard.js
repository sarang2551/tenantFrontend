import React, { useState, useEffect} from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import Stepper from "./Stepper";


const ServiceTicketCard = ({ticketData}) => {

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const imageData = await fetch('http://localhost:8000/tenant/getAllServiceTickets');
  //       const imagesData = await imageData.json();
  
  //       const processedImages = await Promise.all(imagesData.map(processImage));
  //       setProcessedImages(processedImages);
  //     } catch (error) {
  //       console.error('Error fetching and processing images:', error);
  //     }
  //   };
  
  //   fetchImages();
  // }, []);

  //convert back to image
  // const processImage = async (imageData) => {
  //   const { name, base64 } = imageData;
  //   try {
  //     const response = await fetch(base64);
  //     const blob = await response.blob();
  //     const file = new File([blob], name, { type: blob.type });
  
  //     const compressedFile = await imageCompression(file, { maxSizeMB: 1 });
  //     const compressedBase64 = await convertToBase64(compressedFile);
  
  //     return {
  //       name: compressedFile.name,
  //       base64: compressedBase64,
  //     };
  //   } catch (error) {
  //     console.error('Error processing image:', error);
  //     return null;
  //   }
  // };

  // var content = Array.isArray(ticketData.images) ? ticketData.images : []; // list of images for this particular service ticket

    // const ticketdata= {
    //   ticketNameInfo:'Fix Aircon',
    //   description:' aircon spoil',
    //   unit : 'B01',
    //   landlordName: ' Franco',
    //   documents:['file1','file2'],
    //   progressStage: 3


    // };
        // name: Service Ticket Name
        // details: Ticket information
        const allsteps = ["Processing request", "Acceptance quotation", "Service Scheduling", "Work In Progress", "Completed"];


     return (
      <div className="images">
      {ticketData.images && ticketData.images.length > 0 && (
      <Slider>
         {ticketData.images.map((image, index) => (
         <div
             key={index}
            // style={{ background: `url('${item}') no-repeat center center` }}
           >
           <img src={image.base64} alt = {'Image ${index}'}/>
            <div className="center">
            </div>
           </div>
           ))}
        </Slider> 
      )}
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
		  	<Stepper initialStep = {ticketData.progressStage}/>


		  </div>
        </div>
        <br></br>
      </div>
      </div>
    
  );
};

export default ServiceTicketCard;

