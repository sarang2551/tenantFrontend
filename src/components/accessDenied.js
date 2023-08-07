import React from 'react';

const styles = {
  root: {
    height: '100vh',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '24px', // Increase font size as needed
  },
  h1: {
    color: 'red',
    fontSize: '100px', // Increase font size as needed
  },
  h6: {
    color: 'red',
    textDecoration: 'underline',
    fontSize: '30px', // Increase font size as needed
  },
};

function AccessDenied() {
  return (
    <div style={styles.root}>
      <div className="w3-display-middle">
        <h1 className="w3-jumbo w3-animate-top w3-center" style={styles.h1}>
          <code>Access Denied</code>
        </h1>
        <hr className="w3-border-white w3-animate-left" style={{ margin: 'auto', width: '50%' }} />
        <h3 className="w3-center w3-animate-right" style={{fontSize:'30px'}}>You don't have permission to view this site.</h3>
        <h3 className="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
        <h6 className="w3-center w3-animate-zoom" style={styles.h6}>
          error code: 403 forbidden
        </h6>
      </div>
    </div>
  );
}

export default AccessDenied;