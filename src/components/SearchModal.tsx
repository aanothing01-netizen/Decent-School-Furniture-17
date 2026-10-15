import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowRight, Tag } from 'lucide-react';

interface SearchModalProps {
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onNavigate }) => {
  const { isSearchOpen, setIsSearchOpen } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
          p.material.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const handleSelect = (path: string) => {
    setIsSearchOpen(false);
    onNavigate(path);
  };

  const popularSearches = [
    'Student Desk',
    'Classroom Table',
    'School Bench',
    'Teacher Table',
    'Computer Lab',
    'School Locker',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-[#D9E2EC] overflow-hidden">
        {/* Search Bar Input */}
        <div className="p-4 border-b border-[#D9E2EC] flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search school desks, benches, library racks, lab furniture..."
            className="w-full text-base text-[#102A43] focus:outline-none placeholder-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600 rounded-lg cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results or Suggested Searches */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div className="py-4 space-y-4">
              <div>
                <p className="text-xs font-bold text-[#627D98] uppercase tracking-wider mb-2">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 bg-[#F7F9FC] hover:bg-amber-50 hover:text-[#D97706] hover:border-amber-300 border border-[#D9E2EC] rounded-lg text-xs font-medium text-[#486581] transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Tag className="w-3 h-3 text-[#F59E0B]" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-2 text-xs text-slate-400">
                Tip: Search by grade level (primary, university), product type (single desk, duo bench), or feature (chemical-resistant).
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center space-y-2">
              <p className="text-sm font-semibold text-[#102A43]">
                No matching furniture found for "{query}"
              </p>
              <p className="text-xs text-[#627D98]">
                Looking for custom dimensions or bulk tenders? Our engineering shop can manufacture any custom design.
              </p>
              <button
                onClick={() => handleSelect('/pages/custom-orders')}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#F59E0B] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
              >
                <span>Request Custom Furniture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs font-bold text-[#627D98] uppercase tracking-wider mb-2">
                Found {filtered.length} matching products
              </p>
              {filtered.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => handleSelect(`/products/${prod.handle}`)}
                  className="p-3 rounded-xl hover:bg-[#F7F9FC] border border-transparent hover:border-[#D9E2EC] transition-all flex items-center gap-4 cursor-pointer group"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.title}
                    className="w-14 h-14 object-cover rounded-lg border border-[#D9E2EC] shrink-0"
                  />
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold text-[#102A43] group-hover:text-[#F59E0B] transition-colors">
                      {prod.title}
                    </h4>
                    <p className="text-xs text-[#627D98] line-clamp-1">
                      {prod.categoryName} • {prod.material}
                    </p>
                    <span className="text-xs font-semibold text-[#D97706]">
                      {prod.isQuoteOnly ? 'Quote Only' : `PKR ${prod.price.toLocaleString()}`}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#102A43] group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
