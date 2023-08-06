import React,{ useState } from "react";
import {useForm} from 'react-hook-form'
import "../tenantComponents/st_form_style.css"
import axios from "axios"
import { Grid, Typography } from "@material-ui/core";
import tableIcons from "../tenantComponents/MaterialIconComponents";
import { MdUploadFile, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import"./style_form.css";
import { useError } from "../errorBox";
import { useSuccess } from "../successBox";

const AddTenantForm = ({unitDetails,onClose,onAddition})=>{
    const { register, handleSubmit, watch, formState: { errors }, setValue} = useForm();
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("No File Selected");
    const showError = useError()
    const showSuccess = useSuccess()
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
      fontSize: "25px",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "0.17px",
      marginTop: "10px",   
      marginLeft: "30px"
    };
    
    const onSubmit = async(data)=>{
        const {images,tenantName, email, contact} = data // data collected from form
        const userID = "64873c12bd2e5989a5e90e1c" /** TODO: Get from user session */
        console.log("Sending unit details")
        console.log(unitDetails)
        const {unitNumber,_id} = unitDetails
        const addTenant = async()=>{
          const imageList = [];
          for (let i = 0; i < images.length; i++) {
            const base64Image = await convertToBase64(images[i]);
            imageList.push(base64Image);
          }
          const tenantObject = {
            email,
            contact,
            tenantName,
            unitNumber,
            unitRef:_id,
            landlordRef:userID,
            images: imageList,
          };
        
          try {
            const result = await axios.post("http://localhost:8000/landlord/addTenants", tenantObject); 
            if (result.status === 200) {
              showSuccess("Added Tenant successfully",3000)
              onClose();
              onAddition();
            }
          } catch (error) {
            showError("Error adding Tenant",3000);
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
        addTenant();
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
        <div className="style-form-container">
          <tableIcons.Close onClick={onClose} />
        </div>
        <Typography variant="h4" gutterBottom style={{ fontSize: "20px" }}>
          Add Tenant
        </Typography>
        <Grid item xs={20}>
          <div className="input-with-icon">
          <tableIcons.Person className="icon" />
            <input
              type="text"
              placeholder="Tenant Name"
              {...register("tenantName", { required: true })}
            />
            {errors.tenantName && <span>Tenant Name is required</span>}
          </div>
          <div className="input-with-icon">
          <tableIcons.Email className="icon" />
            <input
              type="text"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="input-with-icon">
          <tableIcons.Call className="icon" />
            <input
              type="text"
              placeholder="Contact Number"
              {...register("contact", { required: true })}
            />
          </div>

          <div className="input-with-icon">
            <label style={{ fontSize: "15px",marginRight: "5px" }}>Unit number: </label>
            <span style={{ fontSize: "15px" }}>{unitDetails?.unitNumber}</span>
          </div>

          <label>Attach Tenant Image (optional)</label>
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
        <Grid item xs={12} style={{ textAlign: "center", marginTop:"10px" }}>
          <input type="submit" />
          {errors.tenantName && <span>Tenant Name is required</span>}
        </Grid>
      </form>
      <showError/>
      <showSuccess/>
    </div>
  );
};
export default AddTenantForm;