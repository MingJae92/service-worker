import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import Pageerror from './Pageerror';
import { vi } from "vitest";
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('Pageerror Component', () => {
  test('renders Pageerror component with correct content', () => {
    act(() => {
      render(<Pageerror />);
    });

    expect(screen.getByText(/Oops! Recipe Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/It looks like this page is missing from the recipe book/i)).toBeInTheDocument();
    
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

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
