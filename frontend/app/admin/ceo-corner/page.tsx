'use client';

import { useEffect, useState } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { api } from '@/lib/api';
import { CEOCorner } from '@/types';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import GoldButton from '@/components/ui/GoldButton';
import toast from 'react-hot-toast';

export default function AdminCEOCorner() {
  const { token } = useAdminAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    quote: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/api/ceo-corner').then((data) => {
      if (data) setFormData(data);
    }).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/ceo-corner', formData, token || '');
      toast.success('CEO Corner updated');
    } catch (error) {
      toast.error('Error updating CEO Corner');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-cormorant text-4xl text-textPrimary mb-8">CEO Corner</h1>
      <form onSubmit={handleSubmit} className="bg-surface border border-gold/20 p-6 max-w-2xl space-y-4">
        <div>
          <label className="block font-cinzel text-xs tracking-widest uppercase text-gold mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-primary border border-gold/20 px-4 py-2 text-textPrimary"
            required
          />
        </div>
        <div>
          <label className="block font-cinzel text-xs tracking-widest uppercase text-gold mb-2">Content</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full bg-primary border border-gold/20 px-4 py-2 text-textPrimary h-40"
            required
          />
        </div>
        <div>
          <label className="block font-cinzel text-xs tracking-widest uppercase text-gold mb-2">Quote</label>
          <input
            type="text"
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            className="w-full bg-primary border border-gold/20 px-4 py-2 text-textPrimary"
          />
        </div>
        <CloudinaryUpload onUpload={(url) => setFormData({ ...formData, image: url })} accept="image/*" folder="ceo" label="CEO Image" />
        {formData.image && <img src={formData.image} alt="CEO" className="w-32 h-32 object-cover" />}
        <GoldButton type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</GoldButton>
      </form>
    </div>
  );
}
