import React, { useState } from 'react';
import './App.css';

function App() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [totalDistance, setTotalDistance] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const calculateDistance = async () => {
    try {
      if (!startLocation.trim() || !endLocation.trim()) {
        setError('Please enter both start and end locations.');
        return;
      }

      setLoading(true);
      setError(null);
      setTotalDistance(null);

      // Use environment variable for API key
      const apiKey = process.env.REACT_APP_API_KEY;
      
      if (!apiKey) {
        setError('API key is not configured. Please check your environment variables.');
        return;
      }

      const encodedStart = encodeURIComponent(startLocation.trim());
      const encodedEnd = encodeURIComponent(endLocation.trim());
      const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodedStart}&destinations=${encodedEnd}&key=${apiKey}`;
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      if (data.status === 'OK' && data.rows[0]?.elements[0]?.status === 'OK') {
        const element = data.rows[0].elements[0];
        const distanceInMeters = element.distance.value;
        const distanceInMiles = distanceInMeters * 0.000621371; // Convert meters to miles
        setTotalDistance(distanceInMiles.toFixed(2));
        setError(null);
      } else if (data.rows[0]?.elements[0]?.status === 'ZERO_RESULTS') {
        setError('No route found between the specified locations.');
      } else if (data.rows[0]?.elements[0]?.status === 'NOT_FOUND') {
        setError('One or both locations could not be found. Please check your input.');
      } else {
        setError('Error calculating distance. Please check your locations and try again.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setError('An error occurred while calculating distance. Please try again.');
      }
    } finally {
      setLoading(false);
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
      <button onClick={calculateDistance} disabled={loading}>
        {loading ? 'Calculating...' : 'Calculate Distance'}
      </button>
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

