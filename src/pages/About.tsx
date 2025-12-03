import React from 'react';
import { Fish, ShieldCheck, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-10">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Merevolusi <br />
          <span className="text-brand-blue">Industri Ikan Beku</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          iikan menghubungkan perikanan lokal berkelanjutan langsung ke dapur Anda dengan 
          kesegaran tanpa kompromi dan transparansi 100%.
        </p>
      </section>

      {/* Mission Grid */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center text-brand-blue mb-4">
            <Fish size={24} />
          </div>
          <h3 className="text-2xl font-bold mb-3">Janji Kami</h3>
          <p className="text-gray-500 leading-relaxed">
            Kami percaya setiap orang berhak mendapatkan protein berkualitas tinggi tanpa 
            keraguan. Setiap produk iikan diuji secara ketat, divakum, 
            dan dilacak sejak keluar dari kolam.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center text-brand-blue mb-4">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-2xl font-bold mb-3">Kualitas Utama</h3>
          <p className="text-gray-500 leading-relaxed">
            Fasilitas pemrosesan canggih kami memastikan rasa 'tangkapan segar' 
            terkunci seketika. Tanpa pengawet, hanya teknologi rantai dingin murni terbaik.
          </p>
        </div>
      </section>

      {/* Thriby Ecosystem Badge */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                <Globe size={48} className="text-brand-blue" />
            </div>
            <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Bagian dari Ekosistem Thriby</h2>
                <p className="text-gray-300 max-w-xl">
                    Menginovasi Perikanan Lokal. Thriby Corp berdedikasi untuk memberdayakan komunitas 
                    melalui solusi akuakultur berbasis teknologi, mengelola portofolio 
                    merek berkelanjutan termasuk iikan.
                </p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default About;
