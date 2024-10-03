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
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching the recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [id]);  // Correct dependency

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipe.name}</h1>
      {recipe.description && <p>{recipe.description}</p>}
      
      <h3>Ingredients:</h3>
      {recipe.ingredients && recipe.ingredients.length > 0 ? (
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      ) : (
        <p>No ingredients listed.</p>
      )}

      <h3>Instructions:</h3>
      {recipe.instructions ? (
        <p>{recipe.instructions}</p>
      ) : (
        <p>No instructions provided.</p>
      )}
    </div>
  );
};

export default Recipedetails;
