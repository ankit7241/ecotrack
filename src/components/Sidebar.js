import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="logo">EcoTrack</div>
      <ul>
        <li><NavLink to="/" end>Dashboard</NavLink></li>
        <li><NavLink to="/scan">Scan Appliance</NavLink></li>
        <li><NavLink to="/manageappliances">Manage Appliances</NavLink></li>
        <li><NavLink to="/footprint">Carbon Footprint</NavLink></li>
        <li><NavLink to="/recommendations">Recommendations</NavLink></li>
      </ul>
    </nav>
  );
}

export default Sidebar;