import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import "./st_form_style.css"
import axios from "axios"
import"../landlordComponents/style_form.css";
import { Grid, Typography } from "@material-ui/core";
import tableIcons from "../tenantComponents/MaterialIconComponents";
import { MdUploadFile, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';


const ServiceTicketForm = ({onClose, onAddition}) => {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const [landlordName, setLandlordName] = useState(); 
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No File Selected");
  
  const [unitData,setUnitData] = useState() 

  const fileupload = {
    width: "90px",
    height: "90px",
    border: "2px solid rgba(49, 54, 56, 0.33)",
    background: "#F2F4F8",
    borderRadius: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "100px"
  };

  const fileinfo = {
    color: "#535353",
    fontFamily: "KoHo",
    fontSize: "20px",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.17px",
    marginTop: "10px",
    marginLeft: "30px"
  };

  const onSubmit = async(data) => {
                const {title,description,images} = data
                var tenantName = sessionStorage.getItem('tenantName')
                var userID = sessionStorage.getItem('userID')
                const updateServiceTicket = async () => {
                  const imageList = [];
                
                  for (let i = 0; i < images.length; i++) {
                    const base64Image = await convertToBase64(images[i]);
                    imageList.push(base64Image);
                  }
                
                  const serviceTicketObject = {
                    tenantName,
                    userID,
                    unitName:unitData,
                    landlordName,
                    title,
                    description,
                    images: imageList,
                  };
                
                  try {
                    const result = await axios.post("http://localhost:8000/tenant/addServiceTicket", serviceTicketObject); 
                    if (result.status === 200) {
                      onClose();
                      onAddition();
                    }
                  } catch (error) {
                    console.error("Error updating service ticket:", error);
                  }
                };
                
                const convertToBase64 = (image) => {
                  return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      resolve(reader.result);
                    };
                    reader.onerror = () => {
                      reject(new Error("Failed to read image file."));
                    };
                    reader.readAsDataURL(image);
                  });
                };
                
                updateServiceTicket();
              }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        var userID = sessionStorage.getItem('userID')
        const response = await axios.get(`http://localhost:8000/tenant/getUnit&LandlordData/${userID}`);
        var data = response.data
        if(data.status == 200){
            const tenantObject = data.tenantObject
            setUnitData(tenantObject.unitName)
            setLandlordName(tenantObject.landlordName)
        }else{
          console.log(`Error getting tenant data for tenant ${userID} for addition `)
        }
      } catch (error) {
        console.error('Error fetching landlord and unit data', error);
      }
    };
  
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setFileName(e.target.files[0].name);
      setValue("images", e.target.files);
    }
  };

  return (
    <div className="custom-popup-content">
      <form onSubmit={handleSubmit(onSubmit)} className="style-form">
        <div className="style-form-container">
          <tableIcons.Close onClick={onClose} />
        </div>
        <Typography variant="h4" gutterBottom style={{ fontSize: "20px" }}>
          Add Service Ticket
        </Typography>
        <Grid item xs={20}>
        <div className="input-with-icon">
            <tableIcons.ConfirmationNumber className="icon" />
            <input
              type="text"
              placeholder="Ticket Title"
              {...register("title", { required: true })}
            />
            {errors.ticket && <span>Ticket title is required</span>}
          </div>
          <div className="input-with-icon">
            <tableIcons.Description className="icon" />
            <input
              type="text"
              placeholder="Description"
              {...register("description", { required: true })}
            />
            {errors.description && <span>Description is required</span>}
          </div>
    
          <label>
            Landlord: <p id="landlord_name">{landlordName}</p>
            Unit: <p id="unit_name">{unitData}</p>
          </label>
          <label>Attach Images</label>
            <div className="input-with-icon">
              <div style={fileupload} onClick={() => document.querySelector(".input-field").click()}>
                <input type="file" accept="png/*" className="input-field" hidden onChange={handleFileChange} multiple />
                {image ? <img src={image} alt="Preview" /> : <MdUploadFile color="#535353" size={130} />}
              </div>
              <section style={fileinfo}>
                <AiFillFileImage color="#535353" />
                <span>
                  {fileName}
                  <MdDelete
                    color="#535353"
                    onClick={() => {
                      setFileName("No File Selected");
                      setImage(null);
                      setValue("images", null);
                    }}
                />
              </span>
            </section>
          </div>
          </Grid>
        <Grid item xs={12} style={{ textAlign: "center", marginTop:"20px" }}>
          <input type="submit" />
        </Grid>
      </form>
    </div>
  );
};
export default ServiceTicketForm;