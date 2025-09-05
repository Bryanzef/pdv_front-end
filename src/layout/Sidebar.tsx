import { ChartBar, ClockCounterClockwise, House, Package, ShoppingCart, Users } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUIPreferences } from '../contexts/UIPreferencesContext';

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
  const { sidebarMode, setSidebarMode } = useUIPreferences();
 
  // Filtrar menu baseado no role do usuário
  const menuFiltrado = menu.filter(item => !item || usuario?.perfil === 'admin');
 
  const handleMouseEnter = () => {
    if (sidebarMode === 'auto') setMinimizada(false);
  };
  const handleMouseLeave = () => {
    if (sidebarMode === 'auto') setMinimizada(true);
  };

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed top-0 left-0 h-full z-40 bg-gradient-to-b from-primary to-primary-dark dark:from-gray-900 dark:to-gray-800 text-white shadow-lg flex flex-col transition-all duration-300
        ${minimizada ? 'w-20' : 'w-64'}
      `}
    >
      <div className="h-16 flex items-center justify-between border-b border-green-800 dark:border-gray-700 px-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <ShoppingCart size={22} className="text-white" />
          <span className={`text-xl font-semibold tracking-wide transition-all duration-300 ${minimizada ? 'opacity-0 -translate-x-3 w-0' : 'opacity-100 translate-x-0 w-auto'} dark:text-gray-100 font-display whitespace-nowrap`}> 
            <span className="md:hidden">PDV</span>
            <span className="hidden md:inline">PDV Fruteira</span>
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            className="text-white text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md"
            onClick={() => setSidebarMode(sidebarMode === 'fixed' ? 'auto' : 'fixed')}
            title={sidebarMode === 'fixed' ? 'Mudar para auto-ocultar' : 'Mudar para fixo'}
          >
            {sidebarMode === 'fixed' ? 'Fixo' : 'Auto'}
          </button>
          <button
            className="text-white text-xl focus:outline-none"
            onClick={() => setMinimizada((m) => !m)}
            title={minimizada ? 'Expandir menu' : 'Minimizar menu'}
          >
            <span>{minimizada ? '»' : '«'}</span>
          </button>
        </div>
      </div>
      
      <nav className="flex-1 py-8 px-2 space-y-2">
        {menuFiltrado.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-2 rounded-lg font-medium transition-colors duration-200
              ${isActive 
                ? 'bg-white/10 text-white dark:bg-gray-700 dark:text-gray-100' 
                : 'text-white/80 hover:bg-white/10 dark:text-gray-300 dark:hover:bg-gray-700'
              }`
            }
            title={item.label}
            onClick={() => {
              if (sidebarMode === 'auto') setMinimizada(true);
            }}
          >
            {({ isActive }) => {
              const Icon = item.icon;
              const iconClass = isActive
                ? 'text-white dark:text-gray-100'
                : 'text-white/80 dark:text-gray-400';
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