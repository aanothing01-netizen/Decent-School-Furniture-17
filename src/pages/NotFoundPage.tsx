import React from 'react';
import { CATEGORIES } from '../data/products';
import { Home, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-8">
      <SEO
        title="Page Not Found (404) - Decent School Furniture"
        description="The school furniture page or resource you requested could not be found. Browse our classroom desks, chairs, and campus bench collections."
      />
      <div className="space-y-3">
        <span className="font-mono text-7xl sm:text-8xl font-black text-[#102A43]/20">
          404
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#102A43]">
          Page Not Found
        </h1>
        <p className="text-sm text-[#486581] max-w-md mx-auto leading-relaxed">
          The educational furniture page or document you're looking for might have been moved, renamed, or is currently being updated in our 2026 catalogue.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-3 bg-[#102A43] hover:bg-[#243B53] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Back to Homepage</span>
        </button>
        <button
          onClick={() => onNavigate('/collections/all')}
          className="px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Explore Products Catalogue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="pt-8 border-t border-[#D9E2EC]">
        <h3 className="text-xs font-bold text-[#102A43] uppercase tracking-wider mb-4">
          Browse Popular Furniture Categories
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => onNavigate(`/collections/${c.handle}`)}
              className="px-4 py-2 bg-white hover:bg-slate-50 border border-[#D9E2EC] rounded-lg text-xs font-semibold text-[#243B53] transition-colors cursor-pointer"
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
