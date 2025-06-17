import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Catalogo from './catalogo'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Catalogo/>
  </StrictMode>,
)
