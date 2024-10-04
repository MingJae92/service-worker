// Recipedetails.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Recipedetails from "./Recipedetails";

// Mock the axios module
jest.mock("axios");

const mockRecipe = {
  id: 1,
  name: "Pizza Margherita",
  image: "https://example.com/pizza.jpg",
  cuisine: "Italian",
  difficulty: "Medium",
  caloriesPerServing: 300,
  prepTimeMinutes: 30,
  cookTimeMinutes: 20,
  servings: 4,
  rating: 4.5,
  reviewCount: 120,
  ingredients: ["Dough", "Tomato Sauce", "Mozzarella", "Basil"],
  instructions: [
    "Prepare the dough.",
    "Spread the sauce on the dough.",
    "Add mozzarella and basil.",
    "Bake the pizza in the oven.",
  ],
  mealType: ["Lunch", "Dinner"],
};

describe("Recipedetails Component", () => {
  test("renders loading state initially", () => {
    axios.get.mockResolvedValueOnce({ data: mockRecipe });
    render(
      <MemoryRouter initialEntries={["/recipes/1"]}>
        <Routes>
          <Route path="/recipes/:id" element={<Recipedetails />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument(); // CircularProgress
  });

  test("renders recipe details after fetching data", async () => {
    axios.get.mockResolvedValueOnce({ data: mockRecipe });
    render(
      <MemoryRouter initialEntries={["/recipes/1"]}>
        <Routes>
          <Route path="/recipes/:id" element={<Recipedetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the recipe to be displayed
    await waitFor(() => expect(screen.getByText("Pizza Margherita")).toBeInTheDocument());

    // Check the main parts of the recipe
    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
    expect(screen.getByAltText("Pizza Margherita")).toBeInTheDocument();
    expect(screen.getByText("Cuisine: Italian")).toBeInTheDocument();
    expect(screen.getByText("Difficulty: Medium")).toBeInTheDocument();
    expect(screen.getByText("Calories per Serving: 300")).toBeInTheDocument();
    expect(screen.getByText("Prep Time: 30 minutes")).toBeInTheDocument();
    expect(screen.getByText("Cook Time: 20 minutes")).toBeInTheDocument();
    expect(screen.getByText("Servings: 4")).toBeInTheDocument();
    expect(screen.getByText("Rating: 4.5 (120 reviews)")).toBeInTheDocument();

    // Check for ingredients
    expect(screen.getByText("Dough")).toBeInTheDocument();
    expect(screen.getByText("Tomato Sauce")).toBeInTheDocument();
    expect(screen.getByText("Mozzarella")).toBeInTheDocument();
    expect(screen.getByText("Basil")).toBeInTheDocument();

    // Check for instructions
    expect(screen.getByText("1. Prepare the dough.")).toBeInTheDocument();
    expect(screen.getByText("2. Spread the sauce on the dough.")).toBeInTheDocument();
  });

  test("displays error message when data fetching fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Server error"));
    render(
      <MemoryRouter initialEntries={["/recipes/1"]}>
        <Routes>
          <Route path="/recipes/:id" element={<Recipedetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the error message to be displayed
    await waitFor(() => expect(screen.getByText("Server error. Please try again later.")).toBeInTheDocument());
  });
});
