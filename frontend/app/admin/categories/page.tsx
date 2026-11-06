'use client';

import { useEffect, useState } from 'react';
import { Category, Product } from '@/types';
import { api } from '@/lib/api';
import { useAdminAuth } from '@/context/AdminAuthContext';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import GoldButton from '@/components/ui/GoldButton';
import toast from 'react-hot-toast';
import { categories as defaultCategories } from '@/lib/utils';

const empty = { name: '', description: '', image: '' };

export default function AdminCategories() {
  const { token } = useAdminAuth();
  const [items, setItems] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const [c, p] = await Promise.all([api.get('/api/categories'), api.get('/api/products?admin=true')]);
      setItems(Array.isArray(c) ? c : []);
      setProducts(Array.isArray(p) ? p : []);
    } catch (e: any) {
      toast.error(e?.message || 'Failed to load categories');
    }
  };

  useEffect(() => { load(); }, []);

  const list = items.length ? items : defaultCategories.map((name, i) => ({ _id: `default-${i}`, name, description: '', image: '', createdAt: '' } as Category));
  const counts = (name: string) => products.filter((p) => p.category === name).length;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing && !editing._id.startsWith('default-')) {
        await api.put(`/api/categories/${editing._id}`, form, token || '');
        toast.success('Category updated');
      } else {
        await api.post('/api/categories', form, token || '');
        toast.success('Category created');
      }
      setForm(empty);
      setEditing(null);
      await load();
    } catch (e: any) {
      toast.error(e?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  const edit = (c: Category) => {
    if (c._id.startsWith('default-')) {
      toast('This is a default storefront category. Create a matching category record to edit its image/description, or rename carefully via a new category and product reassignment.', { icon: 'ℹ️' });
      setEditing(null);
      setForm({ name: c.name, description: '', image: '' });
      return;
    }
    setEditing(c);
    setForm({ name: c.name, description: c.description || '', image: c.image || '' });
  };

  const remove = async (c: Category) => {
    if (c._id.startsWith('default-')) return toast.error('Default categories are managed by the existing storefront configuration.');
    const n = counts(c.name);
    if (n > 0) return toast.error(`Cannot delete: ${n} product(s) assigned. Reassign them first.`);
    if (!confirm(`Delete category "${c.name}"?`)) return;
    try {
      await api.delete(`/api/categories/${c._id}`, token || '');
      toast.success('Category deleted');
      await load();
    } catch (e: any) {
      toast.error(e?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <h1 className="font-cormorant text-4xl text-textPrimary mb-2">Categories</h1>
      <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-8">Manage storefront categories</p>

      <form onSubmit={submit} className="bg-surface border border-gold/20 p-6 mb-8 max-w-3xl space-y-4">
        <h2 className="font-cinzel text-xs tracking-widest uppercase text-gold">{editing ? 'Edit Category' : 'Create Category'}</h2>
        <div>
          <label className="block font-cinzel text-[10px] tracking-widest uppercase text-gold mb-2">Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-primary border border-gold/20 px-4 py-2 text-textPrimary" required />
        </div>
        <div>
          <label className="block font-cinzel text-[10px] tracking-widest uppercase text-gold mb-2">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-primary border border-gold/20 px-4 py-2 text-textPrimary h-24" />
        </div>
        <CloudinaryUpload onUpload={(url) => setForm({ ...form, image: url })} folder="categories" label="Category Image" />
        {form.image && <img src={form.image} alt="" className="w-32 h-20 object-cover border border-gold/20" />}
        <div className="flex gap-3">
          <GoldButton type="submit" disabled={loading}>{loading ? 'Saving...' : editing ? 'Update' : 'Create'}</GoldButton>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm(empty); }} className="px-6 py-3 font-cinzel text-xs tracking-widest uppercase text-textSecondary border border-gold/20">Cancel</button>}
        </div>
        <p className="text-textSecondary text-sm">When you rename a category, assigned products are updated to the new name. Deletion is blocked while products are assigned.</p>
      </form>

      <div className="bg-surface border border-gold/20 overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gold/20">
            <tr>
              <th className="text-left p-4 font-cinzel text-[10px] tracking-widest uppercase text-gold">Name</th>
              <th className="text-left p-4 font-cinzel text-[10px] tracking-widest uppercase text-gold">Products</th>
              <th className="text-left p-4 font-cinzel text-[10px] tracking-widest uppercase text-gold">Description</th>
              <th className="text-left p-4 font-cinzel text-[10px] tracking-widest uppercase text-gold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c._id} className="border-b border-gold/10">
                <td className="p-4 text-textPrimary">{c.name}</td>
                <td className="p-4 text-textSecondary">{counts(c.name)}</td>
                <td className="p-4 text-textSecondary max-w-xs truncate">{c.description || '—'}</td>
                <td className="p-4 space-x-3">
                  <button onClick={() => edit(c)} className="text-gold hover:underline text-sm">Edit</button>
                  {!c._id.startsWith('default-') && <button onClick={() => remove(c)} className="text-red-400 hover:underline text-sm">Delete</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}