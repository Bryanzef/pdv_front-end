import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-all animate-fade-in">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl w-11/12 max-w-md shadow-2xl border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-green-900 dark:text-green-200 flex items-center gap-2">
          <span>⚠️</span> {title}
        </h2>
        <div className="mb-4 text-gray-700 dark:text-gray-200">{content}</div>
      </div>
    </div>
  );
};

export default Modal;