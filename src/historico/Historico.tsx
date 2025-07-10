import React, { useEffect, useState } from 'react';
import api from '../config/api';
import Drawer from '../shared/Drawer';
import Modal from '../shared/Modal';
import { gerarPdfVenda } from '../vendas/utils/pdfHelpers';
import TabelaHistorico from './components/TabelaHistorico';
import { useHistorico } from './hooks/useHistorico';

const Historico: React.FC = () => {
  const {
    vendas,
    page,
    setPage,
    total,
    totalPages,
    usuarioId,
    setUsuarioId,
    dataInicio,
    setDataInicio,
    dataFim,
    setDataFim,
    modalExcluir,
    setModalExcluir,
    feedback,
    excluirVenda,
    modalDetalhe,
    setModalDetalhe,
    vendaDetalhe,
    carregarVendaDetalhe,
    carregandoDetalhe
  } = useHistorico();

  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const res = await api.get('/auth/usuarios', { params: { page: 1, limit: 1000 } });
        setUsuarios(res.data.data);
      } catch {}
    }
    fetchUsuarios();
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [vendaSelecionada, setVendaSelecionada] = useState<string | null>(null);

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-green-900 flex items-center gap-2">
        <span>📈</span> Histórico de Vendas
      </h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="border p-2 rounded min-w-[200px]"
          value={usuarioId}
          onChange={e => setUsuarioId(e.target.value)}
        >
          <option value="">Todos os usuários</option>
          {usuarios.map((u: any) => (
            <option key={u._id} value={u._id}>{u.nome}</option>
          ))}
        </select>
        <input
          type="date"
          className="border p-2 rounded"
          value={dataInicio}
          onChange={e => setDataInicio(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={dataFim}
          onChange={e => setDataFim(e.target.value)}
        />
      </div>
      {feedback && (
        <div className={`my-2 p-2 rounded text-center font-medium ${feedback.includes('sucesso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {feedback}
        </div>
      )}
      <TabelaHistorico
        vendas={vendas}
        setModalExcluir={setModalExcluir}
        page={page}
        setPage={setPage}
        total={total}
        totalPages={totalPages}
        onVisualizar={async (id) => {
          setVendaSelecionada(id);
          setDrawerOpen(true);
          setModalDetalhe(id);
          await carregarVendaDetalhe(id);
        }}
      />
      <Drawer
        isOpen={drawerOpen}
        onClose={() => { setDrawerOpen(false); setVendaSelecionada(null); }}
        title="Detalhes da Venda"
      >
        {carregandoDetalhe ? (
          <div className="p-4 text-center">Carregando detalhes...</div>
        ) : vendaDetalhe ? (
          <div>
            <div className="mb-2 text-sm text-gray-700 dark:text-gray-200">
              <b>Data:</b> {new Date(vendaDetalhe.data).toLocaleString('pt-BR')}<br />
              {vendaDetalhe.usuario && (
                <><b>Usuário:</b> {vendaDetalhe.usuario.nome} ({vendaDetalhe.usuario.email})<br /></>
              )}
              <b>Total:</b> R$ {vendaDetalhe.total.toFixed(2)}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm mt-2">
                <thead>
                  <tr className="bg-green-100 dark:bg-gray-800 text-green-900 dark:text-green-200">
                    <th className="border p-2">Produto</th>
                    <th className="border p-2">Tipo</th>
                    <th className="border p-2">Qtd</th>
                    <th className="border p-2">Preço</th>
                    <th className="border p-2">Subtotal</th>
                    <th className="border p-2">Justificativa</th>
                  </tr>
                </thead>
                <tbody>
                  {vendaDetalhe.itens.map((item, idx) => (
                    <tr key={idx} className="dark:bg-gray-900">
                      <td className="border p-2">{item.nome}</td>
                      <td className="border p-2">{item.tipo}</td>
                      <td className="border p-2">{item.quantidade}</td>
                      <td className="border p-2">R$ {item.preco.toFixed(2)}</td>
                      <td className="border p-2">R$ {item.subtotal.toFixed(2)}</td>
                      <td className="border p-2">{item.justificativa || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button
                className="bg-gray-700 dark:bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-800 dark:hover:bg-gray-700"
                onClick={() => {
                  // TODO: integração futura com impressora não fiscal
                  gerarPdfVenda(vendaDetalhe.itens, vendaDetalhe.total);
                }}
              >
                <i className="fas fa-print mr-2"></i>Reimprimir
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center text-red-700 dark:text-red-300">Não foi possível carregar os detalhes da venda.</div>
        )}
      </Drawer>
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