'use client';

import Link from 'next/link';
import GoldButton from '@/components/ui/GoldButton';

export default function AdminOrders() {
  return (
    <div>
      <h1 className="font-cormorant text-4xl text-textPrimary mb-2">Orders</h1>
      <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-8">Order Management</p>
      <div className="bg-surface border border-gold/20 p-8 max-w-2xl">
        <p className="text-textPrimary mb-3">No dedicated order database/order API was found in the existing GOD&apos;s Own Store backend.</p>
        <p className="text-textSecondary mb-6">
          The current storefront checkout flow uses WhatsApp/cart interactions. Integrating orders here safely requires an existing order system or a new order model/API agreed for this deployment.
        </p>
        <GoldButton href="/admin/dashboard">Back to Overview</GoldButton>
        <p className="text-textSecondary text-sm mt-6">
          Existing customer login/cart/checkout behavior was preserved. <Link href="/shop" className="text-gold hover:underline">Open shop</Link>
        </p>
      </div>
    </div>
  );
}