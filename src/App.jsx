import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import EditRecipePage from './pages/EditRecipePage';
import NewRecipePage from './pages/NewRecipePage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route path='/recipes' element={<ProtectedRoute><RecipesPage /></ProtectedRoute>} />
        <Route path='/recipes/new' element={<ProtectedRoute><NewRecipePage /></ProtectedRoute>} />
        <Route path='/recipes/:id' element={<ProtectedRoute><RecipeDetailPage /></ProtectedRoute>} />
        <Route path='/recipes/:id/edit' element={<ProtectedRoute><EditRecipePage /></ProtectedRoute>} />


      </Routes>
    </BrowserRouter>
  )
}

export default App