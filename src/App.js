import React, { useState } from 'react';
import './App.css';

function App() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [totalDistance, setTotalDistance] = useState(null);
  const [error, setError] = useState(null);

  const calculateDistance = async () => {
    try {
      if (!startLocation.trim() || !endLocation.trim()) {
        setError('Please enter both start and end locations.');
        return;
      }

      // Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key
      const apiKey = 'AIzaSyBDby7WmE2d8hmnLUK5pK5qTUQKCVCeTDE';
      const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${startLocation}&destinations=${endLocation}&key=${apiKey}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 'OK') {
        const distanceInMeters = data.rows[0].elements[0].distance.value;
        const distanceInMiles = distanceInMeters * 0.000621371; // Convert meters to miles
        setTotalDistance(distanceInMiles.toFixed(2));
        setError(null);
      } else {
        setError('Error calculating distance. Please check your locations and try again.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Distance Calculator</h1>
      <div>
        <label>
          Start Location:
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          End Location:
          <input
            type="text"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
          />
        </label>
      </div>
      <button onClick={calculateDistance}>Calculate Distance</button>
      {error && <div className="error">{error}</div>}
      {totalDistance !== null && (
        <div>
          <h2>Total Distance: {totalDistance} miles</h2>
        </div>
      )}
    </div>
  );
}

export default App;





