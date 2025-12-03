import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Droplets, Smartphone } from 'lucide-react';
import { PRODUCTS } from '../lib/data';

const Home = () => {
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="space-y-12 md:space-y-20 pb-10 pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden min-h-[500px] md:h-[550px] flex items-center shadow-2xl shadow-blue-900/20 mx-4 md:mx-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
        <img 
          src="/hero-bg.png" 
          alt="Premium Frozen Fish Fillet on Ice" 
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite]"
        />
        <div className="relative z-20 container mx-auto px-6 md:px-16 flex flex-col justify-center h-full py-12 md:py-0">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white/90 text-sm font-medium w-fit mb-6">
            <span className="w-2 h-2 bg-brand-blue rounded-full animate-ping"></span>
            Teknologi Rantai Dingin #1
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1] text-white">
            Kesegaran <br/>
            <span className="text-brand-yellow">
              Yang Terlacak.
            </span>
          </h1>
          <p className="text-lg md:text-2xl mb-8 md:mb-10 max-w-lg text-gray-200 font-light leading-relaxed">
            Ikan beku premium dengan 100% transparansi data dari kolam hingga ke piring Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop" className="btn-primary px-8 py-4 rounded-full text-lg flex justify-center items-center gap-2 group w-full sm:w-auto">
              Belanja Sekarang <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/trace" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex justify-center items-center gap-2 w-full sm:w-auto">
              <Smartphone size={20} /> Scan QR
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6 md:gap-8 px-4">
        {[
            { icon: ShieldCheck, title: "Kemasan Vakum", text: "Disegel langsung setelah diproses untuk mengunci kesegaran." },
            { icon: Droplets, title: "Segar dari Tambak", text: "Dipanen dari kolam berkelanjutan dengan pakan organik." },
            { icon: Smartphone, title: "Pelacakan Pintar", text: "Scan kode QR di setiap kemasan untuk melihat riwayat." }
        ].map((feature, idx) => (
            <div key={idx} className="glass-card p-8 rounded-3xl text-center group hover:-translate-y-2 transition-transform duration-500">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-50 to-white flex items-center justify-center mx-auto mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <feature.icon size={32} className="text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.text}</p>
            </div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Koleksi Pilihan</h2>
            <p className="text-gray-500">Produk terbaik bulan ini untuk keluarga Anda.</p>
          </div>
          <Link to="/shop" className="text-brand-blue font-bold hover:text-blue-700 flex items-center gap-1 transition-colors">
            Lihat Semua <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group glass-card rounded-[2rem] overflow-hidden flex flex-col h-full">
              <div className="relative h-72 overflow-hidden">
                <div className={`absolute top-5 left-5 z-10 px-4 py-2 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg ${product.labelColor}`}>
                  {product.category}
                </div>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Link to="/shop" className="w-full bg-white text-brand-black py-3 rounded-xl font-bold text-center hover:bg-brand-blue hover:text-white transition-colors">
                        Lihat Detail
                    </Link>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-500 mb-6 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mt-auto pt-6 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-400 uppercase font-bold block">Harga</span>
                    <span className="text-xl font-extrabold text-brand-blue">
                        Rp {product.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <button className="bg-gray-50 hover:bg-gray-100 text-gray-900 p-4 rounded-full transition-colors">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
