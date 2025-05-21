import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './routes/HomePage.tsx'
import ShopItem from './routes/ShopItem.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ShopItem />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
