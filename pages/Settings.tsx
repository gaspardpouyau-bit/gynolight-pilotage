
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Shield, Info, Bluetooth, Power } from 'lucide-react';

interface SettingsProps {
  isConnected: boolean;
  onDisconnect: () => void;
  onConnect: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isConnected, onDisconnect, onConnect }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-8 sm:pt-12 pb-4 sm:pb-6 flex items-center gap-4">
        <button onClick={() => navigate('/')} className="p-3 hover:bg-pink-50 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-gray-800">Paramètres</h1>
      </div>

      <div className="px-4 sm:px-6 space-y-6 sm:space-y-8">
        {/* Device Management Section */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Appareil</h3>
          <div className="bg-pink-50 p-5 rounded-2xl flex items-center justify-between border border-pink-100">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${isConnected ? 'bg-green-100 text-green-600' : 'bg-white text-gray-400'} shadow-sm`}>
                <Bluetooth className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-800">GYNOlight Pro #042</p>
                <p className="text-xs text-gray-500">{isConnected ? 'Connecté - Batterie 84%' : 'Déconnecté'}</p>
              </div>
            </div>
            <button
              onClick={isConnected ? onDisconnect : onConnect}
              className={`px-5 py-3 rounded-lg text-xs font-bold transition-all min-w-[100px] min-h-[44px] ${isConnected ? 'bg-white text-red-500 hover:bg-red-50' : 'bg-pink-500 text-white hover:bg-pink-600'
                }`}
            >
              {isConnected ? 'Déconnecter' : 'Connecter'}
            </button>
          </div>
        </section>

        {/* User Profile Section */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Compte & Sécurité</h3>

          <button
            onClick={() => navigate('/profile')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors min-h-[56px]"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Profil Utilisatrice</span>
            </div>
            <Info className="w-4 h-4 text-gray-300" />
          </button>

          <div className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl min-h-[56px]">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Notifications</span>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-7 rounded-full relative transition-colors ${notifications ? 'bg-pink-500' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${notifications ? 'left-6' : 'left-1'}`} />
            </button>
          </div>

          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors min-h-[56px]">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Confidentialité</span>
            </div>
            <Info className="w-4 h-4 text-gray-300" />
          </button>
        </section>

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-bold border-2 border-red-50 rounded-xl hover:bg-red-50 transition-colors mt-6 sm:mt-8 min-h-[56px]">
          <Power className="w-5 h-5" />
          Se déconnecter
        </button>

        <div className="text-center pb-12">
          <p className="text-[10px] text-gray-400 font-bold">GYNOLIGHT APP v1.2.0</p>
          <p className="text-[10px] text-gray-300 font-medium">Dispositif Médical de Classe IIa</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
