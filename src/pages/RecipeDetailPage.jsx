import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getRecipe, deleteRecipe } from '../api/recipes';

const RecipesDetailPage = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { id } = useParams();

  // - Has Back button → navigate to /recipes
  const fetchRecipe = async () => {
    setLoading(true);
    setError(null);
    try {
      const resRecipe = await getRecipe(token, id);
      const data = await resRecipe.json();
      if (!resRecipe.ok) {
        setError('Failed to load recipe');
        return;
      }
      setRecipe(data.recipe);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  async function handleDelete() {
    setLoading(true);
    setError(null);
    try {
      const res = await deleteRecipe(token, id);
      const data = await res.json();
      if (!res.ok) {
        setError(res.error);
        return;
      }
      navigate('/recipes');

    } catch (error) {
      setError('Failed to delete note');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchRecipe();
  }, []);

  if (loading) return <p>Loading...</p>
if (!recipe) return null

return (
  <div className="notes-container">
    <div className="notes-header">
      <h1>{recipe.title}</h1>
      <button className="btn-secondary" onClick={() => navigate('/recipes')}>Back</button>
    </div>

    {error && <p className="error">{error}</p>}

    <div className="note-card">
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Prep time:</strong> {recipe.prep_time} mins</p>
      <p><strong>Description:</strong> {recipe.description}</p>

      <h3>Ingredients</h3>
      {recipe.ingredients.length === 0
        ? <p className="empty-state">No ingredients added</p>
        : recipe.ingredients.map(ind => (
            <div key={ind.id} style={{ marginBottom: '6px' }}>
              <p>{ind.name} — {ind.amount} {ind.unit}</p>
            </div>
          ))
      }

      <div className="note-actions" style={{ marginTop: '16px' }}>
        <button className="btn-secondary" onClick={() => navigate(`/recipes/${id}/edit`)}>Edit</button>
        <button className="btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  </div>
)
}

export default RecipesDetailPage