import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Paper, Grid, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const Recipedetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching the recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipe) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#fffaf0' }}>
        <Typography variant="h3" align="center" gutterBottom>
          {recipe.name}
        </Typography>
        <img src={recipe.image} alt={recipe.name} style={{ width: '100%', borderRadius: '10px' }} />
        
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          Recipe Details
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography><strong>Cuisine:</strong> {recipe.cuisine}</Typography>
            <Typography><strong>Difficulty:</strong> {recipe.difficulty}</Typography>
            <Typography><strong>Calories per Serving:</strong> {recipe.caloriesPerServing}</Typography>
            <Typography><strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes</Typography>
            <Typography><strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes</Typography>
            <Typography><strong>Servings:</strong> {recipe.servings}</Typography>
            <Typography><strong>Rating:</strong> {recipe.rating} ({recipe.reviewCount} reviews)</Typography>
          </Grid>
        </Grid>

        <Typography variant="h5" style={{ marginTop: '20px' }}>
          Ingredients:
        </Typography>
        <List>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index}>
              <ListItemText primary={ingredient} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h5" style={{ marginTop: '20px' }}>
          Instructions:
        </Typography>
        <List>
          {recipe.instructions.map((instruction, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${index + 1}. ${instruction}`} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h5" style={{ marginTop: '20px' }}>
          Meal Type:
        </Typography>
        <List>
          {recipe.mealType.map((type, index) => (
            <ListItem key={index}>
              <ListItemText primary={type} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Recipedetails;
