import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CreditCard, MapPin, MessageSquare, Truck, ChevronLeft } from 'lucide-react';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    whatsapp: '',
    payment: 'qris'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (method: string) => {
    setFormData({ ...formData, payment: method });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate Payment Processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      navigate('/order-success');
    }, 2500);
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-2xl font-bold mb-4 text-brand-dark">Keranjang Kosong</h2>
        <p className="text-gray-500 mb-6">Anda belum memilih produk apapun.</p>
        <button onClick={() => navigate('/shop')} className="btn-primary px-8 py-3 rounded-xl">
          Belanja Sekarang
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-24 pb-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-brand-blue mb-6 font-bold">
        <ChevronLeft size={20} /> Kembali
      </button>

      <h1 className="text-3xl font-extrabold text-brand-dark mb-8">Checkout Pesanan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Form Section */}
        <div className="space-y-8">
          <section className="glass-card p-6 rounded-3xl bg-white">
            <h3 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-brand-ocean" /> Alamat Pengiriman
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nama Penerima</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                  placeholder="Contoh: Budi Santoso"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Alamat Lengkap</label>
                <textarea 
                  name="address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Jalan, Nomor Rumah, RT/RW, Kota"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nomor WhatsApp</label>
                <input 
                  type="tel" 
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                  placeholder="0812..."
                />
              </div>
            </div>
          </section>

          <section className="glass-card p-6 rounded-3xl bg-white">
            <h3 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-brand-ocean" /> Metode Pembayaran
            </h3>
            <div className="space-y-3">
              <div 
                onClick={() => handlePaymentChange('qris')}
                className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all ${formData.payment === 'qris' ? 'border-brand-blue bg-blue-50' : 'border-gray-100 hover:bg-gray-50'}`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.payment === 'qris' ? 'border-brand-blue' : 'border-gray-300'}`}>
                  {formData.payment === 'qris' && <div className="w-2.5 h-2.5 rounded-full bg-brand-blue" />}
                </div>
                <div className="flex-grow">
                  <div className="font-bold text-brand-dark">QRIS (Instant)</div>
                  <div className="text-xs text-gray-500">Gopay, OVO, ShopeePay, BCA</div>
                  {formData.payment === 'qris' && (
                    <div className="mt-3 p-4 bg-white rounded-xl border border-gray-200 flex flex-col items-center">
                        <div className="w-32 h-32 bg-gray-900 rounded-lg flex items-center justify-center mb-2">
                            {/* Simple CSS Grid QR Placeholder */}
                            <div className="grid grid-cols-4 gap-1 p-2">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className={`w-5 h-5 ${Math.random() > 0.5 ? 'bg-white' : 'bg-gray-700'} rounded-sm`}></div>
                                ))}
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-400 font-mono">SCAN TO PAY</p>
                    </div>
                  )}
                </div>
              </div>

              <div 
                onClick={() => handlePaymentChange('cod')}
                className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all ${formData.payment === 'cod' ? 'border-brand-blue bg-blue-50' : 'border-gray-100 hover:bg-gray-50'}`}
              >
                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.payment === 'cod' ? 'border-brand-blue' : 'border-gray-300'}`}>
                  {formData.payment === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-brand-blue" />}
                </div>
                <div className="flex-grow">
                  <div className="font-bold text-brand-dark">Cash on Delivery (COD)</div>
                  <div className="text-xs text-gray-500">Bayar saat barang sampai</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Order Summary */}
        <div className="md:sticky md:top-24 h-fit">
          <div className="glass-card p-6 rounded-3xl bg-white shadow-xl shadow-blue-900/5">
             <h3 className="text-xl font-bold text-brand-dark mb-6">Ringkasan Pesanan</h3>
             
             <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
               {cart.map((item) => (
                 <div key={item.id} className="flex gap-3">
                   <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                   <div className="flex-grow">
                     <h4 className="font-bold text-sm text-brand-dark">{item.name}</h4>
                     <p className="text-gray-500 text-xs">{item.quantity} x Rp {item.price.toLocaleString('id-ID')}</p>
                   </div>
                   <div className="font-bold text-sm">
                     Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                   </div>
                 </div>
               ))}
             </div>

             <div className="border-t border-gray-100 pt-4 space-y-2 mb-6">
               <div className="flex justify-between text-sm text-gray-500">
                 <span>Subtotal</span>
                 <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
               </div>
               <div className="flex justify-between text-sm text-gray-500">
                 <span>Biaya Layanan</span>
                 <span>Rp 1.000</span>
               </div>
               <div className="flex justify-between text-sm text-gray-500">
                 <span>Ongkos Kirim</span>
                 <span className="text-green-600 font-bold">Gratis</span>
               </div>
               <div className="flex justify-between text-lg font-extrabold text-brand-dark pt-4 border-t border-dashed border-gray-200 mt-2">
                 <span>Total Bayar</span>
                 <span>Rp {(totalPrice + 1000).toLocaleString('id-ID')}</span>
               </div>
             </div>

             <button 
               onClick={handleSubmit}
               disabled={isProcessing || !formData.name || !formData.address || !formData.whatsapp}
               className="w-full btn-primary py-4 rounded-2xl font-bold text-lg shadow-lg shadow-brand-blue/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
             >
               {isProcessing ? (
                 <>Memproses Transaksi...</>
               ) : (
                 <>Bayar Sekarang</>
               )}
             </button>
             <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
               <Truck size={12} /> Pengiriman aman dengan pendingin khusus
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
