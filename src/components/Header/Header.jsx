import React, { useEffect, useState } from "react";
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
import axios from "axios";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const recipeUrl = "https://dummyjson.com/recipes?select=name";

  useEffect(() => {
    const fetchRecipesData = async () => {
      try {
        const response = await axios.get(recipeUrl);
        console.log(response.data.recipes); 
        setRecipes(response.data.recipes); 
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipesData();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <AppBar position="fixed" sx={{ width: "100%", top: 0 }}>
      <Toolbar sx={{ justifyContent: "center", width: "100%" }}>
        <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
          Recipes
        </Typography>

        <Box sx={{ position: "relative" }}>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            {recipes.map((item) => (
              <MenuItem key={item.name} onClick={handleMenuClose}>
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
