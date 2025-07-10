import type { ReactNode } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: string; // ex: 'max-w-lg'
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children, width = 'max-w-lg' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" onClick={onClose}></div>
      {/* Painel lateral */}
      <div className={`relative bg-white dark:bg-gray-900 h-full shadow-2xl border-l border-gray-100 dark:border-gray-800 w-full sm:w-[480px] ${width} ml-auto animate-slide-in-right`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-green-900 dark:text-green-200 flex items-center gap-2">
            <span>📄</span> {title}
          </h2>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 text-2xl font-bold">&times;</button>
        </div>
        <div className="p-6 overflow-y-auto h-[calc(100vh-80px)] text-gray-800 dark:text-gray-100">{children}</div>
      </div>
    </div>
  );
};

export default Drawer; 