
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Droplets,
  Activity,
  ClipboardList,
  ChevronRight,
  Settings,
  ArrowLeft,
  Bluetooth
} from 'lucide-react';
import { TreatmentType } from '../types';

interface DashboardProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isConnected, onConnect, onDisconnect }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: TreatmentType.CONFORT_INTIME,
      label: 'Confort intime',
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      route: `/treatment/${TreatmentType.CONFORT_INTIME}`
    },
    {
      id: TreatmentType.HYDRATATION,
      label: 'Hydratation',
      icon: <Droplets className="w-6 h-6 text-blue-400" />,
      route: `/treatment/${TreatmentType.HYDRATATION}`
    },
    {
      id: TreatmentType.CONFORT_URINAIRE,
      label: 'Confort urinaire',
      icon: <Activity className="w-6 h-6 text-orange-400" />, // Represents activity/kidney-ish
      route: `/treatment/${TreatmentType.CONFORT_URINAIRE}`
    },
    {
      id: TreatmentType.SUIVI,
      label: 'Suivi utilisatrice',
      icon: <ClipboardList className="w-6 h-6 text-red-400" />,
      route: '/statistics'
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto pb-8">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 pt-12">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Pilotage</h1>
        <button
          onClick={() => navigate('/settings')}
          className="p-2 hover:bg-white/50 rounded-full transition-colors"
        >
          <Settings className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Device Visual Card */}
      <div className="mx-4 mb-6 relative group">
        <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-purple-100 rounded-3xl flex items-center justify-center shadow-lg overflow-hidden border border-pink-200/50" style={{ aspectRatio: '5/2' }}>
          {/* Real Product Image */}
          <img
            src="/assets/product.png"
            alt="GYNOLight Device"
            className="w-full h-full object-cover"
          />

          {/* Connection Status Badge */}
          <button
            onClick={isConnected ? onDisconnect : onConnect}
            className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm transition-all ${isConnected ? 'bg-green-100 text-green-600 hover:bg-red-50 hover:text-red-600' : 'bg-white text-gray-500 hover:bg-pink-50'
              }`}
          >
            <Bluetooth className={`w-3 h-3 ${isConnected ? 'fill-current' : ''}`} />
            {isConnected ? 'Connecté' : 'Non connecté'}
          </button>
        </div>
      </div>

      {/* Menu Options */}
      <div className="px-4 space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.route)}
            className="w-full glass flex items-center justify-between p-5 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] border border-white"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-xl shadow-inner">
                {item.icon}
              </div>
              <span className="text-lg font-semibold text-gray-700">{item.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-pink-300" />
          </button>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-auto pt-8">
        <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-pink-200"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-pink-200"></div>
      </div>
    </div>
  );
};

export default Dashboard;
