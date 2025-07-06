import { z } from 'zod';

export const ProdutoSchema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  preco: z.number().positive('Preço deve ser positivo'),
  tipo: z.enum(['peso', 'fixo']),
  imagem: z.string().optional(),
});

export type ProdutoInput = z.infer<typeof ProdutoSchema>; 