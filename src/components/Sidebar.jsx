import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

const Sidebar = ({ sidebarOpen, toggleSidebar, showFloatingMenu }) => {
  return (
    <nav className={`side-nav ${sidebarOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>×</button>
      <ul>
        <li><Link to="/dashboard" onClick={toggleSidebar}>Dashboard</Link></li>
        <li><a href="#class10">Class 10</a></li>
        <li><a href="#class11">Class 11</a></li>
        <li><a href="#class12">Class 12</a></li>

        <li className="submenu-header">Engineering</li>
        {['Mechanical', 'Electrical', 'Electronics & Comm', 'Civil', 'Computer Science', 'Information Sciences', 'CS - AI/ML'].map(branch => (
          <li key={branch}>
            <a href="#branch" onClick={(e) => showFloatingMenu(branch.toLowerCase().replace(/[^a-z]/g, ''), e)}>
              {branch} <i className="fas fa-chevron-right small-arrow"></i>
            </a>
          </li>
        ))}

        <li><a href="#medical">Medical</a></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
