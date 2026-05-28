import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initGsapMotion } from './motion/gsapReducedMotion';
import './styles.css';

initGsapMotion();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
