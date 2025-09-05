import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type SidebarMode = 'fixed' | 'auto';

interface UIPreferencesContextType {
  sidebarMode: SidebarMode;
  setSidebarMode: (mode: SidebarMode) => void;
}

const UIPreferencesContext = createContext<UIPreferencesContextType | undefined>(undefined);

export const UIPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarMode');
      if (saved === 'fixed' || saved === 'auto') return saved;
    }
    return 'fixed';
  });

  useEffect(() => {
    localStorage.setItem('sidebarMode', sidebarMode);
  }, [sidebarMode]);

  const value = useMemo(() => ({ sidebarMode, setSidebarMode }), [sidebarMode]);

  return (
    <UIPreferencesContext.Provider value={value}>
      {children}
    </UIPreferencesContext.Provider>
  );
};

export const useUIPreferences = () => {
  const ctx = useContext(UIPreferencesContext);
  if (!ctx) throw new Error('useUIPreferences deve ser usado dentro de UIPreferencesProvider');
  return ctx;
};


