import { ChartBar, ClockCounterClockwise, House, Package, ShoppingCart, Users } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const menu = [
  { label: 'Início', path: '/', icon: House },
  { label: 'Vendas', path: '/vendas', icon: ShoppingCart },
  { label: 'Histórico de Vendas', path: '/historico', icon: ClockCounterClockwise },
  { label: 'Relatório de Vendas', path: '/relatorio', icon: ChartBar },
  { label: 'Produtos', path: '/produtos', icon: Package },
  { label: 'Usuários', path: '/usuarios', icon: Users },
];

interface SidebarProps {
  minimizada: boolean;
  setMinimizada: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ minimizada, setMinimizada }) => {
  const { usuario } = useAuth();
 
  // Filtrar menu baseado no role do usuário
  const menuFiltrado = menu.filter(item => !item || usuario?.role === 'admin');
 
  return (
    <aside
      className={`fixed top-0 left-0 h-full z-40 bg-gradient-to-b from-green-700 to-green-900 dark:from-gray-900 dark:to-gray-800 text-white shadow-lg flex flex-col transition-all duration-300
        ${minimizada ? 'w-20' : 'w-64'}
      `}
    >
      <div className="h-16 flex items-center justify-between border-b border-green-800 dark:border-gray-700 px-4">
        <span className={`text-2xl font-bold tracking-wide transition-all duration-300 ${minimizada ? 'opacity-0 w-0' : 'opacity-100 w-auto'} dark:text-gray-100`}>
          Fruteira do Zé
        </span>
        <button
          className="text-white text-xl focus:outline-none ml-auto"
          onClick={() => setMinimizada((m) => !m)}
          title={minimizada ? 'Expandir menu' : 'Minimizar menu'}
        >
          <span>{minimizada ? '»' : '«'}</span>
        </button>
      </div>
      
      <nav className="flex-1 py-8 px-2 space-y-2">
        {menuFiltrado.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-2 rounded-lg font-medium transition-colors duration-200
              ${isActive 
                ? 'bg-green-100 text-green-900 dark:bg-gray-700 dark:text-gray-100' 
                : 'text-green-100 hover:bg-green-600 dark:text-gray-300 dark:hover:bg-gray-700'
              }`
            }
            title={item.label}
            onClick={() => setMinimizada(true)}
          >
            {({ isActive }) => {
              const Icon = item.icon;
              const iconClass = isActive
                ? 'text-green-700 dark:text-gray-100'
                : 'text-green-200 dark:text-gray-400';
              return (
                <>
                  <Icon size={24} weight="regular" className={iconClass} />
                  {!minimizada && <span className="text-sm">{item.label}</span>}
                </>
              );
            }}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;