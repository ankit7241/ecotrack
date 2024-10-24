import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios: npm install axios
import './ApplianceScanner.css';

function ApplianceScanner() {
  const [image, setImage] = useState(null);
  const [deviceDetails, setDeviceDetails] = useState({
    name: '',
    usage: '',
    type: '', // Add this to store the device type
    wattage: 0,
  });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target.result;
        setImage(imageData);
        localStorage.setItem('lastScannedApplianceImage', imageData);
        
        try {
          const formData = new FormData();
          formData.append('file', file);
          const response = await axios.post('http://127.0.0.1:7000/predict/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          });
          
          const deviceType = response.data.type;
          console.log('Detected Device Type:', deviceType);
          
          // Fetch wattage information
          const wattageResponse = await axios.get(`http://127.0.0.1:7000/appliance_info/${deviceType}`);
          const { wattage } = wattageResponse.data;
          
          setDeviceDetails(prevDetails => ({
            ...prevDetails,
            type: deviceType,
            wattage: wattage,
          }));
        } catch (error) {
          console.error('Error:', error);
          alert('Failed to process the image. Please try again.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDeviceDetails(prevDetails => ({
      ...prevDetails,
      [name]: name === 'usage' ? (value === '' ? '' : parseInt(value)) : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const appliance = {
      name: deviceDetails.name,
      usage: deviceDetails.usage === '' ? 0 : parseInt(deviceDetails.usage),
      image: image,
      id: Date.now(),
      type: deviceDetails.type,
      wattage: deviceDetails.wattage,
    };
    const existingAppliances = JSON.parse(localStorage.getItem('scannedAppliances') || '[]');
    existingAppliances.push(appliance);
    localStorage.setItem('scannedAppliances', JSON.stringify(existingAppliances));

    setImage(null);
    setDeviceDetails({ name: '', usage: '', type: '', wattage: 0 });
    alert('Appliance saved successfully!');
  };

  return (
    <div className="appliance-scanner">
      <h1>Scan Your Appliance</h1>
      <div className="upload-container">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          id="upload-input"
          className="upload-input"
        />
        <label htmlFor="upload-input" className="upload-label">
          {image ? 'Change Image' : 'Upload Image'}
        </label>
      </div>
      {image && (
        <div className="image-preview">
          <img src={image} alt="Uploaded appliance" />
        </div>
      )}
      {image && (
        <form onSubmit={handleSubmit} className="device-details-form">
          <input
            type="text"
            name="name"
            value={deviceDetails.name}
            onChange={handleInputChange}
            placeholder="Device Name"
            required
          />
          <input
            type="number"
            name="usage"
            value={deviceDetails.usage}
            onChange={handleInputChange}
            placeholder="Usage (hours per day)"
            min="0"
            max="24"
            required
          />
          {deviceDetails.type && (
            <p>Detected Device Type: {deviceDetails.type}</p>
          )}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default ApplianceScanner;
