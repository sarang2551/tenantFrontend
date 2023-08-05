import React from 'react';


function Ticket({STData}) {
  const {idx,description,startDate,title} = STData
  return (
    <article className="ticket">
      <header className="ticket__wrapper">
        <div className="ticket__header">
          {idx + 1} 🎟 
        </div>
      </header>
      <div className="ticket__divider">
        <div className="ticket__notch"></div>
        <div className="ticket__notch ticket__notch--right"></div>
      </div>
      <div className="ticket__body">
        <section className="ticket__section">
          <h3>Title</h3>
          <p>{title}</p>
        </section>
      </div>
      <div className="ticket__body">
        <section className="ticket__section">
          <h3>Start Date</h3>
          <p>{startDate}</p>
        </section>
      </div>
      <div className="ticket__body">
        <section className="ticket__section">
          <h3>Description</h3>
          <p>{description}</p>
        </section>
      </div>
    </article>
  );
}

export default Ticket;
