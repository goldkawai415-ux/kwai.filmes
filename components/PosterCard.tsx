
import React from 'react';
import { Link } from 'react-router-dom';
import { Movie, Series } from '../types';

interface PosterCardProps {
  item: Movie | Series;
}

const PosterCard: React.FC<PosterCardProps> = ({ item }) => {
  return (
    <Link to={`/media/${item.type}/${item.id}`} className="block group">
      <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden relative transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-accent/30">
        <img src={item.posterUrl} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-bold text-lg line-clamp-2">{item.title}</h3>
          <p className="text-text-dark text-sm">{item.year}</p>
        </div>
        {item.tags.find(t => t.name === 'Lançamento') && (
            <div className="absolute top-2 right-2 bg-secondary-accent text-black text-xs font-bold py-1 px-2 rounded">
                LANÇAMENTO
            </div>
        )}
      </div>
    </Link>
  );
};

export default PosterCard;
