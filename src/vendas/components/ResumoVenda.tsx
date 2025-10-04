import React from 'react';
import type { FormaPagamento } from '../types';
import { CurrencyDollar, ShoppingBag, Tag, Receipt, CreditCard, Bank, Money, Barcode, CalendarBlank } from 'phosphor-react';

interface ResumoVendaProps {
  quantidadeTotal: number;
  subtotal: number;
  desconto?: number;
  total: number;
  formaPagamento: FormaPagamento;
  troco: number;
  compacto?: boolean;
}

const formaPagamentoLabel = {
  dinheiro: 'Dinheiro',
  debito: 'Cartão de Débito',
  credito: 'Cartão de Crédito',
  pix: 'PIX',
};

const formaPagamentoIcons = {
  dinheiro: <Money size={18} weight="bold" />,
  debito: <Bank size={18} weight="bold" />,
  credito: <CreditCard size={18} weight="bold" />,
  pix: <Barcode size={18} weight="bold" />,
};

const ResumoVenda: React.FC<ResumoVendaProps> = ({
  quantidadeTotal,
  subtotal,
  desconto = 0,
  total,
  formaPagamento,
  troco,
  compacto = false
}) => {
  const dataHora = new Date().toLocaleString('pt-BR');
  
  if (compacto) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 min-w-[280px]">
        {/* Primeira linha - Itens e data/hora */}
        <div className="flex items-center gap-1 text-text-secondary">
          <ShoppingBag size={16} className="min-w-4" />
          <span className="whitespace-nowrap">{quantidadeTotal} {quantidadeTotal === 1 ? 'item' : 'itens'}</span>
        </div>
        
        <div className="md:col-span-2 flex items-center justify-end gap-1 text-text-secondary text-sm">
          <CalendarBlank size={14} className="min-w-4" />
          <span className="whitespace-nowrap">{dataHora}</span>
        </div>

        {/* Segunda linha - Forma de pagamento e valor total */}
        <div className="flex items-center">
          {formaPagamento ? (
            <span className="flex items-center text-primary gap-1 bg-primary-soft px-2 py-1 rounded-full text-sm whitespace-nowrap">
              {formaPagamentoIcons[formaPagamento]}
              {formaPagamentoLabel[formaPagamento]}
            </span>
          ) : (
            <span className="text-text-secondary text-sm italic">Sem pagamento</span>
          )}
        </div>
        
        <div className="md:col-span-2 flex items-center justify-end">
          <span className="text-xl font-bold text-primary whitespace-nowrap">
            R$ {total.toFixed(2)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center py-2 border-b border-border">
        <span className="text-h3 font-semibold flex items-center gap-2">
          <Receipt size={20} />
          Resumo
        </span>
        <span className="text-text-secondary text-sm">{dataHora}</span>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1 text-text-secondary">
            <ShoppingBag size={18} /> 
            Itens
          </span>
          <span className="font-medium">{quantidadeTotal}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1 text-text-secondary">
            <Tag size={18} />
            Subtotal
          </span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        
        {desconto > 0 && (
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1 text-text-secondary">
              <Tag size={18} />
              Descontos
            </span>
            <span className="text-accent">- R$ {desconto.toFixed(2)}</span>
          </div>
        )}
        
        <div className="pt-2 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-xl font-bold text-primary">R$ {total.toFixed(2)}</span>
          </div>
        </div>
        
        {formaPagamento && (
          <div className="flex justify-between items-center pt-2">
            <span className="flex items-center gap-1 text-text-secondary">
              <CurrencyDollar size={18} />
              Forma de pagamento
            </span>
            <span className="flex items-center gap-1 text-primary bg-primary-soft px-2 py-1 rounded-full">
              {formaPagamentoIcons[formaPagamento]}
              {formaPagamentoLabel[formaPagamento]}
            </span>
          </div>
        )}
        
        {troco > 0 && (
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1 text-text-secondary">Troco</span>
            <span className="font-semibold">R$ {troco.toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumoVenda; 