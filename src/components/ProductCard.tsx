import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Heart, Send } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onNavigate: (path: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const { openQuoteModal, toggleWishlist, isInWishlist } = useStore();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group bg-white rounded-2xl border border-[#D9E2EC] overflow-hidden hover:border-[#102A43]/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-4/3 bg-slate-50 overflow-hidden cursor-pointer" onClick={() => onNavigate(`/products/${product.handle}`)}>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span
              className={`px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider shadow-sm ${
                product.badge === 'Popular'
                  ? 'bg-[#F59E0B] text-white'
                  : product.badge === 'New'
                  ? 'bg-[#1D4ED8] text-white'
                  : product.badge === 'Best Seller'
                  ? 'bg-[#102A43] text-white'
                  : 'bg-[#16803C] text-white'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}
        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            wishlisted
              ? 'bg-red-50 text-red-500 shadow-sm'
              : 'bg-white/80 text-slate-500 hover:text-red-500 hover:bg-white'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>
        {/* Category tag */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-[#486581] px-2 py-0.5 rounded shadow-xs">
            {product.categoryName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="cursor-pointer mb-2" onClick={() => onNavigate(`/products/${product.handle}`)}>
          <h3 className="font-heading text-lg font-bold text-[#102A43] group-hover:text-[#F59E0B] transition-colors line-clamp-1">
            {product.title}
          </h3>
          <p className="text-xs text-[#627D98] mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Quote Only Indicator */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-black text-base text-[#102A43]">
              PKR {product.price.toLocaleString()}
            </span>
            {product.isQuoteOnly && (
              <span className="text-xs font-semibold text-[#D97706]">
                (Quote Only)
              </span>
            )}
          </div>
        </div>

        {/* Actions matching mockup */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-1">
          <button
            type="button"
            onClick={() => openQuoteModal(product)}
            className="py-2.5 px-3 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Send className="w-3 h-3" />
            <span>Inquire Now</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate(`/products/${product.handle}`)}
            className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-[#D9E2EC] hover:border-[#102A43]/40 text-[#243B53] text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3 text-[#627D98]" />
          </button>
        </div>
      </div>
    </div>
  );
};
