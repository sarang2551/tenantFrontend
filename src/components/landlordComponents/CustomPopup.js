import React from "react";
import styled from "styled-components";

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: 'auto';
`;

const PopupContainer = styled.div`
  max-width: 500px; /* Adjust the width as needed */
  max-height: 800px; /* Adjust the height as needed */
  padding: 20px;
  background-color: white;
  border-radius: 30px;
  overflow: 'auto';
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const CustomPopup = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <PopupOverlay>
      <PopupContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </PopupContainer>
    </PopupOverlay>
  );
};

export default CustomPopup;