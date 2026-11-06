'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { api } from '@/lib/api';
import GoldButton from '@/components/ui/GoldButton';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.post('/api/auth/login', { username, password });
      login(data.token);
      toast.success('Login successful');
      router.push('/admin/dashboard');
    } catch (error: any) {
      const msg = error?.message || 'Login failed';
      if (msg === 'API request failed' || msg.includes('Failed to fetch') || msg.includes('Network')) {
        toast.error('Cannot reach server. Start the backend and ensure /api is available.');
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-surface border border-gold/20 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center mx-auto mb-4">
            <span className="text-buttonText font-cormorant text-2xl font-semibold">GO</span>
          </div>
          <h1 className="font-cormorant text-3xl text-textPrimary mb-2">Admin Login</h1>
          <p className="font-cinzel text-xs tracking-widest uppercase text-gold">GODS OWN STORE</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-cinzel text-xs tracking-widest uppercase text-gold mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-primary border border-gold/20 px-4 py-3 text-textPrimary focus:outline-none focus:border-gold"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="block font-cinzel text-xs tracking-widest uppercase text-gold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-primary border border-gold/20 px-4 py-3 pr-12 text-textPrimary focus:outline-none focus:border-gold"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-[#C9A84C] hover:text-[#E2C27D] transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash size={18} className="pointer-events-none" /> : <FaEye size={18} className="pointer-events-none" />}
              </button>
            </div>
          </div>
          <GoldButton type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </GoldButton>
        </form>
      </div>
    </div>
  );
}
