import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, Input } from '../shared/components';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await login(email, senha, lembrar);
      navigate('/');
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro no login');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary to-primary-dark py-12 px-4">
      <div className="w-full max-w-md mx-auto">
        <Card variant="default" padding="lg">
          <div className="flex flex-col items-center mb-8">
            <span className="text-5xl mb-2">🍉</span>
            <h2 className="text-3xl font-semibold text-neutral-900 mb-1 font-display">Bem-vindo à Fruteira</h2>
            <p className="text-gray-600 text-sm">Acesse o sistema para continuar</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              label="Email"
              placeholder="Digite seu email"
            />
            <Input
              id="senha"
              name="senha"
              type="password"
              autoComplete="current-password"
              required
              value={senha}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
              label="Senha"
              placeholder="Digite sua senha"
            />
            <div className="flex items-center mb-4">
              <input
                id="lembrar"
                type="checkbox"
                checked={lembrar}
                onChange={e => setLembrar(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="lembrar" className="text-gray-700">Lembrar de mim por 24h</label>
            </div>
            {erro && (
              <div className="my-2 p-2 rounded text-center font-medium bg-red-100 text-red-800">
                {erro}
              </div>
            )}
            <Button type="submit" disabled={carregando} fullWidth>
              {carregando ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Credenciais padrão do admin:
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Email: admin@fruteira.com | Senha: admin123
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login; 