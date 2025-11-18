
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoPlayer from '../components/VideoPlayer';
import { useMockData } from '../hooks/useMockData';
import { Channel } from '../types';

const LiveTvPage: React.FC = () => {
  const { channels } = useMockData();
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(channels.length > 0 ? channels[0] : null);

  if (!selectedChannel) {
    return (
      <div className="bg-primary min-h-screen">
        <Header />
        <main className="pt-24">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-4xl font-black mb-8">TV ao Vivo</h1>
            <p className="text-text-dark">Nenhum canal disponível no momento.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-primary min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl font-black mb-8">TV ao Vivo</h1>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Player */}
            <div className="w-full md:w-3/4">
              <VideoPlayer videoUrl={selectedChannel.videoUrl} title={selectedChannel.name} />
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center">
                    <img src={selectedChannel.logoUrl} alt={selectedChannel.name} className="w-16 h-16 rounded-lg mr-4 object-cover bg-gray-600" />
                    <div>
                        <h2 className="text-2xl font-bold text-white">{selectedChannel.name}</h2>
                        <p className="text-text-dark">Você está assistindo ao vivo.</p>
                    </div>
                </div>
              </div>
            </div>

            {/* Channel List */}
            <div className="w-full md:w-1/4">
              <div className="bg-gray-800 rounded-lg p-4 h-[65vh] overflow-y-auto">
                <h3 className="text-lg font-bold text-white mb-4">Canais</h3>
                <ul className="space-y-2">
                  {channels.map(channel => (
                    <li key={channel.id}>
                      <button
                        onClick={() => setSelectedChannel(channel)}
                        className={`w-full flex items-center p-3 rounded-md transition-colors text-left ${selectedChannel.id === channel.id ? 'bg-accent text-white shadow-lg' : 'bg-gray-700 hover:bg-gray-600 text-text-light'}`}
                      >
                        <img src={channel.logoUrl} alt={channel.name} className="w-10 h-10 rounded-full mr-4 object-cover bg-gray-500" />
                        <span className="font-semibold">{channel.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LiveTvPage;
