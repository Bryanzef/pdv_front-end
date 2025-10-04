import React, { useState } from 'react';
import api from '../config/api';
import Card from '../shared/components/ui/Card';
import Button from '../shared/components/ui/Button';
import Input from '../shared/components/ui/Input';
import { ChartBar, Package, ShoppingCart, CurrencyCircleDollar, CalendarBlank, ArrowRight } from 'phosphor-react';

interface Relatorio {
  totalVendas: number;
  totalItensKg: number;
  totalItensUn: number;
  valorTotal: number;
  formasPagamento: Record<string, number>;
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color }) => (
  <Card className="h-full">
    <div className="flex items-center gap-4">
      <div className={`p-4 rounded-lg ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-label text-text-secondary">{title}</p>
        <h3 className="text-h2 font-bold text-text-primary">{value}</h3>
      </div>
    </div>
  </Card>
);

const Relatorio: React.FC = () => {
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [relatorio, setRelatorio] = useState<Relatorio | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const gerarRelatorio = async () => {
    if (!inicio || !fim) {
      setFeedback('Selecione o período inicial e final.');
      return;
    }
    setLoading(true);
    setFeedback('');
    try {
      const res = await api.get('/vendas/relatorio', {
        params: { inicio, fim }
      });
      setRelatorio(res.data);
    } catch {
      setFeedback('Erro ao gerar relatório');
    } finally {
      setLoading(false);
    }
  };

  // Função para determinar a cor da barra baseada na forma de pagamento
  const getBarColor = (formaPagamento: string) => {
    switch(formaPagamento.toLowerCase()) {
      case 'dinheiro': return 'bg-success';
      case 'pix': return 'bg-primary';
      case 'cartão': 
      case 'cartao':
      case 'cartão de crédito':
      case 'cartao de credito': return 'bg-secondary';
      default: return 'bg-accent';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-h1 font-bold text-text-primary">Relatório de Vendas</h1>
      
      {/* Filtros */}
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Input 
              type="date" 
              label="Data Inicial" 
              value={inicio} 
              onChange={e => setInicio(e.target.value)} 
              leftAddon={<CalendarBlank size={18} className="text-text-secondary" />}
            />
          </div>
          <div>
            <Input 
              type="date" 
              label="Data Final" 
              value={fim} 
              onChange={e => setFim(e.target.value)} 
              leftAddon={<CalendarBlank size={18} className="text-text-secondary" />}
            />
          </div>
          <div className="flex items-end">
            <Button
              variant="primary"
              onClick={gerarRelatorio}
              disabled={loading}
              loading={loading}
              fullWidth
              className="h-[42px]"
            >
              {loading ? 'Gerando...' : 'Gerar Relatório'}
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Feedback de erro */}
      {feedback && (
        <div className="p-3 rounded-md text-center font-medium bg-danger/10 text-danger">
          {feedback}
        </div>
      )}
      
      {/* Conteúdo do relatório */}
      {relatorio && (
        <div className="space-y-6">
          {/* Cards de métricas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard 
              title="Total de Vendas"
              value={relatorio.totalVendas.toString()}
              icon={<ShoppingCart size={24} className="text-white" />}
              color="bg-primary/90"
            />
            
            <MetricCard 
              title="Valor Total Vendido"
              value={`R$ ${Number(relatorio.valorTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              icon={<CurrencyCircleDollar size={24} className="text-white" />}
              color="bg-success/90"
            />
            
            <MetricCard 
              title="Itens por Peso (kg)"
              value={`${relatorio.totalItensKg} kg`}
              icon={<Package size={24} className="text-white" />}
              color="bg-accent/90"
            />
            
            <MetricCard 
              title="Itens por Unidade"
              value={`${relatorio.totalItensUn} un`}
              icon={<Package size={24} className="text-white" />}
              color="bg-secondary/90"
            />
          </div>
          
          {/* Formas de Pagamento */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tabela de Formas de Pagamento */}
            <Card>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">Formas de Pagamento</h2>
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-background-app border-b border-border">
                    <tr>
                      <th className="text-left p-3 text-sm font-semibold text-text-primary">Forma de Pagamento</th>
                      <th className="text-right p-3 text-sm font-semibold text-text-primary">Valor</th>
                      <th className="text-right p-3 text-sm font-semibold text-text-primary">Percentual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(relatorio.formasPagamento).map(([forma, valor]) => (
                      <tr key={forma} className="border-b border-border hover:bg-background-app">
                        <td className="p-3">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${getBarColor(forma)}`}></div>
                            <span className="capitalize">{forma}</span>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          R$ {Number(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-3 text-right">
                          {((valor / relatorio.valorTotal) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            
            {/* Gráfico de barras */}
            <Card>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">Total por Forma de Pagamento</h2>
              <div className="flex gap-4 items-end h-60">
                {Object.entries(relatorio.formasPagamento).map(([forma, valor]) => {
                  const percentage = (valor / relatorio.valorTotal) * 100;
                  const height = Math.max(10, percentage); // Altura mínima da barra é 10%
                  return (
                    <div key={forma} className="flex flex-col items-center justify-end h-full flex-1">
                      <div className="mb-2 text-sm font-medium">
                        {percentage.toFixed(0)}%
                      </div>
                      <div
                        className={`w-full rounded-t transition-all duration-500 ${getBarColor(forma)}`}
                        style={{ height: `${height}%` }}
                      ></div>
                      <div className="text-xs mt-2 text-center capitalize text-text-secondary w-full truncate">
                        {forma}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
          
          {/* Período do relatório */}
          <div className="bg-primary-soft p-4 rounded-md flex items-center justify-center gap-2 text-text-primary text-sm">
            <CalendarBlank size={18} />
            <span>Relatório gerado para o período de </span>
            <strong>{new Date(inicio).toLocaleDateString('pt-BR')}</strong>
            <ArrowRight size={18} />
            <strong>{new Date(fim).toLocaleDateString('pt-BR')}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default Relatorio; 