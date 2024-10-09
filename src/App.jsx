import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Recipedetails from "./components/Recipedetails/Recipedetails";
import Pageerror from "./components/Pageerror/Pageerror";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

function App() {
  const [showFooter, setShowFooter] = useState(false); 

  const handleScroll = () => {
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
    setShowFooter(bottom); 
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); 

    return () => {
      window.removeEventListener("scroll", handleScroll); 
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          paddingBottom: "60px", // Reserve space for the footer
          overflowY: "auto", // Allow scrolling if needed
        }}
      >
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/recipe/:id" element={<Recipedetails />} />
          <Route path="*" element={<Pageerror />} />
        </Routes>
      </Box>

      {/* Footer */}
      {showFooter && ( // Render the footer only when showFooter is true
        <Box
          component="footer"
          sx={{
            width: "100%", // Full width of the page
            height: "60px", // Fixed height
            backgroundColor: "#8B4513", // Dark brown color for visibility
            color: "white", // White text for contrast
            display: "flex", // Flexbox for layout
            justifyContent: "center", // Center the text horizontally
            alignItems: "center", // Center the text vertically
            position: "fixed", // Sticks to the bottom
            bottom: 0, // Stays at the bottom of the viewport
            left: 0, // Aligns with the start of the page
            zIndex: 1000, // High z-index to ensure it's above other elements
          }}
        >
          © 2024 My Cookbook Application {/* Visible text in footer */}
        </Box>
      )}
    </Box>
  );
}

export default App;