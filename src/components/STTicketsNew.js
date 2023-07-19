import React from 'react';

function Ticket() {
  return (
    <article className="ticket">
      <header className="ticket__wrapper">
        <div className="ticket__header">
          1 🎟
        </div>
      </header>
      <div className="ticket__divider">
        <div className="ticket__notch"></div>
        <div className="ticket__notch ticket__notch--right"></div>
      </div>
      <div className="ticket__body">
        <section className="ticket__section">
          <h3>Description</h3>
          <p>Level 1 Aircon</p>
        </section>
      </div>
      <div className="ticket__body">
        <section className="ticket__section">
          <h3>Date</h3>
          <p>20 Oct 2023</p>
        </section>
      </div>
      <div className="ticket__body">
        <section className="ticket__section">
          <h3>Comments</h3>
          <p>the aircon smoking</p>
        </section>
      </div>
    </article>
  );
}

export default Ticket;
