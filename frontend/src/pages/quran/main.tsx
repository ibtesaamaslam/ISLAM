import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from '../../App';
import './index.css';

// Safely suppress CacheStorage unexpected internal errors common in sandboxed iframes
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const errorStr = String(event?.reason?.message || event?.reason || '');
    if (
      event?.reason?.name === 'UnknownError' ||
      errorStr.includes('CacheStorage') ||
      errorStr.includes("Failed to execute 'open' on 'CacheStorage'")
    ) {
      event.preventDefault();
      console.warn('Handled CacheStorage rejection gracefully:', event.reason);
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

