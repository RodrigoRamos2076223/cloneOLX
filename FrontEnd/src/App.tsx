import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './routes/HomePage.tsx'
import ShopItem from './routes/ShopItem.tsx'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ShopItem />} />
      </Routes>
    </Router>
  )
}

export default App
