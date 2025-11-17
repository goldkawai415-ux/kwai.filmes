
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Movie, Series } from '../types';

interface HeroCarouselProps {
  items: (Movie | Series)[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ items }) => {
  useEffect(() => {
    new (window as any).Swiper('.hero-swiper', {
      loop: true,
      effect: 'fade',
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }, [items]);

  return (
    <div className="hero-swiper swiper-container h-[60vh] md:h-[85vh] w-full relative">
      <div className="swiper-wrapper">
        {items.map((item) => (
          <div key={item.id} className="swiper-slide">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${item.bannerUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/30 to-transparent"></div>
              <div className="container mx-auto h-full flex flex-col justify-center items-start text-left p-4 md:p-8 relative">
                <div className="max-w-xl text-white">
                  <h1 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-lg">{item.title}</h1>
                  <p className="text-md md:text-lg text-text-dark mb-6 line-clamp-3 drop-shadow-lg">{item.synopsis}</p>
                  <Link
                    to={`/media/${item.type}/${item.id}`}
                    className="bg-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-500 transition-transform duration-300 ease-in-out transform hover:scale-105 inline-block"
                  >
                    ▶ Assistir Agora
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>
      <div className="swiper-button-prev text-white"></div>
      <div className="swiper-button-next text-white"></div>
    </div>
  );
};

export default HeroCarousel;
