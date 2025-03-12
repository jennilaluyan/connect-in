import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1 className='font-bold text-5xl'>Hello World</h1>
  </StrictMode>,
)
