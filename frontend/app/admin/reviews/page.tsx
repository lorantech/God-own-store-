'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { api } from '@/lib/api';
import { Review, Product } from '@/types';
import GoldButton from '@/components/ui/GoldButton';
import StarRating from '@/components/ui/StarRating';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import { FaCheck, FaTrash, FaEdit, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const empty = { name: '', handle: '', rating: 5, title: '', comment: '', type: 'text' as 'text' | 'video', image: '', mediaUrl: '', product: '', approved: false };

export default function AdminTestimonials() {
  const { token } = useAdminAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'published'>('all');
  const [form, setForm] = useState<any>(empty);
  const [editing, setEditing] = useState<Review | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchReviews = () => {
    const q = filter === 'pending' ? '&approved=false' : filter === 'published' ? '&approved=true' : '';
    api.get(`/api/reviews?admin=true${q}`).then((d) => setReviews(Array.isArray(d) ? d : [])).catch(() => toast.error('Failed to load testimonials'));
  };

  useEffect(() => { fetchReviews(); }, [filter]);
  useEffect(() => { api.get('/api/products?admin=true').then((d) => Array.isArray(d) && setProducts(d)).catch(() => {}); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.rating) return toast.error('Name and rating are required');
    if (form.type === 'video' && !form.mediaUrl) return toast.error('Please upload a testimonial video');
    setLoading(true);
    try {
      const payload = { ...form, rating: Number(form.rating) };
      if (editing) await api.put(`/api/reviews/${editing._id}`, payload, token || '');
      else await api.post('/api/reviews/admin', payload, token || '');
      toast.success(editing ? 'Testimonial updated' : 'Testimonial created');
      setForm(empty); setEditing(null); fetchReviews();
    } catch (e: any) { toast.error(e?.message || 'Save failed'); } finally { setLoading(false); }
  };

  const setApproved = async (r: Review, approved: boolean) => {
    try {
      await api.put(`/api/reviews/${r._id}/approve`, { approved }, token || '');
      toast.success(approved ? 'Published' : 'Unpublished');
      fetchReviews();
    } catch (e: any) { toast.error(e?.message || 'Update failed'); }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try { await api.delete(`/api/reviews/${id}`, token || ''); toast.success('Deleted'); fetchReviews(); }
    catch (e: any) { toast.error(e?.message || 'Delete failed'); }
  };

  const productName = useMemo(() => Object.fromEntries(products.map((p) => [p._id, p.name])), [products]);

  return (
    <div>
      <h1 className="font-cormorant text-4xl text-textPrimary mb-2">Testimonials</h1>
      <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-8">Manage customer reviews and video testimonials</p>

      <form onSubmit={submit} className="bg-surface border border-gold/20 p-6 mb-8 max-w-4xl space-y-4">
        <h2 className="font-cinzel text-xs tracking-widest uppercase text-gold">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Customer Full Name"><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="inp" required /></Field>
          <Field label="Social Handle"><input value={form.handle} onChange={(e) => setForm({ ...form, handle: e.target.value })} className="inp" placeholder="@handle" /></Field>
          <Field label="Review Title"><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="inp" /></Field>
          <Field label="Rating (1-5)"><input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} className="inp" /></Field>
          <Field label="Type">
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="inp">
              <option value="text">Written</option>
              <option value="video">Video</option>
            </select>
          </Field>
          <Field label="Product Purchased (optional)">
            <select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} className="inp">
              <option value="">—</option>
              {products.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Testimonial"><textarea value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} className="inp h-28" /></Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><CloudinaryUpload onUpload={(url) => setForm({ ...form, image: url })} folder="testimonials" label="Customer Photo" />{form.image && <img src={form.image} alt="" className="mt-2 w-24 h-24 object-cover border border-gold/20" />}</div>
          <div><CloudinaryUpload onUpload={(url) => setForm({ ...form, mediaUrl: url })} accept="video/mp4,video/webm,video/*" folder="testimonials/videos" label="Testimonial Video" />{form.mediaUrl && <video src={form.mediaUrl} controls className="mt-2 max-w-xs max-h-40 border border-gold/20" />}</div>
        </div>
        <label className="flex items-center gap-2 text-textPrimary"><input type="checkbox" checked={!!form.approved} onChange={(e) => setForm({ ...form, approved: e.target.checked })} /> Publish now</label>
        <div className="flex gap-3">
          <GoldButton type="submit" disabled={loading}>{loading ? 'Saving...' : editing ? 'Update' : 'Create'}</GoldButton>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm(empty); }} className="px-6 py-3 font-cinzel text-xs tracking-widest uppercase text-textSecondary border border-gold/20">Cancel</button>}
        </div>
      </form>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'pending', 'published'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`font-cinzel text-xs tracking-widest uppercase px-5 py-2 border transition-colors ${filter === f ? 'bg-gold text-buttonText border-gold' : 'border-gold/30 text-textSecondary hover:text-gold'}`}>{f}</button>
        ))}
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r._id} className="bg-surface border border-gold/20 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4 min-w-0">
                {r.image ? <img src={r.image} alt="" className="w-14 h-14 object-cover border border-gold/20 shrink-0" /> : <div className="w-14 h-14 bg-primary border border-gold/20 shrink-0" />}
                <div className="min-w-0">
                  <h3 className="font-cormorant text-xl text-textPrimary">{r.name} {r.handle && <span className="text-textSecondary text-base">{r.handle}</span>}</h3>
                  {r.title && <p className="text-gold text-sm">{r.title}</p>}
                  <StarRating rating={r.rating} />
                  {r.product && productName[r.product] && <p className="text-textSecondary text-xs mt-1">Product: {productName[r.product]}</p>}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => { setEditing(r); setForm({ ...empty, ...r }); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-gold p-2" title="Edit"><FaEdit /></button>
                {!r.approved ? <button onClick={() => setApproved(r, true)} className="text-green-400 p-2" title="Publish"><FaCheck /></button> : <button onClick={() => setApproved(r, false)} className="text-yellow-400 p-2" title="Unpublish"><FaEyeSlash /></button>}
                <button onClick={() => remove(r._id)} className="text-red-400 p-2" title="Delete"><FaTrash /></button>
              </div>
            </div>
            {r.comment && <p className="text-textSecondary mt-3">{r.comment}</p>}
            {r.type === 'video' && r.mediaUrl && <video src={r.mediaUrl} controls className="mt-3 max-w-sm max-h-56 border border-gold/20" />}
            <p className="font-cinzel text-[10px] tracking-widest uppercase mt-3 {r.approved ? 'text-green-400' : 'text-gold'}">{r.approved ? 'Published' : 'Pending'}</p>
          </div>
        ))}
        {!reviews.length && <p className="text-textSecondary">No testimonials found.</p>}
      </div>
      <style jsx>{`.inp{width:100%;background:#0A0F0A;border:1px solid rgba(201,168,76,.2);padding:.5rem 1rem;color:#F5F0E8}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block font-cinzel text-[10px] tracking-widest uppercase text-gold mb-2">{label}</label>{children}</div>;
}