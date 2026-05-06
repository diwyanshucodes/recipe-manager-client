import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRecipes } from '../api/recipes';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');


  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if(search) params.append('search',search);
      if(category) params.append('category',category);
      const res = await getRecipes(token, params.toString());
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
      <div style={{ marginBottom: '16px', display: 'flex', gap: '10px' }}>
  <input
    type='text'
    placeholder='Search recipes...'
    value={search}
    onChange={e => setSearch(e.target.value)}
  />
  <select value={category} onChange={e => setCategory(e.target.value)}>
    <option value=''>All categories</option>
    <option value='breakfast'>Breakfast</option>
    <option value='lunch'>Lunch</option>
    <option value='dinner'>Dinner</option>
    <option value='dessert'>Dessert</option>
    <option value='snack'>Snack</option>
  </select>
  <button className='btn-secondary' onClick={fetchRecipes}>Search</button>
  <button className='btn-secondary' onClick={() => {
    setSearch('')
    setCategory('')
  }}>Clear</button>
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