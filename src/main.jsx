import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Workbox } from 'workbox-window';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const wb = new Workbox('/service-worker.js'); // Note the leading slash, referring to the public folder root
    
    wb.register()
      .then(() => {
        console.log('Service worker registered successfully');
      })
      .catch((error) => {
        console.error('Service worker registration failed:', error);
      });
  });
}
