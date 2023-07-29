import React, { useState, useEffect ,createContext,useContext} from 'react';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errorShow, setErrorShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState(null);

  const showError = (message, duration = 3000) => {
    setErrorMessage(message);
    setErrorShow(true);

    if (timer) clearTimeout(timer);

    setTimer(
      setTimeout(() => {
        setErrorShow(false);
      }, duration)
    );
  };

  //avoid memory leaks
  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

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

  const ErrorMessage = () => {
    return (
      errorShow && (
        <div style={errorStyles}>
          {errorMessage}
        </div>
      )
    );
  };

  return (
    <ErrorContext.Provider value={{ errorShow, showError }}>
      {children}
      <ErrorMessage />
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  return useContext(ErrorContext);
};

