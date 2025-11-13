import './App.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
          <nav>
            <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/contact">Contact</Link>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </BrowserRouter>
      );
}

export default App
