
import React from 'react';
import { Movie, Series } from '../types';
import PosterCard from './PosterCard';

interface ContentShelfProps {
  title: string;
  items: (Movie | Series)[];
}

const ContentShelf: React.FC<ContentShelfProps> = ({ title, items }) => {
  return (
    <section className="py-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 px-4 md:px-0">{title}</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4 px-4 md:px-0 -mx-4 md:mx-0">
          {items.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-40 sm:w-48 md:w-56">
              <PosterCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentShelf;
