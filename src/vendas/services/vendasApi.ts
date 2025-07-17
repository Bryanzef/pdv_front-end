import api from '../../config/api';

export async function getProdutos() {
  const response = await api.get('/produtos');
  return response.data.dados.produtos;
}

export async function postVenda(data: {
  itens: Array<{ nome: string; preco: string; quantidade: number; productId: string }>;
  total: string;
  pagamento: any;
}) {
  const response = await api.post('/vendas', data);
  return response.data;
} 