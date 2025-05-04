import React from 'react';
import '../styles/style.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="top-bar">
      <button onClick={toggleSidebar} className="burger-btn">
        <i className="fas fa-bars"></i>
      </button>
      <h1 className="page-title">Collab Notes</h1>
      <i className="fas fa-user-circle profile-icon"></i>
    </header>
  );
};

export default Header;


