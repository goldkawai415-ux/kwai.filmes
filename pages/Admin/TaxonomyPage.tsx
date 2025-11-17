
import React from 'react';
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
    const { genres, tags } = useMockData();

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">Gerenciamento de Taxonomia</h1>

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
        </div>
    );
};

export default TaxonomyPage;
