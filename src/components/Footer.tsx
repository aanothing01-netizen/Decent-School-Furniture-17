import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import { Logo } from './Logo';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUpRight,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { themeSettings, getWhatsAppUrl, setIsSupabaseModalOpen } = useStore();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/pages/about' },
    { name: 'Products', path: '/collections/all' },
    { name: 'Projects', path: '/pages/projects' },
    { name: 'Custom Orders', path: '/pages/custom-orders' },
    { name: 'Customer Login / Portal', path: '/account/login' },
    { name: 'Create Account', path: '/account/register' },
    { name: 'FAQs', path: '/pages/faqs' },
    { name: 'Contact', path: '/pages/contact' },
  ];

  return (
    <footer className="bg-[#102A43] text-white pt-16 pb-12 border-t border-[#243B53]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#243B53]/60">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="cursor-pointer" onClick={() => onNavigate('/')}>
              <Logo variant="dark" size="lg" />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              We provide high-quality school furniture solutions for schools, colleges and educational institutions across Pakistan and international institutional clients.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#1E3A8A]/50 hover:bg-[#F59E0B] flex items-center justify-center text-slate-200 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#1E3A8A]/50 hover:bg-[#F59E0B] flex items-center justify-center text-slate-200 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#1E3A8A]/50 hover:bg-[#F59E0B] flex items-center justify-center text-slate-200 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#1E3A8A]/50 hover:bg-[#F59E0B] flex items-center justify-center text-slate-200 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 flex items-center gap-2">
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => onNavigate(link.path)}
                    className="text-slate-300 hover:text-[#F59E0B] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 hover:bg-[#F59E0B]" />
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Product Categories */}
          <div>
            <h3 className="text-white text-base font-bold mb-4">
              <span>Product Categories</span>
            </h3>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate(`/collections/${cat.handle}`)}
                    className="text-slate-300 hover:text-[#F59E0B] transition-colors cursor-pointer flex items-center justify-between w-full text-left"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-slate-400 bg-[#243B53] px-1.5 py-0.5 rounded">
                      {cat.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-bold mb-4">
              <span>Contact Information</span>
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#F59E0B] shrink-0 mt-1" />
                <a href={`tel:${themeSettings.phone}`} className="hover:text-white transition-colors">
                  {themeSettings.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#F59E0B] shrink-0 mt-1" />
                <a href={`mailto:${themeSettings.email}`} className="hover:text-white transition-colors break-all">
                  {themeSettings.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0 mt-1" />
                <span>{themeSettings.address}</span>
              </li>
            </ul>
            {/* Chat on WhatsApp Button */}
            <div className="pt-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#16803C] hover:bg-[#157134] text-white font-bold rounded-lg shadow-md transition-all text-sm group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-200" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2025–2026 Decent School Furniture. All rights reserved.</span>
            <button
              onClick={() => setIsSupabaseModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#1E3A5F] text-emerald-300 border border-emerald-500/30 hover:border-emerald-400 cursor-pointer transition-colors shadow-xs"
              title="Click to view Supabase Backend Tables & Sync Status"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Supabase Backend: xbtxawcadgnmoxtjhwuc</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('/policies/privacy-policy')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>|</span>
            <button
              onClick={() => onNavigate('/policies/terms-of-service')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
