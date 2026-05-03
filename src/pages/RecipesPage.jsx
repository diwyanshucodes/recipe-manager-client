import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRecipes } from '../api/recipes';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');


  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getRecipes(token);
      const data = await res.json();
      if (!res.ok) {
        setError('Failed to load recipes');
        return;
      }
      setRecipes(data.recipes);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecipes();
  }, []);


  //logout
  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }
  function handleNewRecipe() {
    navigate('/recipes/new');
  }
  if (loading) return <p>Loading...</p>
  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>My Recipes</h1>
        <button className="btn-secondary" onClick={handleLogout}>Logout</button>
      </div>
      <div className="note-actions">
        <button className="btn-primary" onClick={handleNewRecipe}>New Recipe</button>
      </div>
      {recipes.length === 0 ? <p >No recipes yet. Create one above</p> :
        recipes.map(recipe => (
          <div className="note-card" key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.category}</p>
            <p>{recipe.prep_time}</p>
            <button className="btn-secondary" onClick={() => navigate(`/recipes/${recipe.id}`)}>View full recipe</button>

          </div>

        ))
      }
    </div>

  )
}

export default RecipesPage