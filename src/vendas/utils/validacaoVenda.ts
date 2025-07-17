// Centraliza a validação de pagamento para vendas
export function validarPagamentoVenda({ formaPagamento, valorPagoInput, total, parcelas, setFeedback }: {
  formaPagamento: string;
  valorPagoInput: string;
  total: number;
  parcelas: number;
  setFeedback: (msg: string) => void;
}) {
  const valorPagoNum = parseFloat(valorPagoInput.replace(',', '.'));
  const margemErro = 0.01;
  if (isNaN(valorPagoNum)) {
    setFeedback('Informe o valor pago.');
    return false;
  }
  if (formaPagamento === 'dinheiro') {
    if (valorPagoNum + margemErro < total) {
      setFeedback('Valor pago não pode ser menor que o total da venda.');
      return false;
    }
  } else if (['debito', 'credito', 'pix'].includes(formaPagamento)) {
    if (Math.abs(valorPagoNum - total) > margemErro) {
      setFeedback('O valor pago deve ser exatamente igual ao total da venda.');
      return false;
    }
  }
  if (formaPagamento === 'credito') {
    if (parcelas < 1 || parcelas > 12) {
      setFeedback('Número de parcelas inválido.');
      return false;
    }
    if (total / parcelas < 5) {
      setFeedback('Valor mínimo por parcela: R$ 5,00.');
      return false;
    }
  }
  return true;
} 