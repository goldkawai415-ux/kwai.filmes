
import React, { useState, useContext } from 'react';
import { DataContext } from '../../App';
import { Movie, Series, Season, Episode } from '../../types';

const defaultMovie: Omit<Movie, 'id'> = {
  title: '', synopsis: '', year: new Date().getFullYear(), posterUrl: '', bannerUrl: '', genres: [], tags: [], cast: [], director: '', rating: 'L', type: 'movie', duration: 0, videoUrl: ''
};
const defaultSeries: Omit<Series, 'id'> = {
  title: '', synopsis: '', year: new Date().getFullYear(), posterUrl: '', bannerUrl: '', genres: [], tags: [], cast: [], director: '', rating: 'L', type: 'series', seasons: []
};

const MediaManagementPage: React.FC = () => {
  const dataContext = useContext(DataContext);
  if (!dataContext) throw new Error("DataContext not found");
  const { allMedia, addMedia, updateMedia, deleteMedia } = dataContext;

  const [activeTab, setActiveTab] = useState('movies');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState<Movie | Series | null>(null);
  const [formData, setFormData] = useState<Partial<Movie | Series>>({});

  const movies = allMedia.filter(item => item.type === 'movie') as Movie[];
  const series = allMedia.filter(item => item.type === 'series') as Series[];

  const openAddModal = () => {
    setEditingMedia(null);
    setFormData(activeTab === 'movies' ? defaultMovie : defaultSeries);
    setIsModalOpen(true);
  };
  
  const openEditModal = (item: Movie | Series) => {
    setEditingMedia(item);
    setFormData(JSON.parse(JSON.stringify(item))); // Deep copy to avoid direct mutation
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const parsedValue = e.target.type === 'number' ? parseInt(value, 10) || 0 : value;
    setFormData(prev => ({...prev, [name]: parsedValue}));
  }

  const handleSave = () => {
    if (!formData.title) return; // Basic validation
    if (editingMedia) {
      updateMedia(formData as Movie | Series);
    } else {
      const type = formData.type as 'movie' | 'series';
      addMedia(formData as Omit<Movie, 'id'> | Omit<Series, 'id'>, type);
    }
    setIsModalOpen(false);
  };

  // --- Series Management Handlers ---
  const handleSeasonChange = (seasonIndex: number, field: keyof Season, value: any) => {
    setFormData(prev => {
        const updatedSeries = { ...prev } as Series;
        const seasons = [...updatedSeries.seasons];
        seasons[seasonIndex] = { ...seasons[seasonIndex], [field]: value };
        return { ...updatedSeries, seasons };
    });
  };

  const handleEpisodeChange = (seasonIndex: number, episodeIndex: number, field: keyof Episode, value: any) => {
     setFormData(prev => {
        const updatedSeries = { ...prev } as Series;
        const seasons = JSON.parse(JSON.stringify(updatedSeries.seasons)); // Deep copy
        seasons[seasonIndex].episodes[episodeIndex] = { ...seasons[seasonIndex].episodes[episodeIndex], [field]: value };
        return { ...updatedSeries, seasons };
    });
  };

  const addSeason = () => {
     setFormData(prev => {
        const updatedSeries = { ...prev } as Series;
        const newSeason: Season = {
            id: `s${updatedSeries.id || 'new'}s${Date.now()}`,
            seasonNumber: updatedSeries.seasons.length + 1,
            episodes: []
        };
        return { ...updatedSeries, seasons: [...updatedSeries.seasons, newSeason] };
    });
  };

  const removeSeason = (seasonIndex: number) => {
      setFormData(prev => {
        const updatedSeries = { ...prev } as Series;
        const seasons = updatedSeries.seasons.filter((_, idx) => idx !== seasonIndex);
        return { ...updatedSeries, seasons };
    });
  };

  const addEpisode = (seasonIndex: number) => {
     setFormData(prev => {
        const updatedSeries = { ...prev } as Series;
        const seasons = JSON.parse(JSON.stringify(updatedSeries.seasons));
        const newEpisode: Episode = {
            id: `s${updatedSeries.id || 'new'}s${seasonIndex}e${Date.now()}`,
            title: `Novo Episódio`,
            synopsis: '',
            thumbnailUrl: `https://picsum.photos/seed/${Date.now()}/400/225`,
            videoUrl: '',
            episodeNumber: seasons[seasonIndex].episodes.length + 1
        };
        seasons[seasonIndex].episodes.push(newEpisode);
        return { ...updatedSeries, seasons };
    });
  };

  const removeEpisode = (seasonIndex: number, episodeIndex: number) => {
     setFormData(prev => {
        const updatedSeries = { ...prev } as Series;
        const seasons = JSON.parse(JSON.stringify(updatedSeries.seasons));
        seasons[seasonIndex].episodes = seasons[seasonIndex].episodes.filter((_: any, idx: number) => idx !== episodeIndex);
        return { ...updatedSeries, seasons };
    });
  };
  
  const MediaForm = () => (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
      {/* Common Fields */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Título</label>
        <input name="title" value={formData.title || ''} onChange={handleInputChange} type="text" className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Sinopse</label>
        <textarea name="synopsis" value={formData.synopsis || ''} onChange={handleInputChange} rows={3} className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Ano</label>
          <input name="year" value={formData.year || ''} onChange={handleInputChange} type="number" className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Classificação</label>
          <input name="rating" value={formData.rating || ''} onChange={handleInputChange} type="text" placeholder="L, 12, 14, 16, 18" className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">URL do Poster (vertical)</label>
        <input name="posterUrl" value={formData.posterUrl || ''} onChange={handleInputChange} type="text" placeholder="https://exemplo.com/poster.jpg" className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent" />
      </div>
       <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">URL do Banner (horizontal)</label>
        <input name="bannerUrl" value={formData.bannerUrl || ''} onChange={handleInputChange} type="text" placeholder="https://exemplo.com/banner.jpg" className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent" />
      </div>

      {/* Movie-specific Fields */}
      {formData.type === 'movie' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Duração (minutos)</label>
            <input name="duration" value={(formData as Movie).duration || ''} onChange={handleInputChange} type="number" className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">URL do Vídeo</label>
            <input name="videoUrl" value={(formData as Movie).videoUrl || ''} onChange={handleInputChange} type="text" placeholder="https://exemplo.com/filme.mp4" className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
        </>
      )}

      {/* Series-specific Fields */}
      {formData.type === 'series' && (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold border-t border-gray-700 pt-4 mt-4">Temporadas e Episódios</h3>
            {(formData as Series).seasons?.map((season, sIdx) => (
                <details key={season.id} className="bg-gray-900/50 p-3 rounded-lg">
                    <summary className="font-semibold cursor-pointer flex justify-between items-center">
                        Temporada {season.seasonNumber}
                        <button type="button" onClick={() => removeSeason(sIdx)} className="text-red-500 hover:text-red-400 text-sm font-medium">Remover Temporada</button>
                    </summary>
                    <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-700">
                        {season.episodes.map((episode, eIdx) => (
                            <div key={episode.id} className="p-3 bg-gray-800 rounded">
                                <p className="font-medium text-sm mb-2">Episódio {episode.episodeNumber}</p>
                                <div className="space-y-2">
                                     <input value={episode.title} onChange={(e) => handleEpisodeChange(sIdx, eIdx, 'title', e.target.value)} type="text" placeholder="Título do Episódio" className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
                                     <textarea value={episode.synopsis} onChange={(e) => handleEpisodeChange(sIdx, eIdx, 'synopsis', e.target.value)} rows={2} placeholder="Sinopse do Episódio" className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"></textarea>
                                     <input value={episode.videoUrl} onChange={(e) => handleEpisodeChange(sIdx, eIdx, 'videoUrl', e.target.value)} type="text" placeholder="URL do Vídeo do Episódio" className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
                                </div>
                                <div className="text-right mt-2">
                                    <button type="button" onClick={() => removeEpisode(sIdx, eIdx)} className="text-red-500 hover:text-red-400 text-xs font-medium">Remover Episódio</button>
                                </div>
                            </div>
                        ))}
                         <button type="button" onClick={() => addEpisode(sIdx)} className="mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded text-sm">Adicionar Episódio</button>
                    </div>
                </details>
            ))}
            <button type="button" onClick={addSeason} className="mt-4 bg-accent hover:bg-orange-500 text-white font-bold py-2 px-4 rounded">Adicionar Temporada</button>
        </div>
      )}
    </form>
  );

  const renderTable = (data: (Movie | Series)[]) => (
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                <tr>
                    <th scope="col" className="px-6 py-3">Título</th>
                    <th scope="col" className="px-6 py-3">Ano</th>
                    <th scope="col" className="px-6 py-3">Gêneros</th>
                    <th scope="col" className="px-6 py-3">Ações</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{item.title}</th>
                        <td className="px-6 py-4">{item.year}</td>
                        <td className="px-6 py-4">{item.genres.map(g => g.name).join(', ')}</td>
                        <td className="px-6 py-4 space-x-2">
                            <button onClick={() => openEditModal(item)} className="font-medium text-blue-500 hover:underline">Editar</button>
                            <button onClick={() => deleteMedia(item.id)} className="font-medium text-red-500 hover:underline">Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Gerenciamento de Mídia</h1>
        <button onClick={openAddModal} className="bg-accent hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition-colors">
          Adicionar Novo
        </button>
      </div>
      
      <div className="mb-4 border-b border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button onClick={() => setActiveTab('movies')} className={`${activeTab === 'movies' ? 'border-accent text-accent' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            Filmes ({movies.length})
          </button>
          <button onClick={() => setActiveTab('series')} className={`${activeTab === 'series' ? 'border-accent text-accent' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            Séries ({series.length})
          </button>
        </nav>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        {activeTab === 'movies' ? renderTable(movies) : renderTable(series)}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-bold">{editingMedia ? 'Editar' : 'Adicionar Nova'} Mídia</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <MediaForm />
            </div>
            <div className="p-4 bg-gray-900/50 border-t border-gray-700 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors">
                Cancelar
              </button>
              <button onClick={handleSave} className="bg-accent hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition-colors">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaManagementPage;
