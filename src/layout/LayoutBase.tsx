import Sidebar from './Sidebar';
import Header from './Header';
import React, { useState } from 'react';

export default function LayoutBase({ children }: { children: React.ReactNode }) {
  const [sidebarMinimizada, setSidebarMinimizada] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        minimizada={sidebarMinimizada}
        setMinimizada={setSidebarMinimizada}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${sidebarMinimizada ? 'ml-20' : 'ml-64'}`}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
} 