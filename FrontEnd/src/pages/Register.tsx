import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';

const Register: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, password }),
      });
      if (response.ok) {
        setSuccess('Registo efetuado com sucesso! Pode agora iniciar sessão.');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        const data = await response.json();
        setError(data.error || 'Erro ao registar.');
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
        <div className="card shadow-sm p-4" style={{ maxWidth: 500, width: '30%' }}>
          <h2 className="mb-3 fw-bold text-primary text-center">Registar</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="O seu nome"
                required
              />
            </div>
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
            {success && <div className="alert alert-success py-1">{success}</div>}
            <button type="submit" className="btn btn-primary w-100 mt-2" disabled={loading}>
              {loading ? 'A registar...' : 'Registar'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
