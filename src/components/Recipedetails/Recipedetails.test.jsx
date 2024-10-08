import { render, screen } from "@testing-library/react";
import axios from "axios";
import Recipedetails from "./Recipedetails";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

// Mock axios
vi.mock("axios");

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Recipedetails Component", () => {
  test("displays loading message initially", () => {
    renderWithRouter(<Recipedetails />);
    const loadingMessage = screen.getByText(/loading.../i);
    expect(loadingMessage).toBeInTheDocument();
  });

  test("displays error message when data fetching fails", async () => {
    // Mock a failed API request
    axios.get.mockRejectedValue(new Error("Network Error"));

    renderWithRouter(<Recipedetails />);

    // Check for the complete error message
    const errorMessage = await screen.findByText(/server error\. please try again later/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays error message when data fetching fails", async () => {
    // Mock a failed API request
    axios.get.mockRejectedValue(new Error("Network Error"));
  
    renderWithRouter(<Recipedetails />);
  
    // Use a single matcher to find the full error message
    const errorMessage = await screen.findByText(/server error\. please try again later/i);
    expect(errorMessage).toBeInTheDocument();
  });
  
});
