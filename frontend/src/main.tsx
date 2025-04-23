import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.tsx'
import { SimpleEditor } from './TipTap/simple-editor.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <BrowserRouter>
     <Routes>
        <Route path="/" element={<App />} />
        <Route path='/editor' element={<SimpleEditor/>} />
      </Routes>
     </BrowserRouter>
  </StrictMode>,
)
