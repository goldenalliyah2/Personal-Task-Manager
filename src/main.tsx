import '@fontsource/secular-one';
import '@fontsource/signika-negative';
import '@fontsource/signika-negative/500.css';
import '@fontsource/signika-negative/600.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);