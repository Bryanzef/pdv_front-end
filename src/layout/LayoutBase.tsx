import React, { useEffect, useState } from 'react';
import { useUIPreferences } from '../contexts/UIPreferencesContext';
import Header from './Header';
import Sidebar from './Sidebar';
import clsx from 'clsx';

export default function LayoutBase({ children }: { children: React.ReactNode }) {
  const [sidebarMinimizada, setSidebarMinimizada] = useState(true);
  const { sidebarMode, sidebarMobileOpen } = useUIPreferences();

  useEffect(() => {
    if (sidebarMode === 'fixed') return;
    // In auto mode, default to minimized until hover/focus
    setSidebarMinimizada(true);
  }, [sidebarMode]);

  const mainContentClasses = clsx(
    'flex-1 flex flex-col transition-all duration-normal',
    'ml-0', // Mobile default
    {
      'md:ml-20': sidebarMinimizada,
      'md:ml-64': !sidebarMinimizada
    }
  );

  return (
    <div className="flex h-screen bg-background-app transition-colors">
      <Sidebar
        minimizada={sidebarMinimizada}
        setMinimizada={setSidebarMinimizada}
      />
      <div className={mainContentClasses}>
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
} 