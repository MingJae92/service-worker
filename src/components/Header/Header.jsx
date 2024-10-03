import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CottageIcon from "@mui/icons-material/Cottage";
import axios from "axios";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const recipeUrl = "https://dummyjson.com/recipes?select=name";
  const navigate = useNavigate();

  // Fetch recipes from API
  useEffect(() => {
    const fetchRecipesData = async () => {
      try {
        const response = await axios.get(recipeUrl);
        setRecipes(response.data.recipes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipesData();
  }, []);

  const handleSelect = (recipeId) => {
    if (recipeId) {
      navigate(`/recipe/${recipeId}`);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        top: 0,
        backgroundColor: "#8b4513", // Earthy brown tone
        zIndex: 1300, // Keep the AppBar on top of other elements
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1200px", // Limit the width for a centered, balanced look
          margin: "0 auto",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
            <IconButton edge="start" color="inherit">
              <CottageIcon fontSize="large" />
            </IconButton>
          </Link>
        </Box>

        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontFamily: "'Pacifico', cursive", // Handwritten font for a cozy feel
            color: "#fff5e1", // Creamy white for text
          }}
        >
          Recipes
        </Typography>

        <Box sx={{ position: "relative" }}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon fontSize="large" />
          </IconButton>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            sx={{
              zIndex: 1400, // Ensures the menu pops above everything
              mt: 1, // Adjusts the spacing below the button
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {recipes.map((item) => (
              <MenuItem key={item.id} onClick={() => handleSelect(item.id)}>
                <Typography>
                  <Link
                    to={`/recipe/${item.id}`}
                    style={{ textDecoration: "none", color: "#8b4513" }} // Earthy brown text
                  >
                    {item.name}
                  </Link>
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
