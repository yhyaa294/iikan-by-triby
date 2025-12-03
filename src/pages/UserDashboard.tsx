import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, ChefHat, ArrowRight, Award, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user, logout } = useAuth();

  const MOCK_ORDERS = [
    { id: 'ORD-2025-001', date: '02 Des 2025', items: '2x iikan PURE', total: 90000, status: 'Sedang Dikirim' },
    { id: 'ORD-2024-128', date: '20 Nov 2025', items: '1x iikan GOLD', total: 55000, status: 'Selesai' },
    { id: 'ORD-2024-105', date: '15 Oct 2025', items: '3x iikan FIRE', total: 180000, status: 'Selesai' },
  ];

  const SAVED_RECIPES = [
    { id: 1, title: 'Patin Fillet Asam Manis', time: '30 mnt', level: 'Mudah' },
    { id: 2, title: 'Sup Ikan Kuah Bening', time: '45 mnt', level: 'Sedang' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark mb-2">Halo, {user?.username} 👋</h1>
          <p className="text-gray-500">Selamat datang kembali di dashboard personal Anda.</p>
        </div>
        <button 
            onClick={logout}
            className="px-6 py-2 border border-gray-200 rounded-xl text-gray-600 font-bold hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center gap-2"
        >
            <LogOut size={18} /> Keluar
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Member Card & Stats */}
        <div className="space-y-8">
          {/* Member Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-dark to-slate-900 text-white p-8 shadow-xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Award size={120} />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <Award className="text-yellow-400" />
                    <span className="text-yellow-400 font-bold tracking-widest uppercase text-sm">Gold Member</span>
                </div>
                <p className="text-slate-400 text-sm mb-1">Total Belanja</p>
                <h3 className="text-3xl font-extrabold mb-6">Rp 1.250.000</h3>
                <div className="h-1 w-full bg-slate-700 rounded-full mb-2 overflow-hidden">
                    <div className="h-full bg-brand-ocean w-[70%]"></div>
                </div>
                <p className="text-xs text-slate-400">Belanja Rp 750.000 lagi untuk jadi Platinum.</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-brand-dark mb-4">Aksi Cepat</h3>
            <div className="space-y-3">
                <Link to="/shop" className="block w-full py-3 px-4 bg-gray-50 rounded-xl text-brand-dark font-bold hover:bg-brand-blue/10 hover:text-brand-ocean transition-colors text-center">
                    Belanja Lagi
                </Link>
                <Link to="/trace" className="block w-full py-3 px-4 bg-gray-50 rounded-xl text-brand-dark font-bold hover:bg-brand-blue/10 hover:text-brand-ocean transition-colors text-center">
                    Scan QR Kemasan
                </Link>
            </div>
          </div>
        </div>

        {/* Middle Column: Order History */}
        <div className="md:col-span-2 space-y-8">
           {/* Orders */}
           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-brand-dark flex items-center gap-2">
                    <Package size={24} className="text-brand-ocean" /> Riwayat Pesanan
                </h2>
                <button className="text-sm text-brand-ocean font-bold hover:underline">Lihat Semua</button>
             </div>
             
             <div className="space-y-4">
                {MOCK_ORDERS.map((order) => (
                    <div key={order.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-100 rounded-2xl hover:border-brand-ocean/30 transition-colors">
                        <div className="mb-2 sm:mb-0">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="font-bold text-brand-dark">{order.id}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                    order.status === 'Selesai' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">{order.items} • {order.date}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-brand-dark">Rp {order.total.toLocaleString('id-ID')}</p>
                            <button className="text-xs text-brand-ocean font-bold mt-1 hover:underline">Lacak Paket</button>
                        </div>
                    </div>
                ))}
             </div>
           </div>

           {/* Saved Recipes */}
           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-brand-dark flex items-center gap-2">
                    <ChefHat size={24} className="text-brand-ocean" /> Resep Tersimpan
                </h2>
             </div>
             
             <div className="grid sm:grid-cols-2 gap-4">
                {SAVED_RECIPES.map((recipe) => (
                    <div key={recipe.id} className="p-4 bg-gray-50 rounded-2xl group cursor-pointer hover:bg-brand-blue/5 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-2xl">🥘</div>
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 group-hover:text-brand-ocean transition-colors">
                                <ArrowRight size={16} />
                            </div>
                        </div>
                        <h3 className="font-bold text-brand-dark mb-1">{recipe.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                            <span className="flex items-center gap-1"><Clock size={12} /> {recipe.time}</span>
                            <span>•</span>
                            <span>{recipe.level}</span>
                        </div>
                    </div>
                ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
