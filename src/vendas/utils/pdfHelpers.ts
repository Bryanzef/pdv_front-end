import { jsPDF } from 'jspdf';
import type { ItemCarrinho } from '../types';

export function gerarPdfVenda(carrinho: ItemCarrinho[], total: number) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Fruteira do Zé - Documento Não Fiscal', 20, 20);
  doc.setFontSize(12);
  doc.text(`Data: ${new Date().toLocaleString('pt-BR')}`, 20, 30);
  doc.text('---------------------------------------------', 20, 40);
  let y = 50;
  carrinho.forEach((item, index) => {
    const linha = `${index + 1}. ${item.nome} - ${item.quantidade} ${item.tipo === 'peso' ? 'kg' : 'un'} x R$ ${item.preco.toFixed(2)} = R$ ${item.subtotal.toFixed(2)}`;
    doc.text(linha, 20, y);
    if (item.justificativa) {
      doc.text(`   * Justificativa: ${item.justificativa}`, 20, y + 5);
      y += 5;
    }
    y += 10;
  });
  doc.text('---------------------------------------------', 20, y);
  doc.text(`Total: R$ ${total.toFixed(2)}`, 20, y + 10);
  doc.save('documento_nao_fiscal.pdf');
} 