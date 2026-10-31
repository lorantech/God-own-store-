'use client';

import { useEffect, useState } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { api } from '@/lib/api';
import { Settings } from '@/types';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import GoldButton from '@/components/ui/GoldButton';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const { token } = useAdminAuth();
  const [settings, setSettings] = useState<Settings>({
    storeName: 'GODS OWN STORE',
    tagline: 'Dealer in All Kind of Jewelries',
    whatsapp: '2347032835379',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/api/settings').then(setSettings).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/api/settings', settings, token || '');
      toast.success('Settings updated');
    } catch (error) {
      toast.error('Error updating settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-cormorant text-4xl text-textPrimary mb-8">Settings</h1>
      <form onSubmit={handleSubmit} className="bg-surface border border-gold/20 p-6 max-w-2xl space-y-4">
        <div>
          <label className="block font-cinzel text-xs tracking-widest uppercase text-gold mb-2">Store Name</label>
          <input
            type="text"
            value={settings.storeName}
            onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
            className="w-full bg-primary border border-gold/20 px-4 py-2 text-textPrimary"
          />
        </div>
        <div>
          <label className="block font-cinzel text-xs tracking-widest uppercase text-gold mb-2">Tagline</label>
          <input
            type="text"
            value={settings.tagline}
            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
            className="w-full bg-primary border border-gold/20 px-4 py-2 text-textPrimary"
          />
        </div>
        <div>
          <label className="block font-cinzel text-xs tracking-widest uppercase text-gold mb-2">WhatsApp Number</label>
          <input
            type="text"
            value={settings.whatsapp}
            onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
            className="w-full bg-primary border border-gold/20 px-4 py-2 text-textPrimary"
          />
        </div>
        <CloudinaryUpload onUpload={(url) => setSettings({ ...settings, logo: url })} accept="image/*" folder="logo" label="Logo" />
        {settings.logo && <img src={settings.logo} alt="Logo" className="w-20 h-20 object-contain" />}
        <GoldButton type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</GoldButton>
      </form>
    </div>
  );
}
