import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { jsPDF } from 'jspdf';
import Modal from '../shared/Modal';
import type {  Venda } from './types';

const Historico: React.FC = () => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [modalExcluir, setModalExcluir] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/vendas`)
      .then((res: AxiosResponse<Venda[]>) => setVendas(res.data))
      .catch(() => setFeedback('Erro ao carregar vendas'));
  }, []);

  const visualizarVenda = (venda: Venda) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Fruteira do Zé - Documento Não Fiscal', 20, 20);
    doc.setFontSize(12);
    doc.text(`Data: ${new Date(venda.data).toLocaleString('pt-BR')}`, 20, 30);
    doc.text('---------------------------------------------', 20, 40);
    let y = 50;
    venda.itens.forEach((item, index) => {
      const linha = `${index + 1}. ${item.nome} - ${item.quantidade} ${item.tipo === 'peso' ? 'kg' : 'un'} x R$ ${item.preco.toFixed(2)} = R$ ${item.subtotal.toFixed(2)}`;
      doc.text(linha, 20, y);
      if (item.justificativa) {
        doc.text(`   * Justificativa: ${item.justificativa}`, 20, y + 5);
        y += 5;
      }
      y += 10;
    });
    doc.text('---------------------------------------------', 20, y);
    doc.text(`Total: R$ ${venda.total.toFixed(2)}`, 20, y + 10);
    doc.save(`venda_${venda._id}.pdf`);
  };

  const excluirVenda = async () => {
    if (!modalExcluir) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/vendas/${modalExcluir}`);
      setVendas(vendas.filter(v => v._id !== modalExcluir));
      setModalExcluir(null);
      setFeedback('Venda excluída com sucesso.');
    } catch (err) {
      setFeedback('Erro ao excluir venda');
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-green-900 flex items-center gap-2">
        <span>📈</span> Histórico de Vendas
      </h2>
      {feedback && (
        <div className={`my-2 p-2 rounded text-center font-medium ${feedback.includes('sucesso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {feedback}
        </div>
      )}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-100 text-green-900">
              <th className="border p-2">Data</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map(v => (
              <tr key={v._id} className="hover:bg-green-50">
                <td className="border p-2">{new Date(v.data).toLocaleString('pt-BR')}</td>
                <td className="border p-2">R$ {v.total.toFixed(2)}</td>
                <td className="border p-2 flex gap-2 justify-center">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                    onClick={() => visualizarVenda(v)}
                    title="Visualizar PDF"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                    onClick={() => setModalExcluir(v._id)}
                    title="Excluir"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalExcluir !== null}
        onClose={() => setModalExcluir(null)}
        title="Excluir Venda"
        content="Deseja excluir esta venda?"
        onConfirm={excluirVenda}
      />
    </div>
  );
};

export default Historico;