
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Lun', usage: 10 },
  { name: 'Mar', usage: 15 },
  { name: 'Mer', usage: 12 },
  { name: 'Jeu', usage: 20 },
  { name: 'Ven', usage: 18 },
  { name: 'Sam', usage: 25 },
  { name: 'Dim', usage: 22 },
];

const Statistics: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center gap-4">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-pink-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Suivi d'utilisation</h1>
      </div>

      <div className="px-6 space-y-6">
        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-pink-50 p-5 rounded-2xl border border-pink-100">
            <Calendar className="w-5 h-5 text-pink-500 mb-2" />
            <span className="text-2xl font-bold text-gray-800">12</span>
            <p className="text-xs text-gray-500 font-medium">Séances ce mois</p>
          </div>
          <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
            <TrendingUp className="w-5 h-5 text-blue-500 mb-2" />
            <span className="text-2xl font-bold text-gray-800">85%</span>
            <p className="text-xs text-gray-500 font-medium">Progression score</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-64">
          <h3 className="text-sm font-bold text-gray-700 mb-4">Activité de la semaine (min)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#9ca3af'}}
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="usage" 
                stroke="#ec4899" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorUsage)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent sessions */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-700">Séances récentes</h3>
          {[
            { type: 'Confort Intime', date: 'Hier, 18:30', duration: '12 min' },
            { type: 'Hydratation', date: '25 Mai, 09:15', duration: '10 min' },
            { type: 'Confort Urinaire', date: '23 Mai, 20:00', duration: '15 min' }
          ].map((session, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm font-bold text-gray-800">{session.type}</p>
                <p className="text-[10px] text-gray-400 font-medium">{session.date}</p>
              </div>
              <span className="text-xs font-bold text-pink-600 bg-white px-3 py-1 rounded-full shadow-sm">
                {session.duration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
