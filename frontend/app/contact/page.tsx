import SectionHeading from '@/components/ui/SectionHeading';
import { FaWhatsapp, FaPhone, FaTiktok, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="py-20 px-4 max-w-4xl mx-auto">
      <SectionHeading title="Contact Us" subtitle="Get In Touch" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface border border-gold/20 p-8">
          <h3 className="font-cormorant text-2xl text-textPrimary mb-6">Visit Our Store</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-gold mt-1" />
              <p className="text-textSecondary">1, Obanikoro Street, Lagos Island</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-gold/20 p-8">
          <h3 className="font-cormorant text-2xl text-textPrimary mb-6">Reach Us</h3>
          <div className="space-y-4">
            <a href="https://wa.me/2347032835379" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-textSecondary hover:text-gold transition-colors">
              <FaWhatsapp className="text-gold" />
              <span>07032835379</span>
            </a>
            <a href="tel:07032835379" className="flex items-center gap-3 text-textSecondary hover:text-gold transition-colors">
              <FaPhone className="text-gold" />
              <span>07032835379 / 08163126896</span>
            </a>
            <a href="https://www.tiktok.com/@gods_own_store2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-textSecondary hover:text-gold transition-colors">
              <FaTiktok className="text-gold" />
              <span>@gods_own_store2</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
