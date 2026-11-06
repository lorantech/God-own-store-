'use client';

import { useEffect, useState } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { api } from '@/lib/api';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import ProductForm from '@/components/admin/ProductForm';
import GoldButton from '@/components/ui/GoldButton';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const { token } = useAdminAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const fetchProducts = () => {
    api.get('/api/products').then(setProducts).catch(console.error);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (data: any) => {
    try {
      if (editingProduct) {
        await api.put(`/api/products/${editingProduct._id}`, data, token || '');
        toast.success('Product updated');
      } else {
        await api.post('/api/products', data, token || '');
        toast.success('Product created');
      }
      setShowForm(false);
      setEditingProduct(undefined);
      fetchProducts();
    } catch (error: any) {
      toast.error(error?.message || 'Error saving product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      await api.delete(`/api/products/${id}`, token || '');
      toast.success('Product deleted');
      fetchProducts();
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-cormorant text-4xl text-textPrimary">Products</h1>
        <GoldButton onClick={() => { setShowForm(true); setEditingProduct(undefined); }}>
          <FaPlus className="inline mr-2" /> Add Product
        </GoldButton>
      </div>

      {showForm && (
        <div className="mb-8">
          <ProductForm
            product={editingProduct}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditingProduct(undefined); }}
          />
        </div>
      )}

      <div className="bg-surface border border-gold/20 overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gold/20">
            <tr>
              <th className="text-left p-4 font-cinzel text-xs tracking-widest uppercase text-gold">Name</th>
              <th className="text-left p-4 font-cinzel text-xs tracking-widest uppercase text-gold">Category</th>
              <th className="text-left p-4 font-cinzel text-xs tracking-widest uppercase text-gold">Color</th>
              <th className="text-left p-4 font-cinzel text-xs tracking-widest uppercase text-gold">Variant Group</th>
              <th className="text-left p-4 font-cinzel text-xs tracking-widest uppercase text-gold">Price</th>
              <th className="text-left p-4 font-cinzel text-xs tracking-widest uppercase text-gold">Featured</th>
              <th className="text-left p-4 font-cinzel text-xs tracking-widest uppercase text-gold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-gold/10">
                <td className="p-4 text-textPrimary">{product.name}</td>
                <td className="p-4 text-textSecondary">{product.category}</td>
                <td className="p-4 text-textSecondary">{product.color || '—'}</td>
                <td className="p-4 text-textSecondary text-xs break-all">{product.variantGroup || '—'}</td>
                <td className="p-4 text-textPrimary">{formatPrice(product.price)}</td>
                <td className="p-4 text-textSecondary">{product.featured ? 'Yes' : 'No'}</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => { setEditingProduct(product); setShowForm(true); }}
                    className="text-gold hover:text-gold-light"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
