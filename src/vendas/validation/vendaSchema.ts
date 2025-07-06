import { z } from 'zod';

export const ItemSchema = z.object({
  nome: z.string().min(1),
  quantidade: z.number().positive(),
  preco: z.number().positive(),
  precoOriginal: z.number().positive().optional(),
  tipo: z.string().min(1),
  justificativa: z.string().optional(),
  subtotal: z.number().positive(),
});

export const VendaSchema = z.object({
  _id: z.string().optional(),
  data: z.string().optional(),
  itens: z.array(ItemSchema),
  total: z.number().positive(),
});

export type ItemInput = z.infer<typeof ItemSchema>;
export type VendaInput = z.infer<typeof VendaSchema>; 