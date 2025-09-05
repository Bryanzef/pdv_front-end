import api from '../../config/api';

export async function getProdutos() {
  const response = await api.get('/produtos', { params: { limit: 9999 } });
  return response.data.dados.produtos;
}

export async function postVenda(data: {
  itens: Array<{ nome: string; preco: number; quantidade: number; productId: string }>;
  total: string;
  pagamento: any;
}) {
  const response = await api.post('/vendas', data);
  return response.data;
}

export async function getVendaPorId(id: string) {
  const response = await api.get(`/vendas/${id}`);
  return response.data;
} 