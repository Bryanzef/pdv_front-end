import React from 'react';
import type { FormaPagamento } from '../types';

interface FormaPagamentoProps {
  formaPagamento: FormaPagamento;
  setFormaPagamento: (f: FormaPagamento) => void;
  valorPago: string;
  setValorPago: (v: string) => void;
  troco: number;
  parcelas: number;
  setParcelas: (n: number) => void;
  total: number;
  valoresPredefinidos: number[];
}

const opcoes = [
  { value: 'dinheiro', label: 'Dinheiro', icon: '💵' },
  { value: 'debito', label: 'Débito', icon: '🏧' },
  { value: 'credito', label: 'Crédito', icon: '💳' },
  { value: 'pix', label: 'PIX', icon: '🔗' },
];

const FormaPagamento: React.FC<FormaPagamentoProps> = ({
  formaPagamento,
  setFormaPagamento,
  valorPago,
  setValorPago,
  troco,
  parcelas,
  setParcelas,
  total,
  valoresPredefinidos
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d,.]/g, '');
    setValorPago(value);
  };

  const handleValorPredefinido = (v: number) => {
    setValorPago(v.toFixed(2).replace('.', ','));
  };

  return (
    <div className="my-6 p-4 bg-gray-50 rounded shadow max-w-2xl">
      <h3 className="font-bold mb-2">Forma de Pagamento</h3>
      <div className="flex gap-2 mb-4">
        {opcoes.map(op => (
          <button
            key={op.value}
            type="button"
            className={`flex flex-col items-center px-4 py-2 rounded border-2 transition-colors font-semibold ${
              formaPagamento === op.value ? 'border-green-600 bg-green-100' : 'border-gray-300 bg-white'
            }`}
            onClick={() => setFormaPagamento(op.value as FormaPagamento)}
            aria-pressed={formaPagamento === op.value}
          >
            <span className="text-2xl mb-1">{op.icon}</span>
            <span>{op.label}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block mb-1 font-medium">Valor Pago</label>
          <input
            type="text"
            inputMode="decimal"
            className="border p-2 rounded w-32"
            value={valorPago}
            onChange={handleInputChange}
            placeholder="R$"
            autoComplete="off"
          />
          <div className="flex gap-1 mt-1">
            {valoresPredefinidos.map(v => (
              <button
                key={v}
                type="button"
                className="bg-gray-200 px-2 py-1 rounded text-sm hover:bg-green-200"
                onClick={() => handleValorPredefinido(v)}
              >
                R$ {v}
              </button>
            ))}
          </div>
        </div>
        {formaPagamento === 'dinheiro' && (
          <div>
            <label className="block mb-1 font-medium">Troco</label>
            <input
              type="text"
              className="border p-2 rounded w-24 bg-gray-100"
              value={troco > 0 ? `R$ ${troco.toFixed(2)}` : 'R$ 0,00'}
              readOnly
            />
          </div>
        )}
        {formaPagamento === 'credito' && (
          <div>
            <label className="block mb-1 font-medium">Parcelas</label>
            <select
              className="border p-2 rounded w-24"
              value={parcelas}
              onChange={e => setParcelas(Number(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                <option key={n} value={n} disabled={total / n < 5}>
                  {n}x de R$ {(total / n).toFixed(2)}
                </option>
              ))}
            </select>
            <span className="text-xs text-gray-500 block mt-1">Mín. R$ 5,00/parcela</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormaPagamento; 