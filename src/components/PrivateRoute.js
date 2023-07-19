import React from 'react';
import {Navigate} from 'react-router-dom';

function PrivateRoute({ isAuthenticated ,desiredUser , children }) {

  const currentUserType = sessionStorage.getItem('userType');
  isAuthenticated = currentUserType === desiredUser 
  if (!isAuthenticated) {
    return <Navigate to="/" replace /> /**TODO: Show an error instead of straight away rerouting */
  }
  return children
}
export default PrivateRoute;