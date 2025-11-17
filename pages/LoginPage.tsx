import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import Logo from '../components/Logo';

const LoginPage: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authContext) {
      authContext.login();
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
            <Logo className="h-12 justify-center"/>
            <h2 className="mt-6 text-3xl font-extrabold text-white">
                Acesso ao Painel de Administrador
            </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input 
                id="email-address" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-900 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm" 
                placeholder="Email (ex: admin@kwai.com)"
                defaultValue="admin@kwai.com"
              />
            </div>
            <div>
              <label htmlFor="password"className="sr-only">Senha</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password" 
                required 
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-900 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm" 
                placeholder="Senha"
                defaultValue="belezada12"
              />
            </div>
          </div>
          <div>
            <button 
              type="submit" 
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;