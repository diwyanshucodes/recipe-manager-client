import { useState } from 'react'
import { register } from '../api/auth'
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {


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
      const res = await register(email, password);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }

      navigate('/login');
    } catch (error) {
      setError('Something went wrong. Please try again')
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)} />
          {error && <p className="error">{error}</p>}
          <button className="btn-primary" type='submit'>{loading ? 'Registering...' : 'Register'}</button>
        </form>
        <p className="auth-link">Have an account? <Link to='/login'>Login</Link></p>
      </div>
    </div>
  )
}

export default RegisterPage