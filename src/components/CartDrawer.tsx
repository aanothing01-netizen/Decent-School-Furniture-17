import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Send,
} from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (path: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    openQuoteModal,
  } = useStore();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="p-5 border-b border-[#D9E2EC] flex items-center justify-between bg-[#F7F9FC]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#102A43]" />
            <h2 className="font-heading font-black text-lg text-[#102A43]">
              Your Inquiry & Order Cart
            </h2>
            <span className="text-xs bg-[#102A43] text-white px-2 py-0.5 rounded-full font-bold">
              {cartCount}
            </span>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-2 text-slate-500 hover:text-[#102A43] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-grow overflow-y-auto p-5 divide-y divide-slate-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-[#102A43]">
                Your cart is empty
              </h3>
              <p className="text-xs text-[#627D98] max-w-xs">
                Explore our durable school desks, benches, and classroom furniture catalogue to build your quote.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  onNavigate('/collections/all');
                }}
                className="px-5 py-2.5 bg-[#102A43] text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[#243B53] transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.product.id}-${item.variant?.id}`} className="py-4 flex gap-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-20 h-20 object-cover rounded-xl border border-[#D9E2EC] shrink-0"
                />
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-[#102A43] line-clamp-1">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.variant?.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {item.variant && (
                      <p className="text-xs text-[#486581] mt-0.5">
                        Color: {item.variant.name}
                      </p>
                    )}
                    <p className="text-xs font-semibold text-[#F59E0B] mt-1">
                      {item.product.price > 0
                        ? `PKR ${item.product.price.toLocaleString()}`
                        : 'PKR 0 (Quote Only)'}
                    </p>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#D9E2EC] rounded-lg overflow-hidden bg-slate-50">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1, item.variant?.id)
                        }
                        className="p-1.5 hover:bg-slate-200 text-slate-700 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#102A43]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1, item.variant?.id)
                        }
                        className="p-1.5 hover:bg-slate-200 text-slate-700 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      Subtotal: {item.product.price > 0 ? `PKR ${(item.product.price * item.quantity).toLocaleString()}` : 'Quote Rate'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#D9E2EC] bg-[#F7F9FC] space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#486581] font-medium">Estimated Subtotal:</span>
              <span className="text-base font-black text-[#102A43]">
                {cartSubtotal > 0 ? `PKR ${cartSubtotal.toLocaleString()}` : 'Quote Only Catalog'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#16803C] font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Direct factory warranty & official institutional tax invoices</span>
            </div>
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  openQuoteModal();
                }}
                className="w-full py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white text-sm font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Request Quotation for Cart Items</span>
              </button>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  onNavigate('/cart');
                }}
                className="w-full py-2.5 bg-white border border-[#D9E2EC] hover:bg-slate-50 text-[#102A43] text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
              >
                <span>View Full Cart Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
