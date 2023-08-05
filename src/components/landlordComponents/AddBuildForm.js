import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import"./style_form.css";
import { Grid, Typography } from "@material-ui/core";
import tableIcons from "../tenantComponents/MaterialIconComponents";
import { MdUploadFile, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';


const AddBuildForm = ({ onClose, onAddition }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No File Selected");

  const fileupload = {
    width: "110px",
    height: "110px",
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
    fontSize: "25px",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.17px",
    marginTop: "10px",
    marginLeft: "30px"
  };


  const onSubmit = async (data) => {
    var userID = "64873c12bd2e5989a5e90e1c"; /**TODO: Get user data from session  */
    const { buildingName, address, postalCode } = data;

    const addBuilding = async () => {
      const imageList = [];

      for (let i = 0; i < data.images.length; i++) {
        const base64Image = await convertToBase64(data.images[i]);
        imageList.push(base64Image);
      }

      const buildingObject = {
        buildingName,
        userID,
        address,
        postalCode,
        images: imageList,
      };
      console.log(`Adding building object`);
      console.log(buildingObject);
      try {
        const result = await axios.post(
          "http://localhost:8000/landlord/addBuilding",
          buildingObject
        );
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

    addBuilding();
  };

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
            Add Building
          </Typography>
          <Grid item xs={20}>
            <div className="input-with-icon">
            <tableIcons.Home className="icon" />
            <input
              type="text"
              placeholder="Building Name"
              {...register("buildingName", { required: true })}
            />
          </div>
          {errors.buildingName && <span>Name is required</span>}

          <div className="input-with-icon">
            <tableIcons.Location className="icon" />
            <input
              type="text"
              placeholder="Address"
              {...register("address", { required: true })}
            />
          </div>
          {errors.address && <span>Description is required</span>}

          <div className="input-with-icon">
            <tableIcons.Postal className="icon" />
            <input
              type="text"
              placeholder="Postal Code"
              {...register("postalCode", { required: true })}
            />
          </div>
          {errors.postalCode && <span>Postal Code is required</span>}


          <label>Attach Images</label>
          <div className="input-with-icon">
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
        <Grid item xs={12} style={{ textAlign: "center" , marginTop:'5px'}}>
          <input type="submit" />
        </Grid>
      </form>
    </div>
  );
};

export default AddBuildForm;


