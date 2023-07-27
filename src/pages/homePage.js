import React, { useEffect, useState } from 'react'; 
import Navbar from '../components/headers/NavBar'; 
import axios from "axios"; 
import "../components/headers/assets/css/style.css"; 
import "../components/headers/assets/css/STstyle.css"; 
import Pie from '../components/Pie';
import Ticket from '../components/STTicketsNew';



function Home() { 
  const [ticketData, setTicketData] = useState([]);

  const getSTData = async () => {
    const userID = sessionStorage.getItem('userID');
    const response_2 = await axios.get(`http://localhost:8000/tenant/getAllServiceTickets/${userID}`);
    var data_2 = response_2.data;
    if (data_2) {
      setTicketData(data_2);
    } else {
      console.log("Error getting all service tickets");
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
        <div class="hero_right">
          <section class="home-collection-right">
            <div class="home-main">
              <div class="home-container3">
                {ticketData.map((serviceTicket, idx) => (
                  <Ticket key={idx} STData={{ idx, ...serviceTicket }} />
                ))}

              </div> 
            </div>
          </section>
        </div>
      </div> 
    </div>
  );
}

export default Home;
