import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6 max-w-7xl pt-24">
        {children}
      </main>
      <footer className="bg-brand-dark text-white py-12 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
             <span className="font-extrabold text-4xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white inline-block mb-2">iikan</span>
             <p className="text-brand-blue text-xs font-bold tracking-widest uppercase">Powered by Thriby</p>
          </div>
          <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Platform pelacakan kesegaran ikan berbasis blockchain dan AI pertama di Indonesia. Transparan dari laut hingga piring Anda.
          </p>
          <div className="flex justify-center gap-8 text-gray-400 text-sm font-medium">
            <a href="#" className="hover:text-brand-blue transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-blue transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-blue transition-colors">Contact</a>
            <a href="#" className="hover:text-brand-blue transition-colors">Partners</a>
          </div>
          <p className="mt-10 text-gray-600 text-xs">© 2025 PT Thriby Teknologi Indonesia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

