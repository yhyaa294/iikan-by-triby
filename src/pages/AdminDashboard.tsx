import React, { useState } from 'react';
import { Plus, Package, Calendar, Activity, ListOrdered } from 'lucide-react';
import { BATCHES, ORDERS } from '../lib/data';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'batches' | 'orders'>('batches');
  const [formData, setFormData] = useState({
    harvestDate: '',
    pondId: '',
    phLevel: '',
    feedType: ''
  });

  const handleGenerateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Batch Baru Dibuat! Kode: BATCH-${Math.floor(Math.random() * 1000)} (Mock)`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8 p-6 bg-slate-900 rounded-2xl shadow-lg text-white">
        <div>
            <h1 className="text-3xl font-bold">Pusat Komando Thriby</h1>
            <p className="text-slate-400 text-sm">Hanya Personel Berwenang</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-1 border border-slate-700 inline-flex">
          <button
            onClick={() => setActiveTab('batches')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'batches' ? 'bg-brand-blue text-white shadow-sm' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            Manajemen Batch
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'orders' ? 'bg-brand-blue text-white shadow-sm' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            Pesanan Masuk
          </button>
        </div>
      </div>

      {activeTab === 'batches' ? (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Batch Form */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <div className="bg-blue-50 p-2 rounded-lg text-brand-blue">
                <Plus size={24} />
              </div>
              <h2 className="text-xl font-bold">Buat Batch Baru</h2>
            </div>
            
            <form onSubmit={handleGenerateBatch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Panen</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input 
                    type="date" 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
                    value={formData.harvestDate}
                    onChange={e => setFormData({...formData, harvestDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID Kolam</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: P-05"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
                    value={formData.pondId}
                    onChange={e => setFormData({...formData, pondId: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level pH</label>
                  <div className="relative">
                    <Activity className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="7.0"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
                      value={formData.phLevel}
                      onChange={e => setFormData({...formData, phLevel: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Pakan</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Organic Plus"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
                  value={formData.feedType}
                  onChange={e => setFormData({...formData, feedType: e.target.value})}
                />
              </div>

              <button type="submit" className="w-full bg-brand-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors mt-4">
                Buat Kode Batch
              </button>
            </form>
          </div>

          {/* Recent Batches List */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <div className="bg-green-50 p-2 rounded-lg text-green-600">
                <Package size={24} />
              </div>
              <h2 className="text-xl font-bold">Batch Terbaru</h2>
            </div>
            
            <div className="space-y-4">
              {BATCHES.map((batch) => (
                <div key={batch.code} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <div className="font-bold text-gray-900">{batch.code}</div>
                    <div className="text-sm text-gray-500">{batch.harvestDate}</div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                    {batch.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Orders Tab
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
              <ListOrdered size={24} />
            </div>
            <h2 className="text-xl font-bold">Pesanan Terbaru</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4 font-medium">ID Pesanan</th>
                  <th className="px-6 py-4 font-medium">Pelanggan</th>
                  <th className="px-6 py-4 font-medium">Item</th>
                  <th className="px-6 py-4 font-medium">Total</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-gray-600">{order.customerName}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {order.items.map(item => `${item.productName} (x${item.quantity})`).join(', ')}
                    </td>
                    <td className="px-6 py-4 font-bold text-brand-black">Rp {order.total.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
