// Tipos para respostas da API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Tipos para erros da API
export interface ApiError {
  status: number;
  message: string;
  details?: any;
}

// Tipos para paginação (se necessário no futuro)
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 