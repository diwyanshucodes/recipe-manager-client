import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateRecipe, getRecipe } from '../api/recipes';

const EditRecipePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [prep_time, setPrep_time] = useState(0);

  const [ingredients, setIngredients] = useState([{ name: '', amount: '', unit: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  async function loadRecipe() {
    setLoading(true);
    setError(null);
    try {
      const res = await getRecipe(token, id);
      if (!res.ok) {
        setError('Error loading recipe');
        return;
      }
      const data = await res.json();
      setTitle(data.recipe.title)
      setDescription(data.recipe.description)
      setCategory(data.recipe.category)
      setPrep_time(data.recipe.prep_time)
      setIngredients(data.recipe.ingredients)
    } catch (error) {
      setError('Edit unsuccessful');
    } finally {
      setLoading(false);
    }

  }
  useEffect(() => {
    loadRecipe();
  }, [])

  // Add new empty row
  function handleAddIngredient() {
    setIngredients(prev => [...prev, { name: '', amount: '', unit: '' }])
  }

  // Remove row at index
  function handleRemoveIngredient(index) {
    setIngredients(prev => prev.filter((item, i) => i !== index))
  }

  // Update one field of one ingredient
  function handleIngredientChange(index, field, value) {
    setIngredients(prev => prev.map((ing, i) =>
      i === index ? { ...ing, [field]: value } : ing
    ))
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!title) {
      setError('Title is required')
      return
    }
    setLoading(true);
    try {

      const recipeData = { title, description, category, prep_time, ingredients }
      const res = await updateRecipe(token, id, recipeData)
      if (!res.ok) {
        setError(data.error);
        return;
      }
      const data = await res.json();
      navigate(`/recipes/${id}`);

    } catch (error) {
      setError('Unable to add recipe');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading...</p>
  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>Edit Recipe</h1>
        <button className="btn-secondary" onClick={() => navigate(`/recipes/${id}`)}>Cancel</button>
      </div>

      <div className="create-form">
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Recipe title' value={title} onChange={e => setTitle(e.target.value)} />
          <textarea placeholder='Recipe description' value={description} onChange={e => setDescription(e.target.value)} />
          <input type='text' placeholder='Category' value={category} onChange={e => setCategory(e.target.value)} />
          <input type='number' placeholder='Prep time (mins)' value={prep_time} onChange={e => setPrep_time(e.target.value)} />

          <h3>Ingredients</h3>
          {ingredients.map((ind, i) => (
            <div key={i} className="note-actions" style={{ marginBottom: '8px' }}>
              <input type='text' placeholder='Name' value={ingredients[i].name} onChange={(e) => handleIngredientChange(i, 'name', e.target.value)} />
              <input type='text' placeholder='Amount' value={ind.amount} onChange={(e) => handleIngredientChange(i, 'amount', e.target.value)} />
              <input type='text' placeholder='Unit' value={ind.unit} onChange={(e) => handleIngredientChange(i, 'unit', e.target.value)} />
              <button type='button' className="btn-danger" onClick={() => handleRemoveIngredient(i)}>Remove</button>
            </div>
          ))}

          <button type='button' className="btn-secondary" onClick={handleAddIngredient}>+ Add Ingredient</button>
          {error && <p className="error">{error}</p>}
          <button type='submit' className="btn-primary" disabled={loading}>Save Changes</button>
        </form>
      </div>
    </div>
  )
}

export default EditRecipePage