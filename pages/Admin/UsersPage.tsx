
import React from 'react';

const mockUsers = [
  { id: 1, name: 'Admin Principal', email: 'admin@kwai.com', role: 'Admin' },
  { id: 2, name: 'Editor Chefe', email: 'editor@kwai.com', role: 'Editor' },
  { id: 3, name: 'Gerente de Conteúdo', email: 'gerente@kwai.com', role: 'Editor' },
];

const UsersPage: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Gerenciamento de Usuários</h1>
        <button className="bg-accent hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition-colors">
          Adicionar Usuário
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">Nome</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Função</th>
                <th scope="col" className="px-6 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map(user => (
                <tr key={user.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{user.name}</th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'Admin' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                      {user.role}
                    </span>
                  </td>
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
  );
};

export default UsersPage;
