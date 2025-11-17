
import React from 'react';

const StatCard: React.FC<{ title: string; value: string; icon: string }> = ({ title, value, icon }) => (
    <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center">
            <div className="p-3 rounded-full bg-accent text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                </svg>
            </div>
            <div className="ml-4">
                <p className="text-sm text-text-dark font-medium">{title}</p>
                <p className="text-2xl font-semibold text-white">{value}</p>
            </div>
        </div>
    </div>
);

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total de Vídeos" value="20" icon="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        <StatCard title="Novos na Semana" value="5" icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        <StatCard title="Usuários Admin" value="3" icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 006-6v-1a6 6 0 00-9-5.197" />
        <StatCard title="Categorias" value="6" icon="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
      </div>
      <div className="mt-8 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Atividade Recente</h2>
        <ul>
            <li className="border-b border-gray-700 py-2">Filme "Aventura Final" adicionado.</li>
            <li className="border-b border-gray-700 py-2">Série "Mistério Urbano" atualizada.</li>
            <li className="py-2">Usuário 'Editor' logado.</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
