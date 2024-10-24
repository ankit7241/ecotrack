import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

function CarbonFootprint() {
  const [appliances, setAppliances] = useState([]);
  const [totalFootprint, setTotalFootprint] = useState(0);

  useEffect(() => {
    const savedAppliances = JSON.parse(localStorage.getItem('scannedAppliances') || '[]');
    setAppliances(savedAppliances);

    const total = savedAppliances.reduce((acc, appliance) => {
      const dailyConsumption = (appliance.usage * appliance.wattage) / 1000; // kWh
      return acc + (dailyConsumption * 0.4); // Assuming 0.4 kg CO2 per kWh
    }, 0);

    setTotalFootprint(total);
  }, []);

  const data = appliances.map(appliance => ({
    name: appliance.name,
    value: ((appliance.usage * appliance.wattage) / 1000) * 0.4
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div>
      <h1>Carbon Footprint</h1>
      <div className="grid">
        <div className="card">
          <h2>Carbon Emission Sources</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx={200}
              cy={200}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div className="card">
          <h2>Total Carbon Footprint</h2>
          <p>Your total daily carbon footprint: {totalFootprint.toFixed(2)} kg CO2e</p>
          <p>This is equivalent to:</p>
          <ul>
            <li>Driving {(totalFootprint * 2.5).toFixed(2)} miles in an average car</li>
            <li>The energy use of an average home for {(totalFootprint / 30).toFixed(2)} days</li>
          </ul>
        </div>
        <div className="card">
          <h2>Reduction Tips</h2>
          <ul>
            <li>Use energy-efficient appliances</li>
            <li>Reduce usage of high-wattage devices</li>
            <li>Switch to renewable energy sources</li>
            <li>Unplug devices when not in use</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CarbonFootprint;
