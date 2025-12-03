import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock logic
    const role = email.includes('admin') ? 'admin' : 'customer';
    login(email, role);
    navigate(role === 'admin' ? '/admin' : '/');
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Selamat Datang Kembali</h1>
          <p className="text-gray-500">Masuk ke akun iikan Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
              placeholder="user@example.com"
              required
            />
            <p className="text-xs text-gray-400 mt-1">Tips: Gunakan 'admin@iikan.id' untuk akses admin.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kata Sandi</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
          >
            Masuk
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Belum punya akun? <a href="#" className="text-brand-blue font-bold">Daftar</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
