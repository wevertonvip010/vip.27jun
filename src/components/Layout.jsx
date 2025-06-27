import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import IAMirante from '../components/IAMirante';
import { Bot } from 'lucide-react';

const Layout = ({ children }) => {
  const [iaMiranteOpen, setIaMiranteOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
      
      {/* Botão flutuante da IA Mirante */}
      {!iaMiranteOpen && (
        <button
          onClick={() => setIaMiranteOpen(true)}
          className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40 group"
          title="Assistente IA Mirante"
        >
          <Bot className="h-6 w-6 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </button>
      )}

      {/* Componente IA Mirante */}
      <IAMirante 
        isOpen={iaMiranteOpen}
        onToggle={() => setIaMiranteOpen(!iaMiranteOpen)}
        onClose={() => setIaMiranteOpen(false)}
      />
    </div>
  );
};

export default Layout;

