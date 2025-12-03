import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      clearCart();
      
      // Redirect after showing success
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
          <CheckCircle size={48} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-extrabold text-brand-dark mb-2">Pesanan Berhasil!</h2>
        <p className="text-gray-500 mb-8 max-w-sm">
          Terima kasih telah berbelanja. Kami sedang menyiapkan ikan segar pilihan Anda.
        </p>
        <div className="w-full max-w-xs bg-gray-100 h-2 rounded-full overflow-hidden">
          <div className="h-full bg-brand-ocean animate-[width_3s_linear_forwards]" style={{ width: '0%' }}></div>
        </div>
        <p className="text-xs text-gray-400 mt-4">Mengalihkan ke Dashboard...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
        <div className="pt-32 pb-12 px-4 text-center min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">Keranjang Kosong</h2>
            <Link to="/shop" className="btn-primary px-8 py-3 rounded-xl">Kembali Belanja</Link>
        </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-12">
      <h1 className="text-3xl font-extrabold text-brand-dark mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-brand-dark mb-6">Informasi Pengiriman</h2>
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600">Nama Lengkap</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-ocean focus:ring-2 focus:ring-brand-ocean/20 outline-none transition-all" placeholder="Nama Anda" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600">Nomor WhatsApp</label>
                  <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-ocean focus:ring-2 focus:ring-brand-ocean/20 outline-none transition-all" placeholder="08xxxxxxxxxx" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600">Alamat Lengkap</label>
                <textarea required rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-ocean focus:ring-2 focus:ring-brand-ocean/20 outline-none transition-all" placeholder="Jalan, Nomor Rumah, Kelurahan, Kecamatan..."></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600">Catatan (Opsional)</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-ocean focus:ring-2 focus:ring-brand-ocean/20 outline-none transition-all" placeholder="Contoh: Tolong dikirim sore hari" />
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-28">
            <h2 className="text-xl font-bold text-brand-dark mb-6">Ringkasan Pesanan</h2>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                  <div className="flex-grow">
                    <h3 className="font-bold text-brand-dark text-sm">{item.name}</h3>
                    <div className="flex justify-between items-center mt-1">
                        <p className="text-gray-500 text-xs">{item.quantity}x</p>
                        <p className="text-brand-ocean font-bold text-sm">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-100 pt-4 space-y-2 mb-6">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Ongkos Kirim</span>
                <span className="text-green-600 font-bold">Gratis</span>
              </div>
              <div className="flex justify-between text-lg font-extrabold text-brand-dark pt-2 border-t border-gray-100 mt-2">
                <span>Total</span>
                <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              disabled={loading}
              className="w-full btn-primary py-4 rounded-2xl font-bold shadow-lg shadow-brand-ocean/20 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Konfirmasi Pesanan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
