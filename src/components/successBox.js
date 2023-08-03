import React, { useState, useEffect ,createContext,useContext} from 'react';

const SuccessContext = createContext();

export const SuccessProvider = ({ children }) => {
  const [successShow, setSuccessShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [timer, setTimer] = useState(null);

  const showSuccess = (message, duration = 3000) => {
    setSuccessMessage(message);
    setSuccessShow(true);

    if (timer) clearTimeout(timer);

    setTimer(
      setTimeout(() => {
        setSuccessShow(false);
      }, duration)
    );
  };

  //avoid memory leaks
  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  const successStyles = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'green',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    animation: 'slide-in 0.5s ease-out',
  };

  const SuccessMessage = () => {
    return (
      successShow && (
        <div style={successStyles}>
          {successMessage}
        </div>
      )
    );
  };

  return (
    <SuccessContext.Provider value={{ successShow, showSuccess }}>
      {children}
      <SuccessMessage />
    </SuccessContext.Provider>
  );
};

export const useSuccess = () => {
  return useContext(SuccessContext);
};
