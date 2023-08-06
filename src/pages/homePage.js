import React, { useEffect, useState } from 'react'; 
import Navbar from '../components/headers/NavBar'; 
import axios from "axios"; 
import "../components/headers/assets/css/style.css"; 
import "../components/headers/assets/css/STstyle.css"; 
import Pie from '../components/Pie';
import RentHover from '../components/tenantComponents/RentHover';
import QuotationHover from '../components/tenantComponents/QuotationHover';
import OverallHover from '../components/tenantComponents/OverallHover';
import { useError } from '../components/errorBox';



function Home() { 

  //const [ticketData, setTicketData] = useState([]);
  const [r_q_data,setRQData] = useState({
    TotalRent:0,
    TotalQuotation:0,
  })
  const showError = useError()
  const getSTData = async () => {
  const userID = sessionStorage.getItem('userID');
  // const response_2 = await axios.get(`http://localhost:8000/tenant/getAllServiceTickets/${userID}`);
  // var data_2 = response_2.data;
  // if (data_2) {
  //   setTicketData(data_2);
  // } else {
  //   showError("Error getting all service tickets",3000);
  // }
  const response = await axios.get(`http://localhost:8000/tenant/getRent&Quotation/${userID}`);
  if(response.status === 200){
    setRQData(response.data)
  }else{
    showError("Error getting rent and quotation data")
  }
  }
  
  useEffect(() => {
    getSTData();
  }, []);

  return ( 
    <div> 
      <Navbar/> 
      <div class="container hero"> 
        <div class="hero__left"> 
          <section class="home-collection">
            <div class="home-content">
              <Pie/>
            </div>
            <div class="home-container4">
              {/* <div class="home-container5">
                    <span class="home-text08">Description</span>
              </div> */}
              {/* <div class="home-container7"><span class="home-text10">Date</span></div> */}
            </div>
          </section>
        </div> 
        {/* <div class="home-container3top"></div> */}
        <div class="hero_right">
          <section class="home-collection-right">
            <div class="home-main">
              <div class="home-container3">
                <div class="home-container3top">
                  <RentHover TotalRent={r_q_data.TotalRent}/>
                  <QuotationHover TotalQuotation={r_q_data.TotalQuotation}/>
                  <OverallHover Total={r_q_data.TotalRent+r_q_data.TotalQuotation}/>
                </div>
              </div> 
            </div>
          </section>
        </div>
      </div> 
    </div>
  );
}

export default Home;

