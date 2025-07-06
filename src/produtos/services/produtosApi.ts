import axios from 'axios';
import type { Produto } from '../types';

export async function getProdutos(): Promise<Produto[]> {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/produtos`);
  return res.data;
}

export async function postProduto(data: { nome: string; preco: number; tipo: 'peso' | 'fixo' }) {
  return axios.post(`${import.meta.env.VITE_API_URL}/produtos`, data);
}

export async function putProduto(id: string, data: { nome: string; preco: number; tipo: 'peso' | 'fixo' }) {
  return axios.put(`${import.meta.env.VITE_API_URL}/produtos/${id}`, data);
}

export async function deleteProduto(id: string) {
  return axios.delete(`${import.meta.env.VITE_API_URL}/produtos/${id}`);
} 