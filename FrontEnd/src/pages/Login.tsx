import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        navigate('/');
      } else {
        setError('Email ou palavra-passe incorretos.');
      }
    } catch (err) {
      setError('Erro ao comunicar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader />
      

      
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh', background: '#f8f9fa' }}>
        <div className="card shadow-sm p-4" style={{ maxWidth: 500, width:'30%' }}>
          <h2 className="mb-3 fw-bold text-primary text-center">Iniciar Sessão</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="o.seu@email.pt"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Palavra-passe</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {error && <div className="alert alert-danger py-1">{error}</div>}
            <button type="submit" className="btn btn-primary w-100 mt-2" disabled={!email || !password || loading}>
              {loading ? 'A iniciar sessão...' : 'Entrar'}
            </button>
          </form>
          <div className="text-center mt-3">
            <span className="text-secondary small">Ainda não tem conta?</span>
            <Link to="/register" className="ms-1 text-primary small">Registar-se</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login; 