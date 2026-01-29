import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.jsx'
import { LoadingProvider } from './context/LoadingContext';
import GlobalSpinner from './ui/loaders/GlobalSpinner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <GlobalSpinner />
      <App />
    </LoadingProvider>
  </StrictMode>,
)
