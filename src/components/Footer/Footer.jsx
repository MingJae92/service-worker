import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const Footer = () => {
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

  if (!showFooter) return null; 

  return ( 
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
        '@media (max-width:600px)': {
          height: "50px", 
        },
        '@media (min-width:601px) and (max-width:960px)': { 
          height: "55px", 
        },
        '@media (min-width:961px)': {
          height: "60px", 
        },
      }}
    >
      © 2024 My Cookbook Application 
    </Box>
  );
};

export default Footer;
