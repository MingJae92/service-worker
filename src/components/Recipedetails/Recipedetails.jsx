import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Recipedetails = () => {
  const { id } = useParams();  // Extracting the id from the URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetching detailed recipe data
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
        console.log(response.data);  // Logging the data returned by the API
        setRecipe(response.data); // Set the recipe to the data returned
      } catch (error) {
        console.error('Error fetching the recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [id]);  // Correct dependency

  if (!recipe) {
    return <div>Loading...</div>;
  }

  // Displaying the recipe details directly
  return (
    <div>
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} style={{ width: '300px', height: 'auto' }} />
      <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
      <p><strong>Calories per Serving:</strong> {recipe.caloriesPerServing}</p>
      <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes</p>
      <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes</p>
      <p><strong>Servings:</strong> {recipe.servings}</p>
      <p><strong>Rating:</strong> {recipe.rating} ({recipe.reviewCount} reviews)</p>

      <h2>Ingredients:</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2>Instructions:</h2>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>

      <h2>Meal Type:</h2>
      <ul>
        {recipe.mealType.map((type, index) => (
          <li key={index}>{type}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recipedetails;
