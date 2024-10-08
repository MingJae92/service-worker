import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes, Router } from "react-router-dom";
import Recipedetails from "./components/Recipedetails/Recipedetails";
import Pageerror from "./components/Pageerror/Pageerror";
import Footer from "./components/Footer/Footer";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Full viewport height to allow footer to stick at the bottom
      }}
    >
      {/* Header is placed here if it's common for all routes */}
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1, // This makes the main content area grow to fill available space
          width: "100%", // Ensure the content and footer span the full width
        }}
      >
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/recipe/:id" element={<Recipedetails />} />
          <Route path="*" element={<Pageerror />} />
        </Routes>
        </Router>
        
      </Box>
      <Footer /> {/* Footer will span the full width */}
    </Box>
  );
}

export default App;
