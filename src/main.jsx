import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log('📦 Starting render - main.jsx');

const rootEl = document.getElementById('root');
if (!rootEl) {
  console.error('Root element not found: #root');
} else {
  const root = createRoot(rootEl);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('✅ App mounted');
}
