
import React, { useState } from 'react';
import { useMockData } from '../../hooks/useMockData';

const AppearancePage: React.FC = () => {
  const { homeShelves } = useMockData();
  const [accentColor, setAccentColor] = useState('#FF6B00');
  const [secondaryAccentColor, setSecondaryAccentColor] = useState('#FFC107');

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Gerenciamento da Aparência</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Logo and Colors */}
        <div className="bg-gray-800 p-6 rounded-lg space-y-6">
          <h2 className="text-xl font-semibold text-white">Identidade Visual</h2>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Logo do Site</label>
            <input type="file" className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-orange-500"/>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="accent-color" className="block text-sm font-medium text-gray-300 mb-2">Cor de Destaque (Ação)</label>
              <div className="flex items-center gap-2">
                <input id="accent-color" type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="p-1 h-10 w-14 block bg-gray-700 border-gray-600 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"/>
                <input type="text" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent"/>
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="secondary-accent-color" className="block text-sm font-medium text-gray-300 mb-2">Cor Secundária</label>
               <div className="flex items-center gap-2">
                <input id="secondary-accent-color" type="color" value={secondaryAccentColor} onChange={e => setSecondaryAccentColor(e.target.value)} className="p-1 h-10 w-14 block bg-gray-700 border-gray-600 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"/>
                <input type="text" value={secondaryAccentColor} onChange={e => setSecondaryAccentColor(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent"/>
              </div>
            </div>
          </div>
        </div>

        {/* Home Page Manager */}
        <div className="bg-gray-800 p-6 rounded-lg space-y-6">
          <h2 className="text-xl font-semibold text-white">Gerenciador da Página Inicial</h2>
          <div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">Carrossel de Destaques</h3>
            <p className="text-sm text-gray-400 mb-2">Selecione 5-10 títulos para o carrossel principal.</p>
            {/* A real implementation would have a searchable multi-select component here */}
            <select multiple className="w-full h-32 bg-gray-900 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent">
                {homeShelves[0].items.slice(0,5).map(item => <option key={item.id}>{item.title}</option>)}
            </select>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">Grades de Conteúdo (Shelves)</h3>
            <p className="text-sm text-gray-400 mb-2">Arraste para reordenar as seções da página inicial.</p>
            <ul className="space-y-2">
                {homeShelves.map(shelf => (
                    <li key={shelf.id} className="flex items-center p-3 bg-gray-700 rounded cursor-grab">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        <span>{shelf.title}</span>
                    </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button className="bg-accent hover:bg-orange-500 text-white font-bold py-2 px-6 rounded transition-colors">
            Salvar Alterações
        </button>
      </div>
    </div>
  );
};

export default AppearancePage;
