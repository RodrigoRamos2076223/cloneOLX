import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        // Login bem-sucedido
        // Você pode guardar o token ou redirecionar
        navigate('/');
      } else {
        const data = await response.json();
        setError(data.message || 'Credenciais inválidas');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor.');
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-light bg-white shadow-sm fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center px-4">
          <Link className="navbar-brand fw-bold text-primary" to="/">ClassiPlace</Link>
          <div>
            <Link className="btn btn-outline-primary me-2" to="/login">Entrar</Link>
            <Link className="btn btn-primary" to="/novo-anuncio">+ Anunciar</Link>
          </div>
        </div>
      </nav>
      <div style={{ height: 70 }} />

      {/* Formulário de Login */}
      <section className="d-flex align-items-center justify-content-center" style={{ minHeight: '70vh', background: '#f8f9fa' }}>
        <div className="login-card card shadow-sm p-4" style={{ maxWidth: 370, width: '100%' }}>
          <h2 className="mb-3 fw-bold text-primary text-center">Entrar</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Senha</label>
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
            {error && <div className="alert alert-danger py-2 small">{error}</div>}
            <button type="submit" className="btn btn-primary w-100 mt-2">Entrar</button>
          </form>
          <div className="text-center mt-3">
            <span className="text-secondary small">Não tem conta?</span>
            <Link to="/register" className="ms-1 text-primary small">Criar conta</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login; 