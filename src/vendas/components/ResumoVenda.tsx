import React from 'react';
import type { FormaPagamento } from '../types';

interface ResumoVendaProps {
  quantidadeTotal: number;
  subtotal: number;
  desconto?: number;
  total: number;
  formaPagamento: FormaPagamento;
  troco: number;
}

const formaPagamentoLabel = {
  dinheiro: 'Dinheiro',
  debito: 'Cartão de Débito',
  credito: 'Cartão de Crédito',
  pix: 'PIX',
};

const ResumoVenda: React.FC<ResumoVendaProps> = ({
  quantidadeTotal,
  subtotal,
  desconto = 0,
  total,
  formaPagamento,
  troco,
}) => {
  const dataHora = new Date().toLocaleString('pt-BR');
  return (
    <div className="my-6 p-4 bg-white rounded shadow max-w-2xl border">
      <h3 className="font-bold mb-3 text-lg text-gray-800">Resumo da Venda</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <span className="text-gray-600">Itens:</span>
        <span className="font-semibold">{quantidadeTotal}</span>
        <span className="text-gray-600">Subtotal:</span>
        <span className="">R$ {subtotal.toFixed(2)}</span>
        <span className="text-gray-600">Descontos:</span>
        <span className="text-blue-700">- R$ {desconto.toFixed(2)}</span>
        <span className="text-gray-600">Total Final:</span>
        <span className="text-2xl font-bold text-green-700">R$ {total.toFixed(2)}</span>
        <span className="text-gray-600">Forma de Pagamento:</span>
        <span className="text-purple-700 font-semibold">{formaPagamentoLabel[formaPagamento]}</span>
        {troco > 0 && (
          <>
            <span className="text-gray-600">Troco:</span>
            <span className="text-orange-700 font-semibold">R$ {troco.toFixed(2)}</span>
          </>
        )}
        <span className="text-gray-600">Data/Hora:</span>
        <span className="text-gray-500">{dataHora}</span>
      </div>
    </div>
  );
};

export default ResumoVenda; 