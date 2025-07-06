import axios from 'axios';
import type { Venda } from '../../vendas/types';

export async function getVendas(): Promise<Venda[]> {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/vendas`);
  return res.data;
}

export async function deleteVenda(id: string) {
  return axios.delete(`${import.meta.env.VITE_API_URL}/vendas/${id}`);
} 