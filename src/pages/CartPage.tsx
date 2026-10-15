import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ChevronRight,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Send,
  Truck,
  FileText,
} from 'lucide-react';
import { SEO } from '../components/SEO';

interface CartPageProps {
  onNavigate: (path: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    openQuoteModal,
  } = useStore();

  const [orderNotes, setOrderNotes] = useState('');
  const [showShopifyNotice, setShowShopifyNotice] = useState(false);

  const handleCheckoutClick = () => {
    setShowShopifyNotice(true);
  };

  return (
    <div className="space-y-12 pb-16">
      <SEO
        title="Your Cart & Quotation Order - Decent School Furniture"
        description="Review selected school furniture items, specify project quantities, and generate an official stamped institutional quotation."
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#243B53] text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-2">
            <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#F59E0B] font-semibold">Shopping Cart</span>
          </nav>
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white">
            Your Cart & Quotation Order
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            Review your selected educational furniture pieces, adjust quantities, or request an official stamped institutional quotation.
          </p>
        </div>
      </section>

      {/* Cart Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#D9E2EC] p-12 text-center max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-xl font-bold text-[#102A43]">
              Your Cart is Currently Empty
            </h2>
            <p className="text-xs sm:text-sm text-[#627D98]">
              Browse our student desks, classroom benches, teacher tables and custom lab workstations to configure your school layout.
            </p>
            <button
              onClick={() => onNavigate('/collections/all')}
              className="px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Explore Products Catalogue
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Items Table */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-[#D9E2EC] p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-sm font-bold text-[#102A43]">
                  {cartCount} Furniture Item{cartCount > 1 ? 's' : ''} Selected
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.variant?.id}`} className="py-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-24 h-24 object-cover rounded-xl border border-[#D9E2EC] shrink-0"
                    />
                    <div className="flex-grow space-y-1">
                      <div className="flex items-start justify-between">
                        <h3
                          onClick={() => onNavigate(`/products/${item.product.handle}`)}
                          className="font-heading font-bold text-base text-[#102A43] hover:text-[#F59E0B] transition-colors cursor-pointer"
                        >
                          {item.product.title}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.variant?.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#627D98]">
                        Category: {item.product.categoryName} • Variant: {item.variant?.name || 'Standard'}
                      </p>
                      <p className="text-xs font-semibold text-[#D97706]">
                        {item.product.isQuoteOnly ? 'Quote Only Product' : `PKR ${item.product.price.toLocaleString()}`}
                      </p>
                      {/* Quantity Controller */}
                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center border border-[#D9E2EC] rounded-lg overflow-hidden bg-slate-50">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1, item.variant?.id)
                            }
                            className="p-1.5 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-4 text-xs font-bold text-[#102A43]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1, item.variant?.id)
                            }
                            className="p-1.5 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-xs text-slate-500">
                          {item.product.price > 0
                            ? `Total: PKR ${(item.product.price * item.quantity).toLocaleString()}`
                            : 'Factory Quote Item'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Order Notes / Tender Specs */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-2">
                  Add Special Instructions or Tender Delivery Dates
                </label>
                <textarea
                  rows={3}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Please quote delivery to Islamabad campus before August 15th..."
                  className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#102A43]"
                />
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl border border-[#D9E2EC] p-6 shadow-xs space-y-5">
                <h3 className="font-heading text-lg font-bold text-[#102A43] pb-3 border-b border-slate-100">
                  Order & Quotation Summary
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-[#486581]">
                    <span>Items Count:</span>
                    <span className="font-bold text-[#102A43]">{cartCount} units</span>
                  </div>
                  <div className="flex justify-between text-[#486581]">
                    <span>Standard Pricing Total:</span>
                    <span className="font-bold text-[#102A43]">
                      {cartSubtotal > 0 ? `PKR ${cartSubtotal.toLocaleString()}` : 'Quote Only'}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#486581]">
                    <span>Institutional Volume Discount:</span>
                    <span className="font-bold text-[#16803C]">Calculated on Quote</span>
                  </div>
                  <div className="flex justify-between text-[#486581]">
                    <span>Tax (GST / STRN):</span>
                    <span className="font-bold text-[#102A43]">Official Invoiced</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <button
                    onClick={() => openQuoteModal()}
                    className="w-full py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Request Stamped Quotation</span>
                  </button>
                  <button
                    onClick={handleCheckoutClick}
                    className="w-full py-3 bg-[#102A43] hover:bg-[#243B53] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Proceed to Shopify Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Shopify Checkout Notice Modal/Box */}
                {showShopifyNotice && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2 text-xs text-blue-900 animate-fade-in">
                    <div className="flex items-center gap-1.5 font-bold text-[#102A43]">
                      <ShieldCheck className="w-4 h-4 text-blue-700" />
                      <span>Shopify Online Store 2.0 Native Checkout</span>
                    </div>
                    <p className="leading-relaxed">
                      In production on Shopify, clicking Checkout directs to <code>/checkout</code> powered by Shopify's PCI-DSS compliant checkout engine. For institutional orders, schools typically select "Request an Official Quote" or invoice payment.
                    </p>
                    <button
                      onClick={() => setShowShopifyNotice(false)}
                      className="text-xs font-bold text-blue-700 underline cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 space-y-2 text-[11px] text-[#627D98]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#16803C]" />
                    <span>3 to 5-Year Factory Structural Warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#102A43]" />
                    <span>Nationwide Delivery to All Cities in Pakistan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#D97706]" />
                    <span>Official NTN & Sales Tax Invoices</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
