import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import type { Usuario } from '../config/types';
import { api } from '../config';

interface AuthState {
  usuario: Usuario | null;
  token: string | null;
  carregando: boolean;
  autenticado: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, senha: string, lembrar?: boolean) => Promise<void>;
  logout: () => void;
  registrar: (nome: string, email: string, senha: string, role?: 'admin' | 'usuario') => Promise<void>;
  alterarSenha: (senhaAtual: string, novaSenha: string) => Promise<void>;
  verificarToken: () => Promise<void>;
}

// Estado inicial
const initialState: AuthState = {
  usuario: null,
  token: localStorage.getItem('token'),
  carregando: true,
  autenticado: false
};

// Actions
type AuthAction =
  | { type: 'LOGIN_INICIADO' }
  | { type: 'LOGIN_SUCESSO'; payload: { usuario: Usuario; token: string } }
  | { type: 'LOGIN_ERRO' }
  | { type: 'LOGOUT' }
  | { type: 'TOKEN_VERIFICADO'; payload: { usuario: Usuario; token: string } }
  | { type: 'TOKEN_INVALIDO' }
  | { type: 'ALTERAR_SENHA_SUCESSO' };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_INICIADO':
      return { ...state, carregando: true };
    
    case 'LOGIN_SUCESSO':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        usuario: action.payload.usuario,
        token: action.payload.token,
        autenticado: true,
        carregando: false
      };
    
    case 'LOGIN_ERRO':
      return { ...state, carregando: false };
    
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        usuario: null,
        token: null,
        autenticado: false,
        carregando: false
      };
    
    case 'TOKEN_VERIFICADO':
      return {
        ...state,
        usuario: action.payload.usuario,
        token: action.payload.token,
        autenticado: true,
        carregando: false
      };
    
    case 'TOKEN_INVALIDO':
      localStorage.removeItem('token');
      return {
        ...state,
        usuario: null,
        token: null,
        autenticado: false,
        carregando: false
      };
    
    case 'ALTERAR_SENHA_SUCESSO':
      return { ...state };
    
    default:
      return state;
  }
};

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Função para fazer requisições autenticadas
  const apiRequest = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token');
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(url, config);
    
    if (response.status === 401) {
      dispatch({ type: 'TOKEN_INVALIDO' });
      throw new Error('Token inválido');
    }
    
    return response;
  };

  // Login
  const login = async (email: string, senha: string, lembrar = false) => {
    try {
      dispatch({ type: 'LOGIN_INICIADO' });

      const response = await api.post('/auth/login', { email, senha });
      const data = response.data;

      dispatch({
        type: 'LOGIN_SUCESSO',
        payload: {
          usuario: data.dados.usuario,
          token: data.dados.token
        }
      });
      if (lembrar) {
        localStorage.setItem('token', data.dados.token);
        localStorage.setItem('token_expira', (Date.now() + 24 * 60 * 60 * 1000).toString());
      } else {
        localStorage.setItem('token', data.dados.token);
        localStorage.removeItem('token_expira');
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_ERRO' });
      throw error;
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Registrar (apenas admin)
  const registrar = async (nome: string, email: string, senha: string, role: 'admin' | 'usuario' = 'usuario') : Promise<void> => {
    try {
      const response = await api.post('/auth/registro', { nome, email, senha, role });
      const data = response.data;

      // Se o registro for bem-sucedido, fazer login automaticamente
      dispatch({
        type: 'LOGIN_SUCESSO',
        payload: {
          usuario: data.dados.usuario,
          token: data.dados.token
        }
      });
    } catch (error) {
      throw error;
    }
  };

  // Alterar senha
  const alterarSenha = async (senhaAtual: string, novaSenha: string) => {
    try {
      const response = await api.post('/auth/alterar-senha', { senhaAtual, novaSenha });
      const data = response.data;

      dispatch({ type: 'ALTERAR_SENHA_SUCESSO' });
    } catch (error) {
      throw error;
    }
  };

  // Verificar token
  const verificarToken = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      dispatch({ type: 'TOKEN_INVALIDO' });
      return;
    }

    try {
      const response = await api.get('/auth/me');
      const data = response.data;
      
      dispatch({
        type: 'TOKEN_VERIFICADO',
        payload: {
          usuario: data.dados.usuario,
          token
        }
      });
    } catch (error) {
      dispatch({ type: 'TOKEN_INVALIDO' });
    }
  };

  // Verificar token na inicialização
  useEffect(() => {
    verificarToken();
  }, []);

  // No carregamento do app, verificar se o token está válido
  useEffect(() => {
    const token = localStorage.getItem('token');
    const expira = localStorage.getItem('token_expira');
    if (token && expira) {
      if (Date.now() > Number(expira)) {
        localStorage.removeItem('token');
        localStorage.removeItem('token_expira');
        dispatch({ type: 'LOGOUT' });
      } else if (state.usuario) {
        // Token ainda válido, manter usuário autenticado
        dispatch({ type: 'TOKEN_VERIFICADO', payload: { usuario: state.usuario, token } });
      }
    }
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    registrar,
    alterarSenha,
    verificarToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}; 