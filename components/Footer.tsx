
import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/50 border-t border-gray-800 mt-16 py-8">
      <div className="container mx-auto text-center text-text-dark">
        <Logo className="h-8 justify-center mb-4" />
        <p>&copy; {new Date().getFullYear()} Kwai-filmesonline. Todos os direitos reservados.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-text-light transition-colors">Termos de Serviço</a>
          <a href="#" className="hover:text-text-light transition-colors">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
