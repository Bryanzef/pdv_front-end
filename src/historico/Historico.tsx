import React, { useEffect, useState } from 'react';
import api from '../config/api';
import Modal from '../shared/Modal';
import { getVendaPorId } from '../vendas/services/vendasApi';
import { gerarPdfVenda } from '../vendas/utils/pdfHelpers';
import Card from '../shared/components/ui/Card';
import Button from '../shared/components/ui/Button';
import { CalendarBlank, Printer, MagnifyingGlass } from 'phosphor-react';
import Input from '../shared/components/ui/Input';

interface VendaHistorico {
  id: string;
  createdAt: string;
  total: string;
  metodoPagamento: string;
}

const Historico: React.FC = () => {
  const [vendas, setVendas] = useState<VendaHistorico[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalExcluir, setModalExcluir] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [filtro, setFiltro] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  useEffect(() => {
    carregarVendas();
  }, [page]);

  const carregarVendas = () => {
    const params: any = { page, limit: 10 };
    
    if (filtro) {
      params.filtro = filtro;
    }
    
    if (dataInicio) {
      params.dataInicio = dataInicio;
    }
    
    if (dataFim) {
      params.dataFim = dataFim;
    }

    api.get('/vendas/historico', { params })
      .then((res) => {
        setVendas(res.data.vendas);
        setTotalPages(res.data.totalPages);
      })
      .catch(() => setFeedback('Erro ao carregar vendas'));
  };

  const handleFiltrar = () => {
    setPage(1);
    carregarVendas();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-h1 font-bold text-text-primary">Histórico de Vendas</h1>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => {
              setFiltro('');
              setDataInicio('');
              setDataFim('');
              setPage(1);
              carregarVendas();
            }}
          >
            Limpar Filtros
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card variant="outlined" className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Input 
              label="Filtrar por pagamento" 
              placeholder="Dinheiro, PIX, etc..." 
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
          <div>
            <Input 
              type="date" 
              label="Data Início" 
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
          </div>
          <div>
            <Input 
              type="date" 
              label="Data Fim" 
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button 
            variant="primary" 
            size="sm"
            leftIcon={<MagnifyingGlass size={16} />}
            onClick={handleFiltrar}
          >
            Filtrar
          </Button>
        </div>
      </Card>

      {/* Feedback */}
      {feedback && (
        <div className={`p-3 rounded-md text-center font-medium ${
          feedback.includes('sucesso') 
            ? 'bg-success/10 text-success' 
            : 'bg-danger/10 text-danger'
        }`}>
          {feedback}
        </div>
      )}

      {/* Tabela de vendas */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-background-app text-text-primary border-b border-border">
                <th className="text-left p-4 font-semibold text-sm uppercase">
                  <div className="flex items-center gap-2">
                    <CalendarBlank size={16} />
                    Data
                  </div>
                </th>
                <th className="text-left p-4 font-semibold text-sm uppercase">Valor da Venda</th>
                <th className="text-left p-4 font-semibold text-sm uppercase">Forma de Pagamento</th>
                <th className="text-center p-4 font-semibold text-sm uppercase">Ações</th>
              </tr>
            </thead>
            <tbody>
              {vendas.length > 0 ? (
                vendas.map(v => (
                  <tr key={v.id} className="border-b border-border hover:bg-primary-soft">
                    <td className="p-4">{new Date(v.createdAt).toLocaleString('pt-BR')}</td>
                    <td className="p-4">R$ {Number(v.total).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="p-4">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          v.metodoPagamento === 'Dinheiro' 
                            ? 'bg-success/10 text-success' 
                            : v.metodoPagamento === 'PIX' 
                              ? 'bg-primary/10 text-primary'
                              : 'bg-accent/10 text-accent'
                        }`}
                      >
                        {v.metodoPagamento}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Printer size={16} />}
                        onClick={async () => {
                          try {
                            const venda = await getVendaPorId(v.id);
                            const itens = venda.saleItems.map((item: any) => ({
                              nome: item.nome,
                              quantidade: item.quantidade,
                              preco: Number(item.preco),
                              tipo: item.product?.categoria || item.product?.tipo || 'un',
                              subtotal: Number(item.preco) * Number(item.quantidade)
                            }));
                            gerarPdfVenda(itens, Number(venda.total));
                          } catch (e) {
                            setFeedback('Erro ao reimprimir cupom');
                          }
                        }}
                      >
                        Reimprimir
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-text-secondary">
                    Nenhuma venda encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Paginação */}
        {totalPages > 0 && (
          <div className="flex justify-center items-center gap-2 p-4 border-t border-border mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Anterior
            </Button>
            <span className="text-text-secondary text-sm">
              Página {page} de {totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Próxima
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Historico; 