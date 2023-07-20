import React from 'react' 
import Navbar from '../components/headers/NavBar' 
import axios from "axios" 
import "../components/headers/assets/css/style.css" 
import "../components/headers/assets/css/STstyle.css" 
import Pie from '../components/Pie'
import Ticket from '../components/STTicketsNew'


function Home() { 
  const testingServer = async()=>{ 
    console.log("Clicked button") 
    const getTenant = { 
        name: 'test', 
        password: 'test123', 
      }; 
    await axios.post("http://localhost:8000/tenant/tenantLogin",getTenant).then(response => { 
        console.log('Response:', response.data); 
      }) 
      .catch(error => { 
        console.error('Error:', error); 
      }); 
  } 
  const ticketData = [
    {
      description: 'Level 1 Aircon',
      date: '20 Oct 2023',
      comments: 'the aircon smoking'
    },
    {
      description: 'Level 2 Aircon',
      date: '21 Oct 2023',
      comments: 'cooling issue'
    },
    {
      description: 'Level 3 Aircon',
      date: '22 Oct 2023',
      comments: 'strange noise'
    }
    // Add more 
  ];
  
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
{/* 
                  <div class="home-container7"><span class="home-text10">Date</span></div> */}

                </div>
              </section>
              
            </div> 
            <div class ="hero_right">
              <section class="home-collection-right">
              <div class="home-main">
   
                <div class="home-container3">


                    <Ticket tickets = {ticketData}/>






              </div> 
              </div>
                
              </section>
            </div>
        </div> 
  </div>
)} 
export default Home

//change

                  // {/* /* <span class="home-caption">DASHBOARD</span> */ */}
                                    {/* <div class="home-card">
                    <div class="home-image2">
                      <img
                        alt="image"
                        src="/icons8-synchronize.svg"
                        class="home-image3"
                      />
                    </div>
                    <div class="home-content1">
                      <span class="home-caption1">
                        <span>Pending: 07</span>
                      </span>
                    </div>
                  </div>
                  <div class="home-card1">
                    <div class="home-image4">
                      <img alt="image" src="/icons8-news.svg" class="home-image5" />
                    </div>
                    <div class="home-content2">
                      <span class="home-caption2">Tickets: 05</span>
                    </div>
                  </div>
                  <div class="home-card2">
                    <div class="home-image6">
                      <img alt="image" src="/icons8-work.svg" class="home-image7" />
                    </div>
                    <div class="home-content3">
                      <span class="home-caption3">Ongoing: 05</span>
                    </div>
                  </div> */}


                //   <div class="home-container8">
                //   <input type="checkbox" checked="true" class="home-checkbox" />
                //   <input type="checkbox" checked="true" class="home-checkbox1" />
                //   <input type="checkbox" checked="true" class="home-checkbox2" />
                //   <input type="checkbox" checked="true" class="home-checkbox3" />
                //   <input type="checkbox" checked="true" class="home-checkbox4" />
                //   <input type="checkbox" checked="true" class="home-checkbox5" />
                // </div>