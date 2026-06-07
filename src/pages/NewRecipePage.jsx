import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRecipe } from '../api/recipes';



const NewRecipePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [prep_time, setPrep_time] = useState(0);
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([{ name: '', amount: '', unit: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
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

      // const recipeData = { title, description, category, prep_time, ingredients }
      // const res = await createRecipe(token, recipeData)
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('prep_time', prep_time);
      formData.append('ingredients', JSON.stringify(ingredients));
      if (image) formData.append('image', image);

      const res = await createRecipe(token, formData);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }
      navigate('/recipes');

    } catch (error) {
      setError('Unable to add recipe');
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>Add New Recipe</h1>
        <button className="btn-secondary" onClick={() => navigate(`/recipes`)}>Cancel</button>
      </div>

      <div className="create-form">
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='recipe title' value={title} onChange={e => setTitle(e.target.value)} />
          <textarea placeholder='recipe description' value={description} onChange={e => setDescription(e.target.value)} />
          <input type='text' placeholder='recipe category' value={category} onChange={e => setCategory(e.target.value)} />
          <input type='number' placeholder='recipe prep time' value={prep_time} onChange={e => setPrep_time(e.target.value)} />
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={e => setImage(e.target.files[0])}
          />
          <h3>Ingredients</h3>
          {ingredients.map((ind, i) => (
            <div key={i} className="note-actions" style={{ marginBottom: '8px' }}>
              <input type='text' placeholder='Name' value={ingredients[i].name} onChange={(e) => handleIngredientChange(i, 'name', e.target.value)} />
              <input type='text' placeholder='Amount' value={ind.amount} onChange={(e) => handleIngredientChange(i, 'amount', e.target.value)} />
              <input type='text' placeholder='Unit' value={ind.unit} onChange={(e) => handleIngredientChange(i, 'unit', e.target.value)} />
              <button type='button' className="btn-danger" onClick={() => handleRemoveIngredient(i)}>Remove</button>
            </div>
          ))}

          <button type='button' className="btn-secondary" onClick={handleAddIngredient}>Add Ingredient</button>
          {error && <p className="error">{error}</p>}
          <button className="btn-primary" disabled={loading} type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default NewRecipePage
