import React, { useEffect, useState } from 'react';
import { CheckCircle, Warning, X, Info } from 'phosphor-react';

type FeedbackType = 'success' | 'error' | 'warning' | 'info';

interface ApiFeedbackProps {
  message: string;
  type?: FeedbackType;
  duration?: number; // duração em milissegundos
  onClose?: () => void;
  position?: 'top' | 'bottom'; // posição na tela
  fullWidth?: boolean; // se deve ocupar toda a largura
  showIcon?: boolean;
  showCloseButton?: boolean;
  solution?: string; // sugestão de solução para o erro
}

const getFeedbackIcon = (type: FeedbackType) => {
  switch (type) {
    case 'success':
      return <CheckCircle weight="fill" size={24} />;
    case 'error':
      return <Warning weight="fill" size={24} />;
    case 'warning':
      return <Warning size={24} />;
    case 'info':
      return <Info size={24} />;
    default:
      return null;
  }
};

const getFeedbackColor = (type: FeedbackType) => {
  switch (type) {
    case 'success':
      return 'bg-success/10 text-success border-success/20';
    case 'error':
      return 'bg-danger/10 text-danger border-danger/20';
    case 'warning':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'info':
      return 'bg-primary/10 text-primary border-primary/20';
    default:
      return 'bg-primary/10 text-primary border-primary/20';
  }
};

const ApiFeedback: React.FC<ApiFeedbackProps> = ({
  message,
  type = 'info',
  duration = 0, // 0 significa que não irá sumir automaticamente
  onClose,
  position = 'top',
  fullWidth = false,
  showIcon = true,
  showCloseButton = true,
  solution
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible || !message) return null;

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const positionClasses = position === 'top'
    ? 'top-0 mt-4'
    : 'bottom-0 mb-4';

  const widthClasses = fullWidth
    ? 'w-full rounded-none'
    : 'max-w-lg rounded-lg mx-auto';

  return (
    <div className={`fixed ${positionClasses} left-1/2 transform -translate-x-1/2 z-50 ${widthClasses} shadow-lg transition-all duration-300`}>
      <div className={`flex items-start gap-3 p-4 border ${getFeedbackColor(type)}`}>
        {showIcon && (
          <div className="flex-shrink-0 mt-0.5">
            {getFeedbackIcon(type)}
          </div>
        )}
        
        <div className="flex-1">
          <div className="font-medium">{message}</div>
          
          {solution && (
            <div className="mt-1 text-sm opacity-90">
              {solution}
            </div>
          )}
        </div>
        
        {showCloseButton && (
          <button 
            onClick={handleClose}
            className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ApiFeedback; 