import { render, screen, waitFor } from '@testing-library/react';
import Footer from './Footer';
import { act } from 'react'; // Import act from react

describe('Recipedetails Component', () => {
  test('displays loading message initially', async () => {
    await act(async () => {
      render(<Recipedetails />);
    });
    
    const loadingElement = screen.getByText(/loading/i); // Adjust text based on your loading message
    expect(loadingElement).toBeInTheDocument();
  });

  test('displays error message when data fetching fails', async () => {
    await act(async () => {
      // Simulate fetch failure (mock fetch or Axios response here)
      render(<Footer />);
    });

    await waitFor(() => {
      const errorElement = screen.getByText(/error/i); // Adjust text based on your error message
      expect(errorElement).toBeInTheDocument();
    });
  });
});
