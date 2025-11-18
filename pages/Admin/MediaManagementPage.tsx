
import React, { useState, useContext } from 'react';
import { DataContext } from '../../App';
import { Movie, Series } from '../../types';

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
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  }

  const handleSave = () => {
    if (editingMedia) {
      updateMedia(formData as Movie | Series);
    } else {
      const type = formData.type as 'movie' | 'series';
      const finalData = { 
        ...formData, 
        posterUrl: `https://picsum.photos/seed/${formData.title}/400/600`,
        bannerUrl: `https://picsum.photos/seed/${formData.title}banner/1280/720`,
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      };
      addMedia(finalData as Omit<Movie, 'id'> | Omit<Series, 'id'>, type);
    }
    setIsModalOpen(false);
  };
  
  const AddMediaForm = () => (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
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
        {formData.type === 'movie' && (
           <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Duração (minutos)</label>
            <input name="duration" value={(formData as Movie).duration || ''} onChange={handleInputChange} type="number" className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
        )}
      </div>
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
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-bold">{editingMedia ? 'Editar' : 'Adicionar Nova'} Mídia</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <AddMediaForm />
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
