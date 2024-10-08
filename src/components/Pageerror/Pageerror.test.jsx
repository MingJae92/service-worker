import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react'; // Import act from 'react'
import Pageerror from './Pageerror';
import { vi } from "vitest";
import { useNavigate } from 'react-router-dom';

// Mock the `useNavigate` hook
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('Pageerror Component', () => {
  test('renders Pageerror component with correct content', () => {
    act(() => {
      render(<Pageerror />);
    });

    // Check if the title and message are rendered
    expect(screen.getByText(/Oops! Recipe Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/It looks like this page is missing from the recipe book/i)).toBeInTheDocument();
    
    // Check if the button is rendered
    const button = screen.getByRole('button', { name: /Back to Home Cookbook/i });
    expect(button).toBeInTheDocument();
  });

  test('navigates to home when button is clicked', () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);

    act(() => {
      render(<Pageerror />);
    });

    const button = screen.getByRole('button', { name: /Back to Home Cookbook/i });
    fireEvent.click(button);

    // Check if the navigate function was called with '/'
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
