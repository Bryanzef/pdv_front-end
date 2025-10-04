import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { ChartBar, ClockCounterClockwise, House, Package, ShoppingCart, Users, X } from 'phosphor-react';
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
  const { sidebarMode, setSidebarMode, sidebarMobileOpen, setSidebarMobileOpen } = useUIPreferences();
 
  // Filtrar menu baseado no role do usuário
  const menuFiltrado = menu.filter(item => !item.path.includes('usuarios') || usuario?.perfil === 'admin');
 
  const handleMouseEnter = () => {
    if (sidebarMode === 'auto') setMinimizada(false);
  };
  
  const handleMouseLeave = () => {
    if (sidebarMode === 'auto') setMinimizada(true);
  };

  // Fechar sidebar mobile quando mudar de rota
  const handleItemClick = () => {
    if (window.innerWidth < 768) { // Mobile
      setSidebarMobileOpen(false);
    } else if (sidebarMode === 'auto') {
      setMinimizada(true);
    }
  };

  return (
    <>
      {/* Overlay para dispositivos móveis */}
      {sidebarMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => setSidebarMobileOpen(false)}
        ></div>
      )}

    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
        className={`fixed top-0 h-full bg-secondary text-white shadow-lg flex flex-col transition-all duration-normal
          ${sidebarMobileOpen ? 'left-0' : '-left-full md:left-0'}
        ${minimizada ? 'w-20' : 'w-64'}
          z-40
      `}
    >
        <div className="h-16 flex items-center justify-between border-b border-secondary-hover px-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <ShoppingCart size={22} className="text-white" />
            <span className={`text-xl font-semibold tracking-wide transition-all duration-normal ${minimizada ? 'opacity-0 -translate-x-3 w-0' : 'opacity-100 translate-x-0 w-auto'} text-white whitespace-nowrap`}> 
            <span className="md:hidden">PDV</span>
            <span className="hidden md:inline">PDV Fruteira</span>
          </span>
        </div>
          
        <div className="ml-auto flex items-center gap-2">
            {/* Botão fechar para mobile */}
            <button
              className="md:hidden text-white hover:text-white/80"
              onClick={() => setSidebarMobileOpen(false)}
              aria-label="Fechar menu"
            >
              <X size={20} weight="bold" />
            </button>
            
            {/* Botões para desktop */}
            <div className="hidden md:flex items-center gap-2">
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
      </div>
      
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {menuFiltrado.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
              onClick={handleItemClick}
            className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-3 rounded-md font-medium transition-colors duration-normal relative
              ${isActive 
                  ? 'bg-secondary-hover text-white before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary' 
                  : 'text-white/80 hover:bg-secondary-hover'
              }`
            }
            title={item.label}
          >
            {({ isActive }) => {
              const Icon = item.icon;
              const iconClass = isActive
                  ? 'text-white'
                  : 'text-white/80';
              return (
                <>
                    <Icon size={22} weight={isActive ? "fill" : "regular"} className={iconClass} />
                    {(!minimizada || window.innerWidth < 768) && <span className="text-sm">{item.label}</span>}
                </>
              );
            }}
          </NavLink>
        ))}
      </nav>
    </aside>
    </>
  );
};

export default Sidebar;