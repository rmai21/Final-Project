import './App.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CreationPage from './pages/CreationPage'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
          <nav>
            <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/creation">Create</Link>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/creation" element={<CreationPage />} />
          </Routes>
        </BrowserRouter>
      );
}

export default App
