import { useState } from 'react'
import { login } from '../api/auth'
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await login(email, password);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }

      localStorage.setItem('token', data.token);
      navigate('/recipes');
    } catch (error) {
      setError('Something went wrong. Please try again')
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">

      <div className="auth-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)} />
          {error && <p className="error">{error}</p>}
          <button className="btn-primary" type='submit'>{loading ? 'Logging in...' : 'Login'}</button>
          <p className="auth-link">No account? <Link  to='/register'>Register</Link></p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage