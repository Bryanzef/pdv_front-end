import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './contexts/ThemeContext';
import { UIPreferencesProvider } from './contexts/UIPreferencesContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <UIPreferencesProvider>
        <App />
      </UIPreferencesProvider>
    </ThemeProvider>
  </React.StrictMode>
);