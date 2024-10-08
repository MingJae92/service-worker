// src/components/Header/Header.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Header from "./Header"; // Adjust the import according to your file structure
import { vi } from "vitest";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

// Mock axios
vi.mock("axios");

// Mocking react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(), // Keep your mock for useNavigate
  };
});


describe("Header Component", () => {
  const mockRecipes = [
    { id: 1, name: "Pizza" },
    { id: 2, name: "Pasta" },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: { recipes: mockRecipes } });
  });

  test("navigates to the selected recipe", async () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate); // Mocking the useNavigate

    render(
      <Router>
        <Header />
      </Router>
    );

    // Ensure axios was called once
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Open the menu (adjust selector based on your component)
    fireEvent.click(screen.getByLabelText(/menu/i));

    // Ensure the recipes are rendered
    expect(await screen.findByText(/Pizza/i)).toBeInTheDocument();
    expect(await screen.findByText(/Pasta/i)).toBeInTheDocument();

    // Click on the recipe (adjust the text based on your mock data)
    fireEvent.click(screen.getByText(/Pizza/i));

    // Check if the navigation function was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/recipe/1");
  });
});
