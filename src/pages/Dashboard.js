import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2023-05-01', energy: 4000 },
  { date: '2023-05-02', energy: 3000 },
  { date: '2023-05-03', energy: 2000 },
  { date: '2023-05-04', energy: 2780 },
  { date: '2023-05-05', energy: 1890 },
  { date: '2023-05-06', energy: 2390 },
  { date: '2023-05-07', energy: 3490 },
];

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="grid">
        <div className="card">
          <h2>Past Entries</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="energy" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h2>Energy Saving Tips</h2>
          <ul>
            <li>Turn off lights when not in use</li>
            <li>Use energy-efficient appliances</li>
            <li>Adjust thermostat settings</li>
            <li>Unplug devices when not in use</li>
          </ul>
        </div>
        <div className="card">
          <h2>Quick Stats</h2>
          <p>Total Energy Used: 19,550 kWh</p>
          <p>Avg. Daily Usage: 2,792 kWh</p>
          <p>Most Active Day: Monday</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;