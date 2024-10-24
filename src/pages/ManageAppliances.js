import React, { useState, useEffect } from 'react';
import './ManageAppliances.css';

function ManageAppliances() {
  const [appliances, setAppliances] = useState([]);
  const [changedAppliances, setChangedAppliances] = useState({});

  useEffect(() => {
    const savedAppliances = JSON.parse(localStorage.getItem('scannedAppliances') || '[]');
    setAppliances(savedAppliances);
  }, []);

  const handleNameChange = (id, newName) => {
    setAppliances(appliances.map(app => 
      app.id === id ? { ...app, name: newName } : app
    ));
    setChangedAppliances({...changedAppliances, [id]: true});
  };

  const handleUsageChange = (id, newUsage) => {
    setAppliances(appliances.map(app => 
      app.id === id ? { ...app, usage: newUsage } : app
    ));
    setChangedAppliances({...changedAppliances, [id]: true});
  };

  const handleUpdate = (id) => {
    localStorage.setItem('scannedAppliances', JSON.stringify(appliances));
    setChangedAppliances({...changedAppliances, [id]: false});
  };

  const handleRemove = (id) => {
    const updatedAppliances = appliances.filter(app => app.id !== id);
    setAppliances(updatedAppliances);
    localStorage.setItem('scannedAppliances', JSON.stringify(updatedAppliances));
    const newChangedAppliances = {...changedAppliances};
    delete newChangedAppliances[id];
    setChangedAppliances(newChangedAppliances);
  };

  const calculatePowerConsumption = (usage, wattage) => {
    return (usage * wattage) / 1000; // Convert to kWh
  };

  return (
    <div className="manage-appliances">
      <h1>Manage Appliances</h1>
      <div className="appliance-grid">
        {appliances.map(appliance => (
          <div key={appliance.id} className="appliance-card">
            <img src={appliance.image} alt={appliance.name} className="appliance-image" />
            <div className="appliance-details">
              <input
                type="text"
                value={appliance.name}
                onChange={(e) => handleNameChange(appliance.id, e.target.value)}
                className="appliance-name"
              />
              <p>Type: {appliance.type || 'Unknown'}</p>
              <p>Wattage: {appliance.wattage} W</p>
              <div className="usage-control">
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={appliance.usage}
                  onChange={(e) => handleUsageChange(appliance.id, parseInt(e.target.value))}
                />
                <span>{appliance.usage} hours/day</span>
              </div>
              <p>Daily Power Consumption: {calculatePowerConsumption(appliance.usage, appliance.wattage).toFixed(2)} kWh</p>
              {changedAppliances[appliance.id] && (
                <button onClick={() => handleUpdate(appliance.id)} className="update-btn">Update</button>
              )}
              <button onClick={() => handleRemove(appliance.id)} className="remove-btn">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageAppliances;
