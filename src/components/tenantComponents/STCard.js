import React, { useState, useEffect} from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import Stepper from "./Stepper";
import FeedbackForm from '../feedbackForm';
import axios from 'axios';
import {ClimbingBoxLoader} from 'react-spinners'

const ServiceTicketCard = ({_id}) => {
  const [images, setImages] = useState([]);
  const [ticketData, setTicketData] = useState({})
  const userType = sessionStorage.getItem('userType')
  const showTenantFeedback = userType === "tenant" && !ticketData.tenantFeedback
  const showLandlordFeedback = userType === "landlord" && !ticketData.landlordFeedback
  const [loading,setLoading] = useState(true)
  const fetchData = async () => {
      
    try {
      const res_data = await axios.get(`http://localhost:8000/general/getServiceTicketInfo/${_id}`)
      setTicketData(res_data.data)
      const imageUrls = ticketData.images; 
      const processedImages = await Promise.all(imageUrls.map(convertToImage));
      setImages(processedImages);
      
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchData().then(()=>{
        setLoading(false)
    })
    
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
    objectFit:'contain',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '100%',
    minHeight: '100%',
  };


  const sliderContainerStyles = {
    position:'relative',
    width: '100%',
    overflow:'hidden',
     
  };
      
     return (
      <div>
      {loading ? <ClimbingBoxLoader size={45} loading={loading} color="#36d7b7" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}/> 
      : 
      <>
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
          <span className='DescriptionInfo'>{ticketData.description}</span>
          <br/>
          <label>Unit: </label>
          <span className='DescriptionInfo'>{ticketData.unitName}</span>
          <br/>
          <label>Landlord name: </label>
          <span className='landlordName'>{ticketData.landlordName}</span>
          <br/>
          <label>Files Submitted:</label>
          <span className='FromDataBase'>{ticketData.documents}</span>
          <br/>
          {ticketData.progressStage < 4 && <label>Progress:</label>}
		  <div className = "stepper-container">
		  	{ticketData.progressStage < 4 &&  
            <Stepper ticketData = {ticketData}/>
            } 
            {/* {(showLandlordFeedback || showTenantFeedback) ? <FeedbackForm ticketData={ticketData}/> : <h5>Feedback submitted</h5>} */}
		  </div>
        </div>
        <br></br>
      </div>
      </>
      }
      

      </div>
      );
};



//<div >
//<ClimbingBoxLoader size={45} loading={loading} color="#36d7b7" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}/> 
//</div>

export default ServiceTicketCard;

