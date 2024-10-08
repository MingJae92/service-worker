import { render, screen } from '@testing-library/react';
import Footer from './Footer'; // Ensure this is the correct import

describe('Footer Component', () => {
  test('renders without crashing', () => {
    render(<Footer />);
    
    // Check for any text or elements that should be present in the footer
    const footerElement = screen.getByText(/footer/i); // Adjust this to match expected text in your Footer
    expect(footerElement).toBeInTheDocument();
  });
});
