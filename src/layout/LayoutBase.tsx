import React, { useEffect, useState } from 'react';
import { useUIPreferences } from '../contexts/UIPreferencesContext';
import Header from './Header';
import Sidebar from './Sidebar';

export default function LayoutBase({ children }: { children: React.ReactNode }) {
  const [sidebarMinimizada, setSidebarMinimizada] = useState(true);
  const { sidebarMode } = useUIPreferences();

  useEffect(() => {
    if (sidebarMode === 'fixed') return;
    // In auto mode, default to minimized until hover/focus
    setSidebarMinimizada(true);
  }, [sidebarMode]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Sidebar
        minimizada={sidebarMinimizada}
        setMinimizada={setSidebarMinimizada}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${sidebarMinimizada ? 'ml-20' : 'ml-64'}`}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-8 bg-white dark:bg-gray-900 transition-colors">{children}</main>
      </div>
    </div>
  );
} 