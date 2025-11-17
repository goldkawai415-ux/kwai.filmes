
import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PosterCard from '../components/PosterCard';
import { useMockData } from '../hooks/useMockData';
import { Genre } from '../types';

const CatalogPage: React.FC = () => {
  const { allMedia, genres } = useMockData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [sortOrder, setSortOrder] = useState('recent');

  const filteredAndSortedMedia = useMemo(() => {
    let result = [...allMedia];

    if (searchTerm) {
      result = result.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (selectedGenre) {
      result = result.filter(item => item.genres.some(g => g.id === selectedGenre.id));
    }

    if (sortOrder === 'recent') {
      result.sort((a, b) => b.year - a.year);
    } else if (sortOrder === 'alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [allMedia, searchTerm, selectedGenre, sortOrder]);

  return (
    <div className="bg-primary min-h-screen">
      <Header />
      <main className="pt-24">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl font-black mb-8">Catálogo de Conteúdo</h1>
          
          <div className="bg-gray-800/50 p-4 rounded-lg mb-8 flex flex-wrap items-center gap-4">
            <input 
              type="text"
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-primary border border-gray-700 rounded-full py-2 px-4 text-text-light focus:outline-none focus:ring-2 focus:ring-accent flex-grow"
            />
            <select
              value={selectedGenre?.id || ''}
              onChange={(e) => setSelectedGenre(genres.find(g => g.id === e.target.value) || null)}
              className="bg-primary border border-gray-700 rounded-full py-2 px-4 text-text-light focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Todos os Gêneros</option>
              {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-primary border border-gray-700 rounded-full py-2 px-4 text-text-light focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="recent">Mais Recentes</option>
              <option value="alphabetical">Ordem Alfabética</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredAndSortedMedia.map(item => (
              <PosterCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;
