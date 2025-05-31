import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import './Navbar.css';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          ClassiPlace
        </Link>

        <div className="navbar-actions">
          <ThemeToggle />
          <Link to="/login" className="btn btn-outline">
            Entrar
          </Link>
          <Link to="/register" className="btn btn-primary">
            Cadastrar
          </Link>
        </div>
      </div>
    </nav>
  );
}; 