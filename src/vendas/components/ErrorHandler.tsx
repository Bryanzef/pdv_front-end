import React from 'react';
import { ApiFeedback } from '../../shared/components';

// Mapeamento de mensagens de erro para soluções
const ERROR_SOLUTIONS: Record<string, { message: string; solution: string; type: 'error' | 'warning' | 'info' }> = {
  // Erros de seleção de produto
  'Selecione um produto': {
    message: 'Selecione um produto',
    solution: 'Escolha um produto na lista suspensa antes de adicionar ao carrinho',
    type: 'info'
  },
  'Peso/quantidade deve ser um número positivo': {
    message: 'Quantidade inválida',
    solution: 'Digite um valor positivo para o peso ou quantidade',
    type: 'warning'
  },
  
  // Erros de edição de item
  'O preço deve ser um número positivo': {
    message: 'Preço inválido',
    solution: 'Digite um valor positivo para o preço',
    type: 'warning'
  },
  'Justificativa é obrigatória para alteração de preço': {
    message: 'Justificativa necessária',
    solution: 'Informe o motivo da alteração do preço original',
    type: 'warning'
  },
  
  // Erros de pagamento
  'Informe o valor pago': {
    message: 'Valor pago não informado',
    solution: 'Digite o valor recebido do cliente antes de finalizar a venda',
    type: 'warning'
  },
  'Valor pago não pode ser menor que o total da venda': {
    message: 'Valor insuficiente',
    solution: 'O valor pago pelo cliente é menor que o total da compra',
    type: 'error'
  },
  'O valor pago deve ser exatamente igual ao total da venda': {
    message: 'Valor incorreto',
    solution: 'Para cartão/PIX, o valor deve ser exatamente igual ao total',
    type: 'warning'
  },
  'Número de parcelas inválido': {
    message: 'Parcelas inválidas',
    solution: 'Escolha entre 1 e 12 parcelas para pagamento em crédito',
    type: 'warning'
  },
  'Valor mínimo por parcela: R$ 5,00': {
    message: 'Parcela muito pequena',
    solution: 'Diminua o número de parcelas (mínimo R$ 5,00 por parcela)',
    type: 'warning'
  },
  
  // Erros gerais
  'O carrinho está vazio': {
    message: 'Carrinho vazio',
    solution: 'Adicione pelo menos um produto antes de finalizar a venda',
    type: 'info'
  },
  'Erro ao carregar produtos': {
    message: 'Falha ao carregar produtos',
    solution: 'Verifique sua conexão com a internet e tente novamente',
    type: 'error'
  }
};

interface ErrorHandlerProps {
  feedback: string;
  clearFeedback: () => void;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ feedback, clearFeedback }) => {
  if (!feedback) return null;

  // Verifica se é uma mensagem de sucesso
  const isSuccess = feedback.includes('sucesso');
  
  // Encontra a mensagem mapeada ou usa o feedback original
  const errorKey = Object.keys(ERROR_SOLUTIONS).find(key => feedback.includes(key));
  const errorData = errorKey 
    ? ERROR_SOLUTIONS[errorKey] 
    : { 
        message: feedback, 
        solution: isSuccess ? undefined : 'Tente novamente ou contate o suporte técnico',
        type: isSuccess ? 'success' as const : 'error' as const
      };

  return (
    <ApiFeedback
      message={errorData.message}
      solution={errorData.solution}
      type={errorData.type}
      position="bottom"
      duration={isSuccess ? 3000 : 0} // Mensagens de sucesso somem automaticamente
      onClose={clearFeedback}
      showIcon={true}
      showCloseButton={true}
      fullWidth={false}
    />
  );
};

export default ErrorHandler; 