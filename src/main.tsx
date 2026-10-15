import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

// Prevent external browser extension errors (e.g. MetaMask inpage.js) from breaking the app
window.addEventListener(
  'unhandledrejection',
  (event) => {
    const reasonStr = String(event.reason?.message || event.reason || '').toLowerCase();
    const stackStr = String(event.reason?.stack || '').toLowerCase();
    if (
      reasonStr.includes('metamask') ||
      reasonStr.includes('failed to connect') ||
      stackStr.includes('chrome-extension://') ||
      stackStr.includes('inpage.js')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  true
);

window.addEventListener(
  'error',
  (event) => {
    const msg = String(event.message || '').toLowerCase();
    const filename = String(event.filename || '').toLowerCase();
    const stack = String(event.error?.stack || '').toLowerCase();
    if (
      msg.includes('metamask') ||
      msg.includes('failed to connect') ||
      filename.includes('chrome-extension://') ||
      filename.includes('inpage.js') ||
      stack.includes('chrome-extension://')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  true
);

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ErrorBoundary>
);
