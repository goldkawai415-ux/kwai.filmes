
import React, { useState } from 'react';
import { useMockData } from '../../hooks/useMockData';
import { Genre, Tag } from '../../types';

const TaxonomyItem: React.FC<{item: Genre | Tag}> = ({item}) => (
    <li className="flex justify-between items-center p-3 bg-gray-700 rounded">
        <span>{item.name}</span>
        <div className="space-x-2">
            <button className="font-medium text-sm text-blue-500 hover:underline">Editar</button>
            <button className="font-medium text-sm text-red-500 hover:underline">Excluir</button>
        </div>
    </li>
)

const TaxonomyPage: React.FC = () => {
    const { genres, tags, channels } = useMockData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const AddChannelForm = () => (
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Nome do Canal</label>
          <input type="text" placeholder="Ex: Canal de Notícias 24h" className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">URL do Logo</label>
          <input type="text" placeholder="https://exemplo.com/logo.png" className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">URL do Vídeo (Stream)</label>
          <input type="text" placeholder="https://exemplo.com/stream.m3u8" className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent" />
        </div>
      </form>
    );


    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">Taxonomia e Canais</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Genres */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-white mb-4">Gêneros</h2>
                    <div className="flex gap-2 mb-4">
                        <input type="text" placeholder="Novo gênero..." className="flex-grow bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent" />
                        <button className="bg-accent hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition-colors">Adicionar</button>
                    </div>
                    <ul className="space-y-2">
                        {genres.map(genre => <TaxonomyItem key={genre.id} item={genre} />)}
                    </ul>
                </div>

                {/* Tags */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-white mb-4">Tags</h2>
                     <div className="flex gap-2 mb-4">
                        <input type="text" placeholder="Nova tag..." className="flex-grow bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent" />
                        <button className="bg-accent hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition-colors">Adicionar</button>
                    </div>
                    <ul className="space-y-2">
                        {tags.map(tag => <TaxonomyItem key={tag.id} item={tag} />)}
                    </ul>
                </div>
            </div>

            {/* Live TV Channels */}
            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">Canais de TV ao Vivo</h2>
                    <button onClick={() => setIsModalOpen(true)} className="bg-accent hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition-colors">
                        Adicionar Canal
                    </button>
                </div>
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-400">
                            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Logo</th>
                                    <th scope="col" className="px-6 py-3">Nome</th>
                                    <th scope="col" className="px-6 py-3">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {channels.map(channel => (
                                    <tr key={channel.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600">
                                        <td className="px-6 py-4">
                                            <img src={channel.logoUrl} alt={channel.name} className="w-12 h-12 rounded-full object-cover bg-gray-600"/>
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{channel.name}</th>
                                        <td className="px-6 py-4 space-x-2">
                                            <button className="font-medium text-blue-500 hover:underline">Editar</button>
                                            <button className="font-medium text-red-500 hover:underline">Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
                <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                        <h2 className="text-xl font-bold">Adicionar Novo Canal</h2>
                        <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <div className="p-6 overflow-y-auto">
                    <AddChannelForm />
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

export default TaxonomyPage;