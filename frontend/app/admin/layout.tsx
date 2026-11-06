'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, ready } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  useEffect(() => {
    if (ready && !isAuthenticated && !isLogin) {
      router.replace('/admin/login');
    }
  }, [isAuthenticated, isLogin, ready, router]);

  if (isLogin) return <>{children}</>;

  if (!ready) {
    return <div className="min-h-screen bg-primary flex items-center justify-center text-textSecondary font-cinzel text-xs tracking-widest uppercase">Loading...</div>;
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-primary">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-4 md:p-8 overflow-x-auto">{children}</main>
    </div>
  );
}
