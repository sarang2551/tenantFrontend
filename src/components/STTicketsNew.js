import React from 'react';

function Ticket({ tickets }) {
  return (
    <div>
      {tickets.map((ticket, index) => (
        <article className="ticket" key={index}>
          <header className="ticket__wrapper">
            <div className="ticket__header">
              {index + 1} 🎟
            </div>
          </header>
          <div className="ticket__divider">
            <div className="ticket__notch"></div>
            <div className="ticket__notch ticket__notch--right"></div>
          </div>
          <div className="ticket__body">
            <section className="ticket__section">
              <h3>Description</h3>
              <p>{ticket.description}</p>
            </section>
          </div>
          <div className="ticket__body">
            <section className="ticket__section">
              <h3>Date</h3>
              <p>{ticket.date}</p>
            </section>
          </div>
          <div className="ticket__body">
            <section className="ticket__section">
              <h3>Comments</h3>
              <p>{ticket.comments}</p>
            </section>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Ticket;
