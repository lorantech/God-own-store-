'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { api } from '@/lib/api';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import GoldButton from '@/components/ui/GoldButton';
import toast from 'react-hot-toast';
import { FaQuoteLeft } from 'react-icons/fa';

const defaults = {
  title: 'CEO Corner',
  fullName: '',
  position: 'Founder & CEO',
  welcomeMessage: '',
  introduction: '',
  story: '',
  vision: '',
  mission: '',
  personalMessage: '',
  content: '',
  quote: '',
  image: '',
  published: true,
};

export default function AdminCEOCorner() {
  const { token } = useAdminAuth();
  const [formData, setFormData] = useState<any>(defaults);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    api.get('/api/ceo-corner?admin=true').then((data) => {
      if (data) setFormData({ ...defaults, ...data, content: data.content || data.introduction || '' });
    }).catch(() => {});
  }, []);

  const set = (k: string, v: any) => setFormData((s: any) => ({ ...s, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, title: formData.title || (formData.fullName ? `${formData.fullName} - CEO Corner` : 'CEO Corner'), content: formData.content || formData.introduction || formData.welcomeMessage || 'Welcome to GODS OWN STORE.' };
      const saved = await api.post('/api/ceo-corner', payload, token || '');
      if (saved) setFormData({ ...defaults, ...saved });
      toast.success(formData.published === false ? 'Draft saved' : 'CEO Corner published');
    } catch (error: any) {
      toast.error(error?.message || 'Error updating CEO Corner');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="font-cormorant text-4xl text-textPrimary">CEO Corner</h1>
          <p className="font-cinzel text-xs tracking-widest uppercase text-gold mt-1">Dynamic founder content for homepage and CEO page</p>
        </div>
        <button type="button" onClick={() => setPreview((v) => !v)} className="font-cinzel text-xs tracking-widest uppercase px-5 py-2 border border-gold/30 text-gold hover:bg-gold/10">{preview ? 'Hide Preview' : 'Preview'}</button>
      </div>

      <div className={`grid gap-8 ${preview ? 'xl:grid-cols-2' : ''}`}>
        <form onSubmit={handleSubmit} className="bg-surface border border-gold/20 p-6 space-y-4">
          <Field label="Section Title"><input value={formData.title} onChange={(e) => set('title', e.target.value)} className="inp" /></Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="CEO Full Name"><input value={formData.fullName} onChange={(e) => set('fullName', e.target.value)} className="inp" /></Field>
            <Field label="Position/Title"><input value={formData.position} onChange={(e) => set('position', e.target.value)} className="inp" /></Field>
          </div>
          <Field label="Welcome Message"><textarea value={formData.welcomeMessage} onChange={(e) => set('welcomeMessage', e.target.value)} className="inp h-20" /></Field>
          <Field label="Personal Introduction / Main Content"><textarea value={formData.content} onChange={(e) => set('content', e.target.value)} className="inp h-32" required /></Field>
          <Field label="Story Behind GOD's Own Store"><textarea value={formData.story} onChange={(e) => set('story', e.target.value)} className="inp h-28" /></Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Vision"><textarea value={formData.vision} onChange={(e) => set('vision', e.target.value)} className="inp h-24" /></Field>
            <Field label="Mission"><textarea value={formData.mission} onChange={(e) => set('mission', e.target.value)} className="inp h-24" /></Field>
          </div>
          <Field label="Personal Message to Customers"><textarea value={formData.personalMessage || formData.quote} onChange={(e) => { set('personalMessage', e.target.value); set('quote', e.target.value); }} className="inp h-24" /></Field>
          <CloudinaryUpload onUpload={(url) => set('image', url)} accept="image/*" folder="ceo" label="CEO Portrait" />
          {formData.image && <img src={formData.image} alt="CEO" className="w-32 h-32 object-cover border border-gold/20" />}
          <label className="flex items-center gap-2 text-textPrimary"><input type="checkbox" checked={formData.published !== false} onChange={(e) => set('published', e.target.checked)} /> Published</label>
          <div className="flex gap-3 flex-wrap">
            <GoldButton type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save / Publish'}</GoldButton>
            <button type="button" onClick={() => { set('published', false); setTimeout(() => (document.getElementById('ceo-save') as HTMLButtonElement | null)?.click(), 0); }} className="hidden" id="ceo-save-draft" />
          </div>
        </form>

        {preview && (
          <div className="bg-secondary border border-gold/20 p-6">
            <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-4">Preview</p>
            <div className="relative h-64 mb-4 bg-primary border border-gold/10 overflow-hidden">
              {formData.image ? <Image src={formData.image} alt="CEO" fill className="object-cover" /> : <div className="absolute inset-0 flex items-center justify-center text-textSecondary">CEO image</div>}
            </div>
            <h2 className="font-cormorant text-3xl text-textPrimary">{formData.fullName || formData.title}</h2>
            <p className="font-cinzel text-[10px] tracking-widest uppercase text-gold mt-1 mb-4">{formData.position}</p>
            {formData.welcomeMessage && <p className="text-textSecondary mb-4 italic">{formData.welcomeMessage}</p>}
            {(formData.personalMessage || formData.quote) && <div className="flex gap-3 mb-4"><FaQuoteLeft className="text-gold shrink-0" /><p className="text-textPrimary italic">{formData.personalMessage || formData.quote}</p></div>}
            <p className="text-textSecondary whitespace-pre-wrap">{formData.content}</p>
          </div>
        )}
      </div>
      <style jsx>{`.inp{width:100%;background:#0A0F0A;border:1px solid rgba(201,168,76,.2);padding:.5rem 1rem;color:#F5F0E8}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block font-cinzel text-[10px] tracking-widest uppercase text-gold mb-2">{label}</label>{children}</div>;
}
