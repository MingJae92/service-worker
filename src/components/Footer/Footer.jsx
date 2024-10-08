// Footer.jsx
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false); // State to control footer visibility

  const handleScroll = () => {
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
    setShowFooter(bottom); // Show footer only when at the bottom
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Add scroll event listener

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup the event listener on unmount
    };
  }, []);

  if (!showFooter) return null; // Don't render the footer if it's not visible

  return ( // Removed the unnecessary conditional rendering here
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
  );
};

export default Footer;
