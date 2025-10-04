import React, { ReactNode } from 'react';
import Button from './components/ui/Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
  footer?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  content, 
  footer, 
  maxWidth = 'md' 
}) => {
  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    'full': 'max-w-full'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 sm:p-0 transition-all">
      <div className={`bg-background-component rounded-lg shadow-lg w-full ${maxWidthClasses[maxWidth]} animate-fade-in overflow-hidden`}>
        <div className="p-4 sm:p-6 border-b border-border">
          <h2 className="text-lg sm:text-h2 font-semibold text-text-primary pr-8">{title}</h2>
        </div>
        
        <div className="p-4 sm:p-6 text-text-primary max-h-[calc(80vh-140px)] overflow-y-auto scrollable-element">
          {content}
        </div>
        
        {footer ? (
          <div className="p-4 sm:p-6 border-t border-border flex flex-col sm:flex-row sm:justify-end gap-3">
            {footer}
          </div>
        ) : (
          <div className="p-4 sm:p-6 border-t border-border flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose}>Fechar</Button>
          </div>
        )}

        {/* Botão fechar no canto superior direito para mobile */}
        <button
          className="absolute top-4 right-4 text-text-secondary hover:text-text-primary p-1"
          onClick={onClose}
          aria-label="Fechar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Modal;