import React, { useState } from 'react';

const QuotationHover = ({TotalQuotation}) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className="quotationcontainer">
      <button
        className="quotationbutton"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          viewBox="0 0 24 24"
          height="24"
          fill="none"
          className="svg-icon"
        >
          <g strokeWidth="2" strokeLinecap="round" stroke="#fff">
            <rect y="5" x="4" width="16" rx="2" height="16"></rect>
            <path d="m8 3v4"></path>
            <path d="m16 3v4"></path>
            <path d="m4 11h16"></path>
          </g>
        </svg>
        <span className="rentlabel">
          {hovered ? TotalQuotation : 'Total Quotation'}
        </span>
      </button>
    </div>
  );
};

export default QuotationHover;
