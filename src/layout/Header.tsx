import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useUIPreferences } from '../contexts/UIPreferencesContext';
import Button from '../shared/components/ui/Button';

export default function Header() {
  const { usuario, logout } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { sidebarMobileOpen, setSidebarMobileOpen } = useUIPreferences();

  const handleLogout = () => {
    logout();
    setMenuAberto(false);
  };

  const toggleMobileSidebar = () => {
    setSidebarMobileOpen(!sidebarMobileOpen);
  };

  return (
    <header className="h-16 bg-background-component border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 transition-colors">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleMobileSidebar}
          className="block md:hidden p-2 rounded-md text-text-primary hover:bg-primary-soft focus:outline-none"
          aria-label="Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-h3 font-semibold text-text-primary">PDV Fruteira</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md bg-background-app hover:bg-primary-soft text-text-primary focus:outline-none"
          title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
          aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 9 0 109.79 9.79z" />
            </svg>
          )}
        </button>
        
        {usuario && (
          <div className="relative">
            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className="flex items-center gap-2 text-text-primary hover:text-primary focus:outline-none rounded-md p-2"
              aria-expanded={menuAberto}
              aria-haspopup="true"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {usuario.nome.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="hidden md:block text-sm font-medium">{usuario.nome}</span>
              <span className={`hidden md:block text-xs px-2 py-1 rounded-full ${
                usuario.perfil === 'admin' 
                  ? 'bg-danger/10 text-danger' 
                  : 'bg-success/10 text-success'
              }`}>
                {usuario.perfil === 'admin' ? 'Admin' : 'Usuário'}
              </span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {menuAberto && (
              <div className="absolute right-0 mt-1 w-56 bg-background-component rounded-md shadow-md py-1 z-50 border border-border">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-medium text-text-primary">{usuario.nome}</p>
                  <p className="text-xs text-text-secondary mt-1">{usuario.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-primary-soft"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
} 