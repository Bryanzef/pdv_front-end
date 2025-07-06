import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-all animate-fade-in">
      <div className="bg-white p-8 rounded-2xl w-11/12 max-w-md shadow-2xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-green-900 flex items-center gap-2">
          <span>⚠️</span> {title}
        </h2>
        <div className="mb-4 text-gray-700">{content}</div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors font-semibold shadow"
            onClick={onConfirm}
            autoFocus
          >
            Confirmar
          </button>
          <button
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors font-semibold shadow"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;