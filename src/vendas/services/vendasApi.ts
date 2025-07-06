import axios from 'axios';
import type { Produto, ItemCarrinho } from '../types';

export async function getProdutos(): Promise<Produto[]> {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/produtos`);
  return res.data;
}

export async function postVenda(data: { itens: ItemCarrinho[]; total: number }) {
  return axios.post(`${import.meta.env.VITE_API_URL}/vendas`, data);
} 