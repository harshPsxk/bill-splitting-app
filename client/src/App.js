import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
// import other components as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Define other routes here */}
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root to login */}
      </Routes>
    </Router>
  );
}

export default App;
