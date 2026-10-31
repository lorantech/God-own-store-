'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { categories } from '@/lib/utils';
import CloudinaryUpload from './CloudinaryUpload';
import GoldButton from '@/components/ui/GoldButton';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    category: product?.category || categories[0],
    images: product?.images || [],
    featured: product?.featured || false,
    inStock: product?.inStock !== false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addImage = (url: string) => {
    setFormData({ ...formData, images: [...formData.images, url] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-surface border border-gold/20 p-6">
      <div>
        <label className="block font-cinzel text-xs tracking-widest uppercase text-gold mb-2">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-primary border border-gold/20 px-4 py-2 text-textPrimary"
          required
        />
      </div>
      <div>
        <label className="block font-cinzel text-xs tracking-widest uppercase text-gold mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-primary border border-gold/20 px-4 py-2 text-textPrimary h-32"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-cinzel text-xs tracking-widest uppercase text-gold mb-2">Price (?)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            className="w-full bg-primary border border-gold/20 px-4 py-2 text-textPrimary"
            required
          />
        </div>
        <div>
          <label className="block font-cinzel text-xs tracking-widest uppercase text-gold mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-primary border border-gold/20 px-4 py-2 text-textPrimary"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      <CloudinaryUpload onUpload={addImage} accept="image/*" folder="products" label="Product Images" />
      {formData.images.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {formData.images.map((img, idx) => (
            <img key={idx} src={img} alt="" className="w-20 h-20 object-cover" />
          ))}
        </div>
      )}
      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-textPrimary">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-textPrimary">
          <input
            type="checkbox"
            checked={formData.inStock}
            onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
          />
          In Stock
        </label>
      </div>
      <div className="flex gap-4">
        <GoldButton type="submit">{product ? 'Update' : 'Create'}</GoldButton>
        <button type="button" onClick={onCancel} className="px-6 py-3 font-cinzel text-xs tracking-widest uppercase text-textSecondary border border-gold/20">
          Cancel
        </button>
      </div>
    </form>
  );
}
