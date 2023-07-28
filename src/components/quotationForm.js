import React,{useState,useEffect} from "react";
import {useForm} from 'react-hook-form'
import "./tenantComponents/st_form_style.css"
import { MdUploadFile, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import "./landlordComponents/add_building.css"
import axios from "axios";

const fileupload = {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    
    borderRadius: "30px",
    border: "2px solid rgba(49, 54, 56, 0.33)",
    background: "#F2F4F8",

    width: "400px",
    height: "400px",

    marginTop: "50px",
    marginLeft: "100px"
  }

  const fileinfo = {
    color: "#535353",
    fontFamily: "KoHo",
    fontSize: "15px",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.17px",

    marginTop: "10px",
    marginLeft: "100px"
  }
  const spanStyle = {
    fontFamily: ["Arial", "sans-serif"],
    fontSize: "16px",
    color: "#333", /* Change this to the desired text color */
    fontWeight: "bold",
    padding: "5px", /* Add some padding around the text */
    backgroundColor: "#f2f2f2", /* Add a background color */
    border: "1px solid #ccc", /* Add a border around the text */
    borderRadius: "4px", /* Rounded corners for the border */
  }


const QuotationForm = ({onSubmission,ticketData})=>{
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
    const userType = sessionStorage.getItem("userType")
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("No File Selected");

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
    
    const handleFileChange = (e) => {
      if (e.target.files[0]) {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFileName(e.target.files[0].name);
        setValue("images", e.target.files); 
      }
    };
    const landlordSubmit = async(data) => {
      const {quotationAmount} = data
      const image = await convertToBase64(data.images[0]);

      const response = await axios.put("http://localhost:8000/landlord/updateQuotation",
      {quotationAmount,quotationDocument:image,serviceTicketID:ticketData._id})
      if(response.status === 200){
        onSubmission()
      }else{
        console.log(`Error updating quotation`) /**TODO: Add Error component here */
      }
    }
    const tenantSubmit = async(quotationAcceptance) => {
        // add logic for updating
        const userID = sessionStorage.getItem('userID')
        const res = await axios.put("http://localhost:8000/tenant/updateQuotation",{serviceTicketID:ticketData._id,userID,quotationAcceptance})
        
        if(res.status === 200){
          onSubmission()
        }else{
        console.log(`Error ${quotationAcceptance?"Accepting":"Rejecting"} quotation from tenant side`)
        }
    }
    return (
       userType === "tenant" ? 
       <form>
        {ticketData.quotationDocument && <img src={ticketData.quotationDocument}/>}
        <span style={spanStyle}>Quotation Amount: {ticketData.quotationAmount}</span>
        <button type="submit" onClick={()=>tenantSubmit(true)}>Accept Quotation</button>
        <button type="submit" onClick={()=>tenantSubmit(false)}>Reject Quotation</button>
       </form> : 
       <form onSubmit={handleSubmit(landlordSubmit)} >
        <div className="input-with-icon">
              <div style={fileupload} onClick={() => 
                document.querySelector(".input-field").click()}>
                <input type="file" className="input-field" hidden onChange={handleFileChange} />
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
                <br/>
                <label> Quotation Amount: 
                <input type="number" {...register("quotationAmount",{required: true})}/>
                </label>
                <br/>
                {image && <button type="submit">Submit</button>}
              </section>
            </div>

            {errors.quotationAmount && <span>Quotation amount is required</span>}
       </form> 
    )
}

export default QuotationForm;