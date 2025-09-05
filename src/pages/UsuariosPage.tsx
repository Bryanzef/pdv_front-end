import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Usuarios from '../usuarios/Usuarios';

export default function UsuariosPage() {
  return (
    <div className="p-8">
      <Usuarios />
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
} 