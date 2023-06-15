import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/loginPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={LoginPage} />
      </Routes>
    </Router>
  );
}

export default App;
