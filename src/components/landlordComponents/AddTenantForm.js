import React from "react";
import {useForm} from 'react-hook-form'
import "../tenantComponents/st_form_style.css"
import axios from "axios"

const AddTenantForm = ()=>{
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = ()=>{}
    return(
            <form onSubmit={handleSubmit(onSubmit)} >
            <input type='text' placeholder="Tenant Name" {...register("tenantName", { required: true })} />
            <br/>
            <input type='text' placeholder="Unit" {...register("description", { required: true })} />
            <br/>
              Attach Images 
              <input
                    type="file"
                    id="fileInput"
                    multiple 
                    accept="image/*"
                    {...register("images", { required: true })}
                />
                <input type="submit"/>
              {errors.ticket_name && <span>Name is required</span>}
              {errors.description && <span>Description is required</span>}
              {/* {errors.documents && <span>At least one document is required</span>} */}
            </form>
          );
}

export default AddTenantForm;