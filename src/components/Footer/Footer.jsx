// Footer.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer'; // Ensure the path is correct
import '@testing-library/jest-dom/extend-expect'; // For additional matchers

describe('Footer Component', () => {
  beforeAll(() => {
    // Set up the initial document height to simulate a scrollable page
    Object.defineProperty(window.document, 'documentElement', {
      value: {
        scrollHeight: 1000, // Set the height of the document
      },
    });
  });

  it('renders the footer when scrolled to the bottom', () => {
    render(<Footer />); // Render the Footer component

    // Simulate scrolling to the bottom of the page
    window.scrollTo(0, 1000);
    window.dispatchEvent(new Event('scroll')); // Dispatch scroll event

    // Check if the footer is rendered
    const footerElement = screen.getByText(/© 2024 My Cookbook Application/i);
    expect(footerElement).toBeInTheDocument(); // Expect footer to be in the document
  });

  it('does not render the footer when not scrolled to the bottom', () => {
    render(<Footer />); // Render the Footer component

    // Simulate scroll position not at the bottom
    window.scrollTo(0, 0); // Scroll to top
    window.dispatchEvent(new Event('scroll')); // Dispatch scroll event

    // Check if the footer is not rendered
    const footerElement = screen.queryByText(/© 2024 My Cookbook Application/i);
    expect(footerElement).not.toBeInTheDocument(); // Expect footer not to be in the document
  });
});
