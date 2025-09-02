# Mileage Calculator

A React-based web application for calculating distances between two locations using the Google Maps Distance Matrix API.

## Features

- Calculate driving distance between any two locations
- Real-time input validation
- Loading states and comprehensive error handling
- Responsive design
- Conversion from metric to imperial units (miles)

## Prerequisites

Before running this application, you need:

1. **Node.js** (version 14 or higher)
2. **Google Maps API Key** with Distance Matrix API enabled

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/chifavz/milage-calculer.git
cd milage-calculer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add your Google Maps API key:

```env
REACT_APP_API_KEY=your_google_maps_api_key_here
```

**Important Security Note**: 
- For production deployments, consider using the Netlify function proxy instead of direct API calls
- Set up API key restrictions in the Google Cloud Console
- Use environment variables for the Netlify function: `GOOGLE_MAPS_API_KEY`

### 4. Enable Google Maps APIs

In the Google Cloud Console:
1. Enable the **Distance Matrix API**
2. Create an API key
3. (Optional) Set up API key restrictions for security

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner with comprehensive unit tests

### `npm run build`
Builds the app for production to the `build` folder

## Deployment

### Netlify Deployment

This app includes Netlify Functions for secure API proxy usage:

1. Connect your repository to Netlify
2. Set environment variable: `GOOGLE_MAPS_API_KEY=your_api_key`
3. Build command: `npm run build`
4. Publish directory: `build`

### Security Considerations

- API keys are kept secure through environment variables
- Input validation prevents injection attacks
- Proper error handling protects against information disclosure
- The Netlify function provides a secure proxy for API calls

## Usage

1. Enter a starting location (address, city, or landmark)
2. Enter a destination location
3. Click "Calculate Distance"
4. View the distance result in miles

## Error Handling

The application handles various error scenarios:
- Empty input fields
- Invalid locations
- Network connectivity issues
- API key configuration problems
- No route available between locations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Technical Details

- **Frontend**: React 18 with functional components and hooks
- **Styling**: CSS3 with responsive design
- **Testing**: Jest and React Testing Library
- **API**: Google Maps Distance Matrix API
- **Deployment**: Optimized for Netlify with serverless functions
