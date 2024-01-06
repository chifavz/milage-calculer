// netlify/functions/myFunction.js

export async function handler() {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello from myFunction!" }),
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }
  