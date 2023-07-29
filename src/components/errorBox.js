import React, { useState, useEffect } from 'react';

const ErrorMessage = ({ message }) => {
  const errorStyles = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'red',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    animation: 'slide-in 0.5s ease-out',
  };

  return (
    <div style={errorStyles}>
      {message}
    </div>
  );
};

export default ErrorMessage;
