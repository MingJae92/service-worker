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
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          paddingBottom: "60px",
          overflowY: "auto",
        }}
      >
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/recipe/:id" element={<Recipedetails />} />
          <Route path="*" element={<Pageerror />} />
        </Routes>
      </Box>

      {showFooter && (
        <Box
          component="footer"
          sx={{
            width: "100%",
            height: "60px",
            backgroundColor: "#8B4513",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            bottom: 0,
            left: 0,
            zIndex: 1000,
          }}
        >
          © 2024 My Cookbook Application
        </Box>
      )}
    </Box>
  );
}

export default App;
