// netlify/functions/googleMapsProxy.js
import fetch from 'node-fetch';

export async function handler (event, _context) {
  try {
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
    const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json${event.body}&key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
  }
}

  