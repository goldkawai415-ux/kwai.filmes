import React, { useState } from 'react';
import { useMockData } from '../../hooks/useMockData';
import { Movie, Series } from '../../types';

const MediaManagementPage: React.FC = () => {
  const { allMedia } = useMockData();
  const [activeTab, setActiveTab] = useState('movies');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMediaType, setNewMediaType] = useState<'movie' | 'series'>('movie');

  const movies = allMedia.filter(item => item.type === 'movie') as Movie[];
  const series = allMedia.filter(item => item.type === 'series') as Series[];

  const AddMediaForm = () => (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Título</label>
        <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Sinopse</label>
        <textarea rows={3} className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Ano</label>
          <input type="number" defaultValue={new Date().getFullYear()} className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent" />
        </div>
        {newMediaType === 'movie' && (
           <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Duração (minutos)</label>
            <input type="number" className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
        )}
      </div>
       <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Upload de Pôster</label>
        <input type="file" accept="image/*" className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-orange-500 cursor-pointer"/>
      </div>
       <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Upload de Banner</label>
        <input type="file" accept="image/*" className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-orange-500 cursor-pointer"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {newMediaType === 'movie' ? 'Upload do Filme (.mp4)' : 'Upload do Episódio 1 (.mp4)'}
        </label>
        <input type="file" accept="video/mp4" className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-orange-500 cursor-pointer"/>
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
                            <button className="font-medium text-blue-500 hover:underline">Editar</button>
                            <button className="font-medium text-red-500 hover:underline">Excluir</button>
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
        <button onClick={() => setIsModalOpen(true)} className="bg-accent hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition-colors">
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
                <h2 className="text-xl font-bold">Adicionar Nova Mídia</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="px-6 py-2 border-b border-gray-700">
                 <nav className="flex space-x-2" aria-label="Tabs">
                    <button onClick={() => setNewMediaType('movie')} className={`${newMediaType === 'movie' ? 'bg-accent text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'} px-3 py-2 font-medium text-sm rounded-md transition-colors`}>
                        Filme
                    </button>
                    <button onClick={() => setNewMediaType('series')} className={`${newMediaType === 'series' ? 'bg-accent text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'} px-3 py-2 font-medium text-sm rounded-md transition-colors`}>
                        Série
                    </button>
                </nav>
            </div>
            <div className="p-6 overflow-y-auto">
              <AddMediaForm />
            </div>
            <div className="p-4 bg-gray-900/50 border-t border-gray-700 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors">
                Cancelar
              </button>
              <button onClick={() => setIsModalOpen(false)} className="bg-accent hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition-colors">
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
