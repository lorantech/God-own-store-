'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { FaTachometerAlt, FaBox, FaTags, FaComment, FaCrown, FaCog, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAdminAuth();

  const menuItems = [
    { name: 'Overview', href: '/admin/dashboard', icon: FaTachometerAlt },
    { name: 'Products', href: '/admin/products', icon: FaBox },
    { name: 'Categories', href: '/admin/categories', icon: FaTags },
    { name: 'Testimonials', href: '/admin/reviews', icon: FaComment },
    { name: 'CEO Corner', href: '/admin/ceo-corner', icon: FaCrown },
    { name: 'Orders', href: '/admin/orders', icon: FaClipboardList },
    { name: 'Settings', href: '/admin/settings', icon: FaCog },
  ];

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="w-64 shrink-0 bg-secondary border-r border-gold/20 min-h-screen">
      <div className="p-6 border-b border-gold/20">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
            <span className="text-buttonText font-cormorant text-lg font-semibold">GO</span>
          </div>
          <div className="ml-3">
            <h2 className="font-cormorant text-lg text-textPrimary">Admin Panel</h2>
            <p className="font-cinzel text-[9px] tracking-widest uppercase text-gold/70">God&apos;s Own Store</p>
          </div>
        </div>
      </div>
      <nav className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 mb-2 font-cinzel text-xs tracking-widest uppercase transition-colors ${
                isActive ? 'bg-gold/10 text-gold border-l-2 border-gold' : 'text-textPrimary hover:bg-surface hover:text-gold'
              }`}
            >
              <Icon size={16} />
              {item.name}
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full font-cinzel text-xs tracking-widest uppercase text-textPrimary hover:bg-surface hover:text-gold transition-colors"
        >
          <FaSignOutAlt size={16} />
          Logout
        </button>
      </nav>
    </div>
  );
}
