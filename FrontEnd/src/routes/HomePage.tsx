import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaHome, FaMobileAlt, FaTshirt, FaCouch, FaBicycle } from 'react-icons/fa';

const categories = [
  { name: 'Carros', icon: <FaCar size={28} /> },
  { name: 'Imóveis', icon: <FaHome size={28} /> },
  { name: 'Eletrônicos', icon: <FaMobileAlt size={28} /> },
  { name: 'Moda', icon: <FaTshirt size={28} /> },
  { name: 'Móveis', icon: <FaCouch size={28} /> },
  { name: 'Esporte', icon: <FaBicycle size={28} /> },
];

const products = [
  {
    title: 'Bicicleta Urbana',
    price: 'R$ 800',
    image: 'https://dummyimage.com/400x300/ced4da/495057.jpg&text=Bicicleta',
    location: 'Lisboa',
  },
  {
    title: 'iPhone 13',
    price: 'R$ 3.200',
    image: 'https://dummyimage.com/400x300/ced4da/495057.jpg&text=iPhone+13',
    location: 'Porto',
  },
  {
    title: 'Sofá 3 Lugares',
    price: 'R$ 1.200',
    image: 'https://dummyimage.com/400x300/ced4da/495057.jpg&text=Sof%C3%A1',
    location: 'Coimbra',
  },
  {
    title: 'T-shirt Nike',
    price: 'R$ 60',
    image: 'https://dummyimage.com/400x300/ced4da/495057.jpg&text=T-shirt',
    location: 'Faro',
  },
];

const HomePage: React.FC = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-light bg-white shadow-sm fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center px-4">
          <Link className="navbar-brand fw-bold text-primary" to="/">ClassiPlace</Link>
          <div>
            <Link className="btn btn-outline-primary me-2" to="/Login">Login</Link>
            <Link className="btn btn-outline-primary me-2" to="/Register">Registar</Link>
            <Link className="btn btn-primary" to="/novo-anuncio">+ Anunciar</Link>
          </div>
        </div>
      </nav>

      {/* Espaço para navbar fixa */}
      <div style={{ height: 70 }} />

      {/* Barra de busca */}
      <section className="search-section">
        <div className="container d-flex flex-column align-items-center">
          <h2 className="mb-3 fw-bold text-secondary">Encontre o que procura</h2>
          <form className="search-bar d-flex w-100 justify-content-center">
            <input type="text" className="form-control search-input" placeholder="Buscar produtos, serviços..." />
            <button className="btn btn-primary ms-2 px-4" type="submit">Buscar</button>
          </form>
        </div>
      </section>

      {/* Categorias */}
      <section className="categories-section py-4">
        <div className="container">
          <div className="row g-3 justify-content-center">
            {categories.map((cat, idx) => (
              <div className="col-6 col-md-2" key={cat.name}>
                <div className="category-card d-flex flex-column align-items-center p-3 shadow-sm rounded bg-white h-100">
                  <div className="mb-2 text-primary">{cat.icon}</div>
                  <span className="fw-semibold text-secondary small text-center">{cat.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anúncios */}
      <section className="products-section py-4">
        <div className="container">
          <h3 className="mb-4 fw-bold text-secondary">Últimos anúncios</h3>
          <div className="row g-4">
            {products.map((prod, idx) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.title}>
                <div className="product-card card h-100 border-0 shadow-sm">
                  <img src={prod.image} className="card-img-top" alt={prod.title} />
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-primary mb-1">{prod.title}</h5>
                    <div className="text-muted small mb-2">{prod.location}</div>
                    <div className="fw-bold text-success mb-2">{prod.price}</div>
                    <Link to="#" className="btn btn-outline-primary w-100">Ver anúncio</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage; 