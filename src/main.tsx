import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initGsapMotion } from './motion/gsapReducedMotion';
import { MotionProvider } from './motion/MotionProvider';
import './styles.css';

initGsapMotion();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionProvider>
      <App />
    </MotionProvider>
  </StrictMode>,
);
