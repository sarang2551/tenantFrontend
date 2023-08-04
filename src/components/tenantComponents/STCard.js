import React, { useState, useEffect} from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import Stepper from "./Stepper";
import FeedbackForm from '../feedbackForm';
import axios from 'axios';
import {ClimbingBoxLoader} from 'react-spinners';
import "../landlordComponents/style_form.css";
import styled from 'styled-components'; 
import tableIcons from "../tenantComponents/MaterialIconComponents";
import { MdClose } from 'react-icons/md';

const PopupWrapper = styled.div`
  font-family: 'Raleway', Raleway;
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

const PopupContent = styled.div`
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled(MdClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
`;

const ImagesContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  .adminmsg {
    font-size: 24px;
    color: #333;
  }

  .Status {
    margin-top: 10px;
    font-size: 16px;
    color: #666;
    text-align: center;

    label {
      font-weight: bold;
    }

    .ticketNameInfo {
      margin-left: 10px;
    }

    .DescriptionInfo {
      margin-left: 10px;
    }

    .landlordName {
      margin-left: 10px;
    }

    .FromDataBase {
      margin-left: 10px;
    }
  }
`;

const StepperContainer = styled.div`
  margin-top: 20px;
`;



const ServiceTicketCard = ({_id,onPopupClose}) => {
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

  const handlePopupClose = () => {
    onPopupClose();
  };

      
  return (
    <>
      {loading ? (
        <ClimbingBoxLoader
          size={45}
          loading={loading}
          color="#36d7b7"
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
      ) : (
        <PopupWrapper>
          <PopupContent>
            <CloseButton onClick={handlePopupClose} />
            <ImagesContainer>
              {images.length > 0 && (
                <Slider>
                  {images.map((imageUrl, index) => (
                    <div key={index}>
                      <div className="slider-image">
                        <Image src={imageUrl} alt={`Image ${index}`} />
                        <div className="center"></div>
                      </div>
                    </div>
                  ))}
                </Slider>
              )}
            </ImagesContainer>
            <StatusContainer>
              <div className="adminmsg">
                <h1>Service Ticket Status</h1>
              </div>

              <div className="Status">
                <label>Ticket Name:</label>
                <span className="ticketNameInfo">{ticketData.title}</span>
                <br />
                <label>Description:</label>
                <span className="DescriptionInfo">{ticketData.description}</span>
                <br />
                <label>Unit: </label>
                <span className="DescriptionInfo">{ticketData.unitName}</span>
                <br />
                <label>Landlord name: </label>
                <span className="landlordName">{ticketData.landlordName}</span>
                <br />
                <label>Files Submitted:</label>
                <span className="FromDataBase">{ticketData.documents}</span>
                <br />
                {ticketData.progressStage < 4 && <label>Progress:</label>}
                <StepperContainer>
                  {ticketData.progressStage < 4 && <Stepper ticketData={ticketData} />}
                </StepperContainer>
              </div>
            </StatusContainer>
            <CloseButton onClick={handlePopupClose}>Close</CloseButton>
          </PopupContent>
        </PopupWrapper>
      )}
    </>
  );

};

//<div >
//<ClimbingBoxLoader size={45} loading={loading} color="#36d7b7" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}/> 
//</div>

export default ServiceTicketCard;

