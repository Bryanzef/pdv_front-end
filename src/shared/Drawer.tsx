import React, { ReactNode } from 'react';
import Button from './components/ui/Button';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  position?: 'right' | 'left';
  width?: string; // ex: 'max-w-lg'
  footer?: ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  position = 'right',
  width = 'max-w-md',
  footer
}) => {
  if (!isOpen) return null;

  const positionClasses = {
    right: 'right-0 ml-auto',
    left: 'left-0 mr-auto'
  };

  const animationClasses = {
    right: 'animate-slide-in-right',
    left: 'animate-slide-in-left'
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" 
        onClick={onClose}
      />
      
      {/* Painel lateral */}
      <div 
        className={`relative bg-background-component h-full shadow-lg border-border ${position === 'right' ? 'border-l' : 'border-r'} w-full sm:w-[480px] ${width} ${positionClasses[position]} ${animationClasses[position]} flex flex-col`}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
          <h2 className="text-lg sm:text-h2 font-semibold text-text-primary pr-8">{title}</h2>
          <button 
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary text-2xl font-medium focus:outline-none absolute top-4 right-4"
            aria-label="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Conteúdo com scroll */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-grow scrollable-element text-text-primary">
          {children}
        </div>
        
        {/* Rodapé opcional */}
        {footer && (
          <div className="p-4 sm:p-6 border-t border-border bg-background-component flex flex-col sm:flex-row sm:justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer; 