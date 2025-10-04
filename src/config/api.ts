import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

// Configuração da URL base da API
// Em desenvolvimento usa o proxy do Vite, em produção usa a variável de ambiente
const API_BASE_URL = import.meta.env.DEV 
  ? '/api' 
  : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;

// Debug: verificar se a variável está sendo carregada
console.log('🔧 Debug API:', {
  isDev: import.meta.env.DEV,
  viteApiUrl: import.meta.env.VITE_API_URL,
  finalUrl: API_BASE_URL
});

// Criando instância do Axios com configurações padrão
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Remover interceptor de autenticação

// Interceptor para requisições
api.interceptors.request.use(
  (config) => {
    // Adicionar token de autenticação se disponível
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

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
    if (error.response?.status === 401) {
      console.error('🔐 Token inválido ou expirado');
      // Remover token inválido
      localStorage.removeItem('token');
      // Redirecionar para login se estiver em uma página protegida
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    } else if (error.response?.status === 403) {
      console.error('🚫 Acesso negado');
    } else if (error.response?.status === 404) {
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