import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import Navbar from './components/Navbar';
import Hero from './components/Hero';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <Hero />
  </StrictMode>,
)
