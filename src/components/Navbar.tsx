import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems, toggleCart } = useCart();
  const location = useLocation();

  // Effect for sticky glass navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Belanja', path: '/shop' },
    { name: 'Lacak', path: '/trace' },
    { name: 'Tentang', path: '/about' },
  ];

  return (
    <>
      <CartDrawer />
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-brand-blue/90 backdrop-blur-lg border-b border-white/20 shadow-sm py-2' 
            : 'bg-brand-blue py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="bg-white p-1.5 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300">
                <img 
                  src="/logo-web.png" 
                  alt="iikan Logo" 
                  className="h-8 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <span className="sr-only">iikan</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`${
                    isActive(link.path) 
                      ? 'text-blue-700 font-bold border-b-2 border-blue-700' 
                      : 'text-brand-dark font-medium hover:text-blue-700'
                  } transition-all duration-200 text-sm uppercase tracking-wide py-1`}
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-brand-dark/20">
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-brand-dark hover:text-blue-700 font-medium text-sm">
                      Dashboard
                    </Link>
                  )}
                  {/* Link to User Dashboard */}
                   {user.role === 'customer' && (
                    <Link to="/dashboard" className="text-brand-dark hover:text-blue-700 font-medium text-sm flex items-center gap-2">
                      <User size={18} /> Akun Saya
                    </Link>
                  )}
                  <button onClick={logout} className="text-brand-dark hover:text-red-600 transition-colors">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 bg-brand-ocean text-white hover:bg-blue-700 transition-colors px-5 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg"
                >
                  <User size={16} />
                  <span>Masuk</span>
                </Link>
              )}
              
              <button 
                onClick={toggleCart}
                className="relative p-2 text-brand-dark hover:text-blue-700 transition-colors"
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-sm animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={toggleCart}
                className="relative p-2 text-brand-dark hover:text-blue-700 transition-colors"
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-sm">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-brand-dark hover:text-blue-700 focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl animate-in slide-in-from-top-5">
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-bold ${
                    isActive(link.path) 
                      ? 'bg-brand-blue/10 text-brand-blue' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="border-t border-gray-100 my-4 pt-4">
                {user ? (
                  <div className="space-y-3">
                      {user.role === 'admin' && (
                          <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-600 font-medium">
                              Dashboard Admin
                          </Link>
                      )}
                      {user.role === 'customer' && (
                          <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-600 font-medium flex items-center gap-2">
                             <User size={18} /> Akun Saya
                          </Link>
                      )}
                      <button 
                          onClick={() => { logout(); setIsOpen(false); }} 
                          className="w-full flex items-center justify-center gap-2 text-red-500 font-bold bg-red-50 py-3 rounded-xl"
                      >
                          <LogOut size={18} /> Keluar
                      </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center btn-primary py-3 rounded-xl"
                  >
                    Masuk / Daftar
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
