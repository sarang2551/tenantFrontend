import React, { useState, useEffect} from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import Stepper from "./Stepper";
import { useError } from '../errorBox';
import axios from 'axios';
import {ClimbingBoxLoader} from 'react-spinners';
import "../landlordComponents/style_form.css";
import styled from 'styled-components'; 


const StyledForm = styled.div`
  font-family: "Raleway", Raleway;
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
const ImagesContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px; // You can adjust this height to suit your design
  overflow: hidden;
`;

const Image = styled.img`
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: 0 auto; // Centering the image horizontally
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
`;


const StepperContainer = styled.div`
  margin-top: 0px;
`;

const CloseButton = styled.button`
  background: #9ad3de;
  border: 0;
  border-radius: 7px;
  padding: 10px 30px;
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;
  margin-top: 20px;

  &:focus {
    outline: none;
  }

  &:hover {
    background: #b4e1ea;
  }
`;



const ServiceTicketCard = ({ticketData,onPopupClose}) => {

  const {showError} = useError()
  const [images, setImages] = useState([]);

  const [loading,setLoading] = useState(true)

  const fetchData = async () => {
    try {
      //const res_data = await axios.get(`http://localhost:8000/general/getServiceTicketInfo/${ticketData._id}`)
      //setTicketData(res_data.data)
      const res_data = await axios.get(`http://localhost:8000/general/getSTImages/${ticketData._id}`)
      if(res_data.status === 200){
        const imageUrls = res_data.data; 
        const processedImages = await Promise.all(imageUrls.map(convertToImage));
        setImages(processedImages);
      } else{
        showError("Error retrieving ticket images")
      }
      
      
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

  const handlePopupClose= () => {
    onPopupClose();
  };
   
  return (
    <>
        <StyledForm>
        <PopupWrapper>
          <PopupContent>
            {loading ? 
            <ClimbingBoxLoader
          size={45}
          color="#36d7b7"
        /> : images.length > 0 ?

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
       : <span>No images for this ticket</span>
        }
            <ContentContainer>
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
                
                {ticketData.progressStage < 4 && <label>Progress:</label>}
                <StepperContainer>
                  <Stepper initialData={ticketData} />
                </StepperContainer>
              </div>
              <CloseButton onClick={handlePopupClose}>Close</CloseButton>
            </ContentContainer>
          </PopupContent>
        </PopupWrapper>
        </StyledForm>
    </>
  );

};

export default ServiceTicketCard;

