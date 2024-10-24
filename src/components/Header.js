import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/scan">Scan Appliance</Link></li>
          <li><Link to="/footprint">Carbon Footprint</Link></li>
          <li><Link to="/recommendations">Recommendations</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;