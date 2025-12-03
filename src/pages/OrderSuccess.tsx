import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

const OrderSuccess = () => {
  const orderId = `ORD-2025-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8 inline-block">
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
          <div className="relative bg-white p-4 rounded-full shadow-xl">
            <CheckCircle size={80} className="text-green-500" fill="currentColor" stroke="white" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-brand-dark mb-3">Pembayaran Berhasil!</h1>
        <p className="text-gray-500 mb-8 text-lg">
          Terima Kasih! Pesanan sedang disiapkan.
        </p>

        <div className="glass-card bg-white p-6 rounded-3xl mb-8 border-l-4 border-green-500 text-left">
          <h3 className="font-bold text-brand-dark mb-2">Status Pesanan:</h3>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-green-600 font-bold text-sm">Sedang Diproses oleh Penjual</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Estimasi sampai: Besok, 10:00 - 14:00</p>
        </div>

        <div className="space-y-3">
          <Link 
            to="/" 
            className="block w-full bg-gray-100 text-brand-dark font-bold py-4 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            Kembali ke Beranda
          </Link>
          <Link 
            to="/shop" 
            className="block w-full btn-primary py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2"
          >
            Belanja Lagi <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
