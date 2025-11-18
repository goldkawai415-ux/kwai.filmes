
import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroCarousel from '../components/HeroCarousel';
import ContentShelf from '../components/ContentShelf';
import { DataContext } from '../App';

const HomePage: React.FC = () => {
  const dataContext = useContext(DataContext);
  if (!dataContext) throw new Error("DataContext is not available");
  
  const { homeShelves, getFeaturedItems } = dataContext;
  const featuredItems = getFeaturedItems();

  return (
    <div className="bg-primary min-h-screen">
      <Header />
      <main>
        <HeroCarousel items={featuredItems} />
        <div className="mt-[-5rem] relative z-10">
            {homeShelves.map((shelf) => (
                <ContentShelf key={shelf.id} title={shelf.title} items={shelf.items} />
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
