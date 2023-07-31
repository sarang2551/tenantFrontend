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


const QuotationForm = ({onSubmission,ticketData})=>{
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
    const userType = sessionStorage.getItem("userType")
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("No File Selected");
    const [processedImage,setProcessedImage] = useState()
    const convertToImage = async (imageUrl) => {
      try {
        const response = await fetch(imageUrl)
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        return objectURL;
      } catch (error) {
        console.error('Error converting image:', error);
        return null;
      }
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
        {/* {ticketData.quotationDocument && <img src={processedImage}/>} */}
        <span>Quotation Amount: {ticketData.quotationAmount}</span>
        <button type="submit" onClick={()=>tenantSubmit(true)}>Accept Quotation</button>
        <button type="submit" onClick={()=>tenantSubmit(false)}>Reject Quotation</button>
       </form> : 
       <form onSubmit={handleSubmit(landlordSubmit)} >
        <div className="input-with-icon">
              <div style={fileupload} onClick={() => 
                document.querySelector(".input-field").click()}>
                <input type="file" className="input-field" hidden onChange={handleFileChange} multiple />
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