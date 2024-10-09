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
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CottageIcon from "@mui/icons-material/Cottage";
import axios from "axios";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const recipeUrl = "https://dummyjson.com/recipes?select=name";
  const navigate = useNavigate();

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
      handleMenuClose(); 
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
        backgroundColor: "#8b4513", 
        zIndex: 1300, 
      }}
    >
      <Toolbar
        sx={{
          justifyContent: { xs: "space-between", md: "space-between" },
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={6} sm={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link to="/">
                <IconButton edge="start" sx={{ color: "#fff5e1" }}>
                  <CottageIcon fontSize="large" />
                </IconButton>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              component="div"
              sx={{
                flexGrow: 1,
                fontFamily: "'Pacifico', cursive", 
                color: "#fff5e1", 
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, 
                textAlign: "center", 
              }}
            >
              Recipes
            </Typography>
          </Grid>

          <Grid item xs={6} sm={4} sx={{ textAlign: "right" }}>
            <Box sx={{ position: "relative" }}>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
                sx={{
                  fontSize: { xs: "1.5rem", sm: "2rem" },
                }}
              >
                <MenuIcon fontSize="inherit" />
              </IconButton>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                sx={{
                  zIndex: 1400,
                  mt: 1,
                  width: { xs: "80vw", sm: "auto" },
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
                  <MenuItem
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    sx={{
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                      padding: { xs: "8px 16px", sm: "10px 20px" },
                      width: { xs: "80vw", sm: "auto" },
                      textAlign: "center",
                    }}
                  >
                    <Typography>
                      {item.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
