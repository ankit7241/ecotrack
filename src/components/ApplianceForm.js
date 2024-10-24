import React from 'react';

function ApplianceForm({ appliance }) {
  return (
    <div className="appliance-form">
      <h2>Appliance Details</h2>
      <p>Name: {appliance.name}</p>
      <button>Save Appliance</button>
    </div>
  );
}

export default ApplianceForm;