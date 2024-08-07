import React from 'react';
import './CSS/Loader.css'; // Import the CSS file

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="book">
        <div className="cover"></div>
        <div className="page page1"></div>
        <div className="page page2"></div>
        <div className="page page3"></div>
        <div className="page page4"></div>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Loader;
