import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { CmsProvider } from './context/CmsContext';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <CmsProvider>
      <App />
    </CmsProvider>
  </ThemeProvider>
);
