import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Grid, // Import stable Grid
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: '"Georgia", "Times New Roman", serif',
    h3: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#8B4513", // SaddleBrown
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#8B4513", // SaddleBrown
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#333", // Darker text for readability
    },
  },
});

const Recipedetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true); // Set initial loading to true

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
        setRecipe(response.data);
        console.log(response);
        console.log("recipes fetched:", response)
        setLoading(false); // Set loading to false after the fetch is complete
      } catch (error) {
        console.error("Error fetching the recipe details:", error);
        setError(true);
        setLoading(false); // Also stop loading if there's an error
      }
    };

    fetchRecipeDetails();
  }, [id]);

  // Display loading spinner or error message if needed
  if (loading) {
    return (
      <Container>
        {error ? (
          <Typography variant="h5" color="error" align="center">
            Server error. Please try again later.
          </Typography>
        ) : (
          <CircularProgress />
        )}
      </Container>
    );
  }

  if (!recipe) {
    return (
      <Container>
        <Typography variant="h5" align="center">
          No recipe found.
        </Typography>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" style={{ marginTop: "20px" }}>
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#fffaf0",
          }}
        >
          <Typography variant="h3" align="center" gutterBottom>
            {recipe.name}
          </Typography>
          <img
            src={recipe.image}
            alt={recipe.name}
            style={{ width: "100%", borderRadius: "10px" }}
          />

          <Typography
            variant="h5"
            gutterBottom
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            Recipe Details
          </Typography>

          {/* Centering Recipe Details */}
          <Grid container spacing={2} justifyContent="center" style={{ marginTop: "20px" }}>
            <Grid item xs={12} sm={6}>
              <Typography align="center">
                <strong>Cuisine:</strong> {recipe.cuisine}
              </Typography>
              <Typography align="center">
                <strong>Difficulty:</strong> {recipe.difficulty}
              </Typography>
              <Typography align="center">
                <strong>Calories per Serving:</strong> {recipe.caloriesPerServing}
              </Typography>
              <Typography align="center">
                <strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes
              </Typography>
              <Typography align="center">
                <strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes
              </Typography>
              <Typography align="center">
                <strong>Servings:</strong> {recipe.servings}
              </Typography>
              <Typography align="center">
                <strong>Rating:</strong> {recipe.rating} ({recipe.reviewCount} reviews)
              </Typography>
            </Grid>
          </Grid>

          {/* Centering Ingredients Section */}
          <Typography variant="h5" style={{ marginTop: "20px", textAlign: "center" }}>
            Ingredients:
          </Typography>
          <Grid container justifyContent="center" style={{ marginTop: "10px" }}>
            <Grid item xs={12} sm={8}>
              <List style={{ textAlign: "center" }}>
                {recipe.ingredients.map((ingredient, index) => (
                  <ListItem key={index} style={{ justifyContent: "center" }}>
                    <ListItemText primary={ingredient} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>

          {/* Centering Instructions Section */}
          <Typography variant="h5" style={{ marginTop: "20px", textAlign: "center" }}>
            Instructions:
          </Typography>
          <Grid container justifyContent="center" style={{ marginTop: "10px" }}>
            <Grid item xs={12} sm={8}>
              <List style={{ textAlign: "center" }}>
                {recipe.instructions.map((instruction, index) => (
                  <ListItem key={index} style={{ justifyContent: "center" }}>
                    <ListItemText primary={`${index + 1}. ${instruction}`} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>

          {/* Centering Meal Type Section */}
          <Typography variant="h5" style={{ marginTop: "20px", textAlign: "center" }}>
            Meal Type:
          </Typography>
          <Grid container justifyContent="center" style={{ marginTop: "10px" }}>
            <Grid item xs={12} sm={8}>
              <List style={{ textAlign: "center" }}>
                {recipe.mealType.map((type, index) => (
                  <ListItem key={index} style={{ justifyContent: "center" }}>
                    <ListItemText primary={type} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Recipedetails;
