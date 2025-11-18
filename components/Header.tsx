import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Header: React.FC = () => {
  const navItems = [
    { name: 'Filmes', path: '/catalog?type=movie' },
    { name: 'Séries', path: '/catalog?type=series' },
    { name: 'TV ao Vivo', path: '/live-tv' },
    { name: 'Gêneros', path: '/catalog' },
    { name: 'Lançamentos', path: '/catalog?tag=lançamento' },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4 md:p-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path} className="text-text-dark hover:text-text-light transition-colors duration-300 font-semibold">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Buscar títulos..."
              className="bg-primary/50 border border-gray-700 rounded-full py-2 px-4 pl-10 text-text-light focus:outline-none focus:ring-2 focus:ring-accent transition-all w-40 md:w-64"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;