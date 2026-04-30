import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import ProductsPage from './pages/ProductsPage'

function App() {
  return (
    <Router>
      <main className="min-h-screen bg-[#f0f0f0]">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/collections" element={<ProductsPage />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
