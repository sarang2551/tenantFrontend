import React, { useEffect, useState } from 'react'; 
import Navbar from '../components/headers/NavBar'; 
import axios from "axios"; 
import "../components/headers/assets/css/style.css"; 
import "../components/headers/assets/css/STstyle.css"; 
import Pie from '../components/Pie';
import Ticket from '../components/STTicketsNew';
import {Swiper, SwiperSlide} from "swiper/react";
// import "swiper/css"
// import 'swiper/css/scrollbar';
import {Scrollbar,Mousewheel} from "swiper/modules";
// import "../components/headers/assets/css/swipe.css"; /* swiper-custom.css */



function Home() { 
  const [ticketData, setTicketData] = useState([]);

  const getSTData = async () => {
    const userID = sessionStorage.getItem('userID');
    const response_2 = await axios.get(`http://localhost:8000/tenant/getAllServiceTickets/${userID}`);
    var data_2 = response_2.data;
    if (data_2) {
      setTicketData(data_2);
      console.log(data_2)
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
        {/* <div class="home-container3top"></div> */}
        <div class="hero_right">
          <section class="home-collection-right">
            <div class="home-main">
              
              <div class="home-container3">
                <div class="home-container3top">
                <button class="currentbutton">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none" class="svg-icon"><g stroke-width="2" stroke-linecap="round" stroke="#fff"><rect y="5" x="4" width="16" rx="2" height="16"></rect><path d="m8 3v4"></path><path d="m16 3v4"></path><path d="m4 11h16"></path></g></svg>
                <span class="currentlabel">Current Tickets</span>
              </button>
              <button class="progressbutton">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none" class="svg-icon"><g stroke-width="2" stroke-linecap="round" stroke="#fff"><rect y="5" x="4" width="16" rx="2" height="16"></rect><path d="m8 3v4"></path><path d="m16 3v4"></path><path d="m4 11h16"></path></g></svg>
                <span class="currentlabel">In-Progress Tickets</span>
              </button>
              <button class="completedbutton">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none" class="svg-icon"><g stroke-width="2" stroke-linecap="round" stroke="#fff"><rect y="5" x="4" width="16" rx="2" height="16"></rect><path d="m8 3v4"></path><path d="m16 3v4"></path><path d="m4 11h16"></path></g></svg>
                <span class="currentlabel">Completed Tickets</span>
              </button>
                </div>

                <Swiper
                autoHeight = {false}
                 
                spaceBetween={200}
                slidesPerView={2}
                modules={[Scrollbar,Mousewheel]}
                mousewheel={{
                  enable: true,
                  sensitivity: 10,}
                }
                scrollbar={{ draggable: true }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {ticketData.map((ticket,idx)=><SwiperSlide>
                  <Ticket STData={{idx,...ticket}}/>
                </SwiperSlide>)}
              </Swiper>
               {/* {ticketData.map((ticket, idx) => <Ticket key={ticket.id} STData={{ idx, ...ticket }} />)} */}

              </div> 
            </div>
          </section>
        </div>
      </div> 
    </div>
  );
}

export default Home;
