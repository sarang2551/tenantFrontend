import React, { useState }  from "react";
import {useForm} from 'react-hook-form'
// import "../tenantComponents/st_form_style.css"
import axios from "axios"
import { Grid, Typography } from "@material-ui/core";
import tableIcons from "../tenantComponents/MaterialIconComponents";
import { MdUploadFile, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import"./style_form.css";
import { useError } from "../errorBox";
import { useSuccess } from "../successBox";

const AddUnitForm = ({onClose,onAddition,buildingID})=>{
    const {showError} = useError()
    const {showSuccess} = useSuccess()
    const { register, handleSubmit, watch, formState: { errors }, setValue} = useForm();

    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("No File Selected");
  
    const fileupload = {
      width: "120px",
      height: "120px",
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
      fontSize: "30px",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "0.17px",
      marginTop: "10px",
      marginLeft: "30px"
    };


    const onSubmit = async(data)=>{
        const {unitName,unitNumber,monthlyRental,images} = data
        const addUnit = async()=>{
            const imageList = [];
            const userID = sessionStorage.getItem('userID')
                  for (let i = 0; i < images.length; i++) {
                    const base64Image = await convertToBase64(images[i]);
                    imageList.push(base64Image);
                  }
                
                  const unitObject = {
                    unitName,
                    unitNumber,
                    buildingID,
                    userID,
                    monthlyRental,
                    images: imageList,
                  };
                
                  try {
                    const result = await axios.post("http://localhost:8000/landlord/addUnit", unitObject); 
                    if (result.status === 200) {
                      showSuccess("Successfully added unit",3000)
                      onClose();
                      onAddition();
                    }
                  } catch (error) {
                    showError("Error updating service ticket",3000);
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
        }
      
        addUnit()
    }

    const handleFileChange = (e) => {
      if (e.target.files[0]) {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFileName(e.target.files[0].name);
        setValue("images", e.target.files);
      }
    };

    return(
      <div className="custom-popup-content">
      <form onSubmit={handleSubmit(onSubmit)} className="style-form">
        <div className ="style-form-container">
          <tableIcons.Close onClick={onClose} />
        </div>
        <Typography variant="h4" gutterBottom style={{ fontSize: "20px" }}>
          Add Unit
        </Typography>
        <Grid item xs={20}>
          <div className="input-with-icon">
            <tableIcons.Home className="icon" />
            <input
              type="text"
              placeholder="Unit Name"
              {...register("unitName", { required: true })}
            />
            {errors.unitName && <span>Unit Name is required</span>}
          </div>

          <div className="input-with-icon">
            <tableIcons.Number className="icon" />
            <input
              type="text"
              placeholder="Unit Number"
              {...register("unitNumber", { required: true })}
            />
            {errors.unitNumber && <span>Unit Number is required</span>}
          </div>

          <div className="input-with-icon">
            <tableIcons.Rental className="icon" />
            <input
              type="text"
              placeholder="Monthly Rental"
              {...register("monthlyRental", { required: true })}
            />
            {errors.monthlyRental && <span>Monthly Rental is required</span>}
          </div>

          <label>Attach Images</label>
          <div className="input-with-icon" >
              <div style={fileupload} onClick={() => document.querySelector(".input-field").click()}>
                <input type="file" accept="image/*" className="input-field" hidden onChange={handleFileChange} multiple />
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
        <Grid item xs={12} style={{ textAlign: "center", marginTop:'30px' }}>
          <input type="submit" />
        </Grid>
      </form>
    </div>
  );
};

export default AddUnitForm;








