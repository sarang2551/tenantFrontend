import React, { useState, useEffect} from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import Stepper from "./Stepper";


const ServiceTicketCard = ({ticketData}) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageUrls = ticketData.images; 
        const processedImages = await Promise.all(imageUrls.map(convertToImage));
        setImages(processedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [ticketData]);

  const convertToImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      return objectURL;
    } catch (error) {
      console.error('Error converting image:', error);
      return null;
    }
  };

  const imageStyles = {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  };

  const sliderContainerStyles = {
    width: '100%',
     
  };
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
      <div>
      <div className="images" style={sliderContainerStyles}>
        {images.length > 0 && (
          <Slider>
            {images.map((imageUrl, index) => (
              <div key={index}>
                <div className='slider-image'>
                  <img src={imageUrl} alt={`Image ${index}`} style={imageStyles} />
                  <div className="center"></div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
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

