
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMockData } from '../hooks/useMockData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoPlayer from '../components/VideoPlayer';
import { Series } from '../types';

const DetailPage: React.FC = () => {
  const { type, id } = useParams<{ type: 'movie' | 'series', id: string }>();
  const { getMediaById } = useMockData();
  const [showPlayer, setShowPlayer] = useState(false);
  
  const item = getMediaById(type as 'movie' | 'series', id || '');

  const [selectedSeason, setSelectedSeason] = useState(0);
  const [selectedEpisodeVideoUrl, setSelectedEpisodeVideoUrl] = useState<string | null>(null);

  if (!item) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Conteúdo não encontrado.</p>
      </div>
    );
  }

  const handleWatchNow = () => {
    if (item.type === 'movie') {
      setShowPlayer(true);
    } else if (item.type === 'series' && item.seasons[0]?.episodes[0]) {
      setSelectedEpisodeVideoUrl(item.seasons[0].episodes[0].videoUrl);
      setShowPlayer(true);
    }
  };

  const handleSelectEpisode = (videoUrl: string) => {
    setSelectedEpisodeVideoUrl(videoUrl);
    setShowPlayer(true);
    window.scrollTo(0, 0);
  }

  const videoUrlToPlay = item.type === 'movie' ? item.videoUrl : selectedEpisodeVideoUrl;

  return (
    <div className="bg-primary min-h-screen">
      <Header />
      <main>
        <div className="relative h-[50vh] md:h-[70vh]">
          <img src={item.bannerUrl} alt={item.title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 -mt-48 relative pb-16">
          {showPlayer && videoUrlToPlay && (
            <div className='mb-8'>
              <VideoPlayer videoUrl={videoUrlToPlay} title={item.title} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <img src={item.posterUrl} alt={item.title} className="rounded-lg shadow-2xl w-full" />
            </div>
            <div className="md:col-span-2 text-white">
              <div className="flex items-center gap-4 mb-2">
                {item.tags.map(tag => (
                  <span key={tag.id} className="bg-secondary-accent text-black text-xs font-bold py-1 px-2 rounded">{tag.name}</span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-2">{item.title}</h1>
              <div className="flex items-center space-x-4 text-text-dark mb-4">
                <span>{item.year}</span>
                <span>•</span>
                <span>{item.rating}</span>
                <span>•</span>
                {item.type === 'movie' && <span>{item.duration} min</span>}
                {item.type === 'series' && <span>{item.seasons.length} Temporadas</span>}
              </div>
              <button onClick={handleWatchNow} className="bg-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-500 transition-transform duration-300 ease-in-out transform hover:scale-105 inline-block mb-6">
                ▶ Assistir Agora
              </button>
              <p className="text-text-dark mb-6">{item.synopsis}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.genres.map(genre => (
                  <span key={genre.id} className="border border-gray-700 rounded-full px-3 py-1 text-sm">{genre.name}</span>
                ))}
              </div>
              <p><span className="font-bold">Elenco:</span> {item.cast.join(', ')}</p>
              <p><span className="font-bold">Diretor:</span> {item.director}</p>
            </div>
          </div>
          
          {item.type === 'series' && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-4">Temporadas e Episódios</h2>
              <div className="flex space-x-4 border-b border-gray-700 mb-4">
                {(item as Series).seasons.map((season, index) => (
                  <button 
                    key={season.id} 
                    onClick={() => setSelectedSeason(index)}
                    className={`py-2 px-4 font-semibold transition-colors ${selectedSeason === index ? 'text-accent border-b-2 border-accent' : 'text-text-dark hover:text-white'}`}
                  >
                    Temporada {season.seasonNumber}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {(item as Series).seasons[selectedSeason].episodes.map(episode => (
                  <div key={episode.id} onClick={() => handleSelectEpisode(episode.videoUrl)} className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer group">
                    <div className="relative">
                      <img src={episode.thumbnailUrl} alt={episode.title} className="w-full aspect-video object-cover"/>
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-white truncate">Ep. {episode.episodeNumber} - {episode.title}</h4>
                      <p className="text-text-dark text-sm line-clamp-2">{episode.synopsis}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DetailPage;
