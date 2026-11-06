'use client';

import { useEffect, useState } from 'react';
import { Product, Category } from '@/types';
import { categories as defaultCategories } from '@/lib/utils';
import { api } from '@/lib/api';
import CloudinaryUpload from './CloudinaryUpload';
import GoldButton from '@/components/ui/GoldButton';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [cats, setCats] = useState<string[]>(defaultCategories);
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    discountPrice: product?.discountPrice ?? '',
    category: product?.category || defaultCategories[0],
    images: product?.images || [],
    sizes: product?.sizes || '',
    featured: product?.featured || false,
    inStock: product?.inStock !== false,
    published: product?.published !== false,
  });

  useEffect(() => {
    api.get('/api/categories').then((d: Category[]) => {
      if (Array.isArray(d) && d.length) {
        const names = d.map((c) => c.name);
        setCats(names);
        setFormData((s) => (names.includes(s.category) ? s : { ...s, category: names[0] }));
      }
    }).catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, price: Number(formData.price), discountPrice: formData.discountPrice === '' ? undefined : Number(formData.discountPrice) });
  };

  const addImage = (url: string) => setFormData((s) => ({ ...s, images: [...s.images, url] }));
  const removeImage = (idx: number) => setFormData((s) => ({ ...s, images: s.images.filter((_, i) => i !== idx) }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-surface border border-gold/20 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Product Name"><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="inp" required /></Field>
        <Field label="Category">
          <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="inp">
            {cats.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Description"><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="inp h-32" required /></Field>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Price"><input type="number" min={0} value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value as any })} className="inp" required /></Field>
        <Field label="Discount Price (optional)"><input type="number" min={0} value={formData.discountPrice} onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })} className="inp" /></Field>
        <Field label="Sizes / Specifications"><input type="text" value={formData.sizes} onChange={(e) => setFormData({ ...formData, sizes: e.target.value })} className="inp" placeholder="e.g. 16, 18, 20" /></Field>
      </div>
      <CloudinaryUpload onUpload={addImage} accept="image/*" folder="products" label="Add Product Image" />
      {formData.images.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {formData.images.map((img, idx) => (
            <div key={`${img}-${idx}`} className="relative">
              <img src={img} alt="" className="w-20 h-20 object-cover border border-gold/20" />
              <button type="button" onClick={() => removeImage(idx)} className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 text-xs">×</button>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-6 flex-wrap">
        <Check label="Published" checked={formData.published} onChange={(v) => setFormData({ ...formData, published: v })} />
        <Check label="Featured" checked={formData.featured} onChange={(v) => setFormData({ ...formData, featured: v })} />
        <Check label="In Stock" checked={formData.inStock} onChange={(v) => setFormData({ ...formData, inStock: v })} />
      </div>
      <div className="flex gap-4">
        <GoldButton type="submit">{product ? 'Update Product' : 'Create Product'}</GoldButton>
        <button type="button" onClick={onCancel} className="px-6 py-3 font-cinzel text-xs tracking-widest uppercase text-textSecondary border border-gold/20">Cancel</button>
      </div>
      <style jsx>{`.inp{width:100%;background:#0A0F0A;border:1px solid rgba(201,168,76,.2);padding:.5rem 1rem;color:#F5F0E8}`}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block font-cinzel text-[10px] tracking-widest uppercase text-gold mb-2">{label}</label>{children}</div>;
}
function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return <label className="flex items-center gap-2 text-textPrimary"><input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />{label}</label>;
}
