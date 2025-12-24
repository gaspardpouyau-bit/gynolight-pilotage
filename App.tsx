
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TreatmentControl from './pages/TreatmentControl';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import UserProfile from './pages/UserProfile';
import { TreatmentType } from './types';

const AppContent: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [activeTreatment, setActiveTreatment] = useState<TreatmentType | null>(null);

  return (
    <div className="w-full md:max-w-md mx-auto h-screen bg-pink-50 overflow-hidden flex flex-col relative md:shadow-2xl touch-pan-y">
      <Routes>
        <Route path="/" element={<Dashboard onConnect={() => setIsConnected(true)} onDisconnect={() => setIsConnected(false)} isConnected={isConnected} />} />
        <Route path="/treatment/:type" element={<TreatmentControl />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/settings" element={<Settings isConnected={isConnected} onDisconnect={() => setIsConnected(false)} onConnect={() => setIsConnected(true)} />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
