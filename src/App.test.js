import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock fetch for testing
global.fetch = jest.fn();

describe('App Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders distance calculator title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Distance Calculator/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders input fields and button', () => {
    render(<App />);
    
    expect(screen.getByLabelText(/Start Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Location/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Calculate Distance/i })).toBeInTheDocument();
  });

  test('shows error when fields are empty', async () => {
    render(<App />);
    
    const button = screen.getByRole('button', { name: /Calculate Distance/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/Please enter both start and end locations/i)).toBeInTheDocument();
    });
  });

  test('shows error when API key is missing', async () => {
    // Remove API key for this test
    delete process.env.REACT_APP_API_KEY;
    
    render(<App />);
    
    const startInput = screen.getByLabelText(/Start Location/i);
    const endInput = screen.getByLabelText(/End Location/i);
    const button = screen.getByRole('button', { name: /Calculate Distance/i });
    
    fireEvent.change(startInput, { target: { value: 'New York' } });
    fireEvent.change(endInput, { target: { value: 'Boston' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/API key is not configured/i)).toBeInTheDocument();
    });
  });

  test('shows loading state during calculation', async () => {
    // Mock successful API response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 'OK',
        rows: [{
          elements: [{
            status: 'OK',
            distance: { value: 321868 } // meters
          }]
        }]
      })
    });

    process.env.REACT_APP_API_KEY = 'test-key';
    
    render(<App />);
    
    const startInput = screen.getByLabelText(/Start Location/i);
    const endInput = screen.getByLabelText(/End Location/i);
    const button = screen.getByRole('button', { name: /Calculate Distance/i });
    
    fireEvent.change(startInput, { target: { value: 'New York' } });
    fireEvent.change(endInput, { target: { value: 'Boston' } });
    fireEvent.click(button);
    
    // Check for loading state
    expect(screen.getByText(/Calculating.../i)).toBeInTheDocument();
    expect(button).toBeDisabled();
    
    // Wait for result
    await waitFor(() => {
      expect(screen.getByText(/Total Distance: 200.00 miles/i)).toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));
    
    process.env.REACT_APP_API_KEY = 'test-key';
    
    render(<App />);
    
    const startInput = screen.getByLabelText(/Start Location/i);
    const endInput = screen.getByLabelText(/End Location/i);
    const button = screen.getByRole('button', { name: /Calculate Distance/i });
    
    fireEvent.change(startInput, { target: { value: 'New York' } });
    fireEvent.change(endInput, { target: { value: 'Boston' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/An error occurred while calculating distance/i)).toBeInTheDocument();
    });
  });

  test('handles no route found scenario', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 'OK',
        rows: [{
          elements: [{
            status: 'ZERO_RESULTS'
          }]
        }]
      })
    });

    process.env.REACT_APP_API_KEY = 'test-key';
    
    render(<App />);
    
    const startInput = screen.getByLabelText(/Start Location/i);
    const endInput = screen.getByLabelText(/End Location/i);
    const button = screen.getByRole('button', { name: /Calculate Distance/i });
    
    fireEvent.change(startInput, { target: { value: 'Invalid Location 1' } });
    fireEvent.change(endInput, { target: { value: 'Invalid Location 2' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/No route found between the specified locations/i)).toBeInTheDocument();
    });
  });
});