import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Package, Users, ChartBar } from 'phosphor-react';
import Card from '../shared/components/ui/Card';

interface QuickLinkProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  color: string;
}

const QuickLink: React.FC<QuickLinkProps> = ({ title, description, icon, to, color }) => (
  <Link to={to} className="block w-full">
    <Card 
      hover={true} 
      clickable={true}
      className={`border-l-4 ${color} h-full`}
    >
      <div className="flex items-start">
        <div className={`p-3 rounded-lg mr-4 ${color.replace('border-l', 'bg').replace('4', '100')}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-text-primary mb-1">{title}</h3>
          <p className="text-text-secondary text-sm">{description}</p>
        </div>
      </div>
    </Card>
  </Link>
);

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h1 className="text-h1 font-bold text-text-primary mb-2">Bem-vindo ao PDV Fruteira</h1>
        <p className="text-lg text-text-secondary mb-6">Selecione uma das opções abaixo para começar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickLink 
          title="Nova Venda" 
          description="Registrar nova venda de produtos"
          icon={<ShoppingCart size={24} weight="fill" className="text-primary" />}
          to="/vendas"
          color="border-l-primary"
        />
        <QuickLink 
          title="Produtos" 
          description="Gerenciar catálogo de produtos"
          icon={<Package size={24} weight="fill" className="text-secondary" />}
          to="/produtos"
          color="border-l-secondary"
        />
        <QuickLink 
          title="Usuários" 
          description="Gerenciar usuários do sistema"
          icon={<Users size={24} weight="fill" className="text-accent" />}
          to="/usuarios"
          color="border-l-accent"
        />
        <QuickLink 
          title="Relatórios" 
          description="Visualizar estatísticas e relatórios"
          icon={<ChartBar size={24} weight="fill" className="text-success" />}
          to="/relatorio"
          color="border-l-success"
        />
      </div>

      <Card className="mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between p-2">
          <div>
            <h2 className="text-h2 font-semibold text-text-primary mb-2">Dica do Dia</h2>
            <p className="text-text-secondary">Você sabia que pode acessar o histórico de vendas para visualizar transações anteriores?</p>
          </div>
          <Link 
            to="/historico" 
            className="mt-4 md:mt-0 bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-md transition-all"
          >
            Ver Histórico
          </Link>
        </div>
      </Card>
    </div>
  );
} 