import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Header from "./Header";
import { vi } from "vitest";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

vi.mock("axios");

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
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
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <Router>
        <Header />
      </Router>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByLabelText(/menu/i));

    expect(await screen.findByText(/Pizza/i)).toBeInTheDocument();
    expect(await screen.findByText(/Pasta/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Pizza/i));

    expect(mockNavigate).toHaveBeenCalledWith("/recipe/1");
  });
});
