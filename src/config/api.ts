import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Configuração da URL base da API
// Em desenvolvimento usa o proxy do Vite, em produção usa a URL completa
const API_BASE_URL = import.meta.env.DEV ? '/api' : 'http://localhost:5000/api';

// Criando instância do Axios com configurações padrão
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requisições
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Requisição: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para respostas
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ Resposta: ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    console.error('❌ Erro na resposta:', {
      status: error.response?.status,
      message: error.response?.data,
      url: error.config?.url,
    });

    // Tratamento específico de erros
    if (error.response?.status === 404) {
      console.error('🔍 Recurso não encontrado');
    } else if (error.response?.status === 500) {
      console.error('💥 Erro interno do servidor');
    } else if (!error.response) {
      console.error('🌐 Erro de conexão - verifique se o servidor está rodando');
    }

    return Promise.reject(error);
  }
);

export default api; 