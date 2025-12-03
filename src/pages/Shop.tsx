import React, { useState } from 'react';
import { ShoppingBag, Filter, Star, Sparkles, X, Plus, Minus, Flame, ChefHat } from 'lucide-react';
import { PRODUCTS, Product } from '../lib/data';
import { useCart } from '../context/CartContext';

const Shop = () => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const getColorClass = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-brand-ocean';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-600';
      default: return 'bg-brand-ocean';
    }
  };

  const openDetail = (product: Product) => setSelectedProduct(product);
  const closeDetail = () => setSelectedProduct(null);

  return (
    <div className="space-y-10 pt-24 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end bg-gradient-to-r from-white to-blue-50 p-8 rounded-[2.5rem] shadow-sm border border-blue-100/50">
        <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 text-brand-ocean text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles size={14} /> Premium Selection
            </div>
            <h1 className="text-4xl font-extrabold text-brand-dark mb-3 tracking-tight">Belanja iikan</h1>
            <p className="text-slate-500 text-lg max-w-xl leading-relaxed">
                Nikmati kualitas ikan beku terbaik dengan standar ekspor. 
                Diproses higienis, dikemas vakum, dan siap diantar ke rumah Anda.
            </p>
        </div>
        <div className="mt-6 md:mt-0">
          <button className="flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-ocean hover:text-brand-ocean px-6 py-3 rounded-2xl text-sm font-bold text-gray-700 transition-all shadow-sm">
            <Filter size={18} /> Filter Produk
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => (
          <div 
            key={product.id} 
            onClick={() => openDetail(product)}
            className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col group h-full bg-white border-0 shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10 hover:-translate-y-1 cursor-pointer"
          >
            
            {/* Image Area */}
            <div className="relative h-80 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
              <div className={`absolute top-6 left-6 z-10 px-4 py-2 rounded-full text-xs font-extrabold text-white uppercase tracking-wider shadow-lg ${getColorClass(product.labelColor)}`}>
                {product.category}
              </div>
              <button className="absolute top-6 right-6 z-10 bg-white/40 backdrop-blur-md p-2.5 rounded-full text-slate-700 hover:bg-white hover:text-red-500 transition-all shadow-sm">
                <Star size={20} />
              </button>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Overlay Gradient for Text readability if needed, kept subtle */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content Area */}
            <div className="p-8 flex-grow flex flex-col">
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-extrabold text-brand-dark">{product.name}</h3>
                </div>
                <p className="text-slate-500 leading-relaxed text-sm font-medium line-clamp-3">
                    {product.description}
                </p>
              </div>
              
              <div className="flex justify-between items-center mt-auto pt-6 border-t border-gray-100">
                <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Harga Spesial</span>
                    <span className="text-2xl font-extrabold text-brand-ocean">
                    Rp {product.price.toLocaleString('id-ID')}
                    </span>
                </div>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                    }}
                    className="btn-primary w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:scale-105 transition-all"
                >
                  <ShoppingBag size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={closeDetail}></div>
            <div className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col md:flex-row max-h-[90vh]">
                
                {/* Modal Image */}
                <div className="w-full md:w-1/2 bg-gray-100 relative h-64 md:h-auto">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                    <button onClick={closeDetail} className="absolute top-6 left-6 p-3 bg-white/80 backdrop-blur-md rounded-full md:hidden">
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 text-white ${getColorClass(selectedProduct.labelColor)}`}>
                                {selectedProduct.category}
                            </span>
                            <h2 className="text-4xl font-extrabold text-brand-dark mb-2">{selectedProduct.name}</h2>
                            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                                <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /> 4.9 (128 Review)</span>
                                <span>•</span>
                                <span>Terjual 500+</span>
                            </div>
                        </div>
                        <button onClick={closeDetail} className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={24} className="text-gray-400" />
                        </button>
                    </div>

                    <div className="space-y-8 flex-grow">
                        <div>
                            <h3 className="font-bold text-brand-dark mb-2 text-lg">Deskripsi Produk</h3>
                            <p className="text-slate-500 leading-relaxed">
                                {selectedProduct.description}
                            </p>
                        </div>

                        {/* Mock Nutrition */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-2xl text-center">
                                <div className="text-2xl font-extrabold text-brand-ocean mb-1">20g</div>
                                <div className="text-xs font-bold text-slate-400 uppercase">Protein</div>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-2xl text-center">
                                <div className="text-2xl font-extrabold text-orange-500 mb-1">90</div>
                                <div className="text-xs font-bold text-slate-400 uppercase">Kalori</div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-2xl text-center">
                                <div className="text-2xl font-extrabold text-green-600 mb-1">0g</div>
                                <div className="text-xs font-bold text-slate-400 uppercase">Gula</div>
                            </div>
                        </div>

                         {/* Mock Cooking Tips */}
                         <div>
                            <h3 className="font-bold text-brand-dark mb-3 text-lg flex items-center gap-2">
                                <ChefHat size={20} className="text-brand-ocean" /> Saran Penyajian
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-slate-600 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 text-brand-ocean flex items-center justify-center font-bold flex-shrink-0">1</div>
                                    Thawing (lelehkan) ikan selama 15-20 menit dalam suhu ruang atau rendam kemasan vakum dalam air biasa.
                                </li>
                                <li className="flex gap-3 text-slate-600 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 text-brand-ocean flex items-center justify-center font-bold flex-shrink-0">2</div>
                                    Panaskan wajan dengan sedikit minyak atau mentega. Masak dengan api sedang selama 3-4 menit tiap sisi.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Sticky Bottom Action */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between gap-6">
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Total Harga</p>
                            <h3 className="text-3xl font-extrabold text-brand-dark">Rp {selectedProduct.price.toLocaleString('id-ID')}</h3>
                        </div>
                        <button 
                            onClick={() => {
                                addToCart(selectedProduct);
                                closeDetail();
                            }}
                            className="btn-primary flex-grow py-4 rounded-2xl font-bold text-lg shadow-xl shadow-brand-ocean/20 flex items-center justify-center gap-2"
                        >
                            <ShoppingBag size={20} /> + Keranjang
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
