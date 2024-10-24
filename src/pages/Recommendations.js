import React from 'react';
import { FaLightbulb, FaThermometerHalf, FaPlug, FaRecycle } from 'react-icons/fa';
import './Recommendations.css';

const recommendations = [
  {
    id: 1,
    title: 'Switch to LED Bulbs',
    description: 'Replace your old incandescent bulbs with energy-efficient LED bulbs to save up to 75% on lighting costs.',
    icon: <FaLightbulb />,
    category: 'Lighting'
  },
  {
    id: 2,
    title: 'Optimize Thermostat Settings',
    description: 'Adjust your thermostat by a few degrees to significantly reduce heating and cooling costs.',
    icon: <FaThermometerHalf />,
    category: 'HVAC'
  },
  {
    id: 3,
    title: 'Unplug Idle Electronics',
    description: 'Disconnect devices and appliances when not in use to eliminate phantom energy consumption.',
    icon: <FaPlug />,
    category: 'Electronics'
  },
  {
    id: 4,
    title: 'Recycle and Reduce',
    description: 'Implement a comprehensive recycling program to minimize waste and conserve energy.',
    icon: <FaRecycle />,
    category: 'Lifestyle'
  }
];

function Recommendations() {
  return (
    <div className="recommendations">
      <h1>Energy Saving Recommendations</h1>
      <div className="recommendations-grid">
        {recommendations.map(recommendation => (
          <div key={recommendation.id} className="recommendation-card">
            <div className="recommendation-icon">{recommendation.icon}</div>
            <h2>{recommendation.title}</h2>
            <p className="category">{recommendation.category}</p>
            <p>{recommendation.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;