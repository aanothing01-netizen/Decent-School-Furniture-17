import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  Plus,
  Minus,
  MessageCircle,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Armchair,
  Wrench,
  Users,
  Send,
  ArrowRight,
  Ruler,
  Layers,
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onNavigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onNavigate,
}) => {
  const {
    openQuoteModal,
    toggleWishlist,
    isInWishlist,
    getWhatsAppUrl,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: 'default',
      name: 'Standard',
      colorName: 'Standard',
      colorHex: '#1D4ED8',
      inStock: true,
      sku: 'STD-01',
    }
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping' | 'reviews'>('desc');

  const wishlisted = isInWishlist(product.id);
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 6);

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const productWhatsAppUrl = getWhatsAppUrl(
    `Hello! I want to inquire about *${product.title}* (SKU: ${selectedVariant.sku}). Quantity requested: ${quantity} units.`
  );

  return (
    <div className="space-y-12 pb-16">
      <SEO
        title={`${product.title} - Decent School Furniture`}
        description={`${product.shortDescription} High durability 16-gauge steel frame with factory warranty. Direct institutional quotation.`}
        image={product.images[0]}
        type="product"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.title,
          image: product.images,
          description: product.description,
          sku: selectedVariant.sku,
          brand: {
            '@type': 'Brand',
            name: 'Decent School Furniture',
          },
          offers: {
            '@type': 'Offer',
            url: typeof window !== 'undefined' ? window.location.href : '',
            priceCurrency: 'PKR',
            price: product.price > 0 ? String(product.price) : '0',
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
          },
        }}
      />
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-xs text-[#627D98]">
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-[#102A43] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => onNavigate('/collections/all')}
            className="hover:text-[#102A43] transition-colors cursor-pointer"
          >
            Products
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => onNavigate(`/collections/${product.category}`)}
            className="hover:text-[#102A43] transition-colors cursor-pointer"
          >
            {product.categoryName}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#102A43] font-bold line-clamp-1">
            {product.title}
          </span>
        </nav>
      </div>

      {/* Main Product Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Image Gallery Carousel */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-4/3 bg-slate-50 rounded-2xl border border-[#D9E2EC] overflow-hidden group shadow-sm">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`${product.title} view ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-[#F59E0B] text-white shadow-sm">
                    {product.badge}
                  </span>
                </div>
              )}
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#102A43] shadow-md flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#102A43] shadow-md flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails list */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#F59E0B] ring-2 ring-[#F59E0B]/30'
                        : 'border-[#D9E2EC] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Title, Price, Value Props, Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-md text-xs font-bold text-[#102A43] bg-slate-100 mb-3">
                {product.categoryName}
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-black text-[#102A43] tracking-tight">
                {product.title}
              </h1>
              <p className="text-sm text-[#486581] mt-2 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Price & Quote Tag */}
            <div className="flex items-baseline gap-3 pb-4 border-b border-slate-100">
              <span className="font-heading text-2xl sm:text-3xl font-black text-[#102A43]">
                {product.price > 0 ? `PKR ${product.price.toLocaleString()}` : 'PKR 0'}
              </span>
              {product.isQuoteOnly && (
                <span className="text-sm font-bold text-[#D97706] bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  (Quote Only)
                </span>
              )}
            </div>

            {/* 4 Value Prop Icons matching mockup */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
              <div className="p-3 bg-[#F7F9FC] rounded-xl border border-[#D9E2EC] text-center space-y-1">
                <ShieldCheck className="w-5 h-5 text-[#102A43] mx-auto" />
                <span className="block text-[11px] font-bold text-[#102A43]">
                  Durable Construction
                </span>
              </div>
              <div className="p-3 bg-[#F7F9FC] rounded-xl border border-[#D9E2EC] text-center space-y-1">
                <Armchair className="w-5 h-5 text-[#102A43] mx-auto" />
                <span className="block text-[11px] font-bold text-[#102A43]">
                  Ergonomic Design
                </span>
              </div>
              <div className="p-3 bg-[#F7F9FC] rounded-xl border border-[#D9E2EC] text-center space-y-1">
                <Wrench className="w-5 h-5 text-[#102A43] mx-auto" />
                <span className="block text-[11px] font-bold text-[#102A43]">
                  Low Maintenance
                </span>
              </div>
              <div className="p-3 bg-[#F7F9FC] rounded-xl border border-[#D9E2EC] text-center space-y-1">
                <Users className="w-5 h-5 text-[#102A43] mx-auto" />
                <span className="block text-[11px] font-bold text-[#102A43]">
                  Bulk Order Available
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#D9E2EC] rounded-xl overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 text-sm font-bold text-[#102A43] min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-[#627D98]">
                  Min. Order Quantity: <strong>{product.minOrderQuantity} units</strong>
                </span>
              </div>
            </div>

            {/* CTAs matching mockup */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => openQuoteModal(product, quantity)}
                  className="py-3.5 px-6 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Inquire Now</span>
                </button>
                <button
                  onClick={() => openQuoteModal(product, quantity)}
                  className="py-3.5 px-6 bg-white hover:bg-slate-50 border border-[#D9E2EC] hover:border-[#102A43] text-[#102A43] font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#486581]" />
                  <span>Get a Quote</span>
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="flex items-center justify-between pt-2">
                <a
                  href={productWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#16803C] hover:text-[#157134] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    wishlisted ? 'text-red-500 font-bold' : 'text-[#627D98] hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                  <span>{wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Highlights Bar (matching mockup) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-[#D9E2EC] p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#102A43] shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-[#102A43]">Quality Materials</h4>
              <p className="text-[11px] text-[#627D98]">Built for long-lasting use</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Armchair className="w-6 h-6 text-[#102A43] shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-[#102A43]">Comfortable Design</h4>
              <p className="text-[11px] text-[#627D98]">Supports better learning</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-[#102A43] shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-[#102A43]">Bulk Order Inquiries</h4>
              <p className="text-[11px] text-[#627D98]">For schools & institutions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Wrench className="w-6 h-6 text-[#102A43] shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-[#102A43]">Custom Furniture Options</h4>
              <p className="text-[11px] text-[#627D98]">Tailored to your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications & Details Grid Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side: Product Categories & Custom Solution Box */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-[#D9E2EC] p-5 shadow-xs">
              <h3 className="text-xs font-bold text-[#102A43] uppercase tracking-wider mb-3">
                Product Categories
              </h3>
              <div className="space-y-1">
                {CATEGORIES.map((c) => {
                  const isActive = c.handle === product.category;
                  return (
                    <button
                      key={c.id}
                      onClick={() => onNavigate(`/collections/${c.handle}`)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-amber-50 text-[#B45309] font-bold border-l-4 border-[#F59E0B]'
                          : 'text-[#486581] hover:bg-slate-50'
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="text-[10px] text-slate-400">({c.count})</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="bg-[#102A43] rounded-2xl p-6 text-white space-y-3">
              <h4 className="font-heading font-bold text-base">Need a Custom Solution?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We create furniture that fits your space, needs and budget.
              </p>
              <button
                onClick={() => onNavigate('/pages/custom-orders')}
                className="w-full py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Request a Quote →
              </button>
            </div>
          </div>

          {/* Middle & Right: Tabs & Details (Matching mockup) */}
          <div className="lg:col-span-9 bg-white rounded-2xl border border-[#D9E2EC] p-6 sm:p-8 shadow-xs space-y-6">
            {/* Tabs Header */}
            <div className="flex border-b border-[#D9E2EC] gap-6 text-sm font-bold">
              {[
                { id: 'desc', label: 'Description' },
                { id: 'specs', label: 'Specifications' },
                { id: 'shipping', label: 'Shipping & Returns' },
                { id: 'reviews', label: 'Reviews (0)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 transition-colors relative cursor-pointer ${
                    activeTab === tab.id
                      ? 'text-[#F59E0B] border-b-2 border-[#F59E0B]'
                      : 'text-[#627D98] hover:text-[#102A43]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
              <div className="lg:col-span-8 space-y-6">
                {activeTab === 'desc' && (
                  <div className="space-y-4">
                    <h3 className="font-heading text-lg font-bold text-[#102A43]">
                      Product Description
                    </h3>
                    <p className="text-xs sm:text-sm text-[#486581] leading-relaxed">
                      {product.description}
                    </p>
                    <div>
                      <h4 className="font-heading text-sm font-bold text-[#102A43] mb-3">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-[#243B53]">
                            <CheckCircle2 className="w-4 h-4 text-[#16803C] shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-4">
                    <h3 className="font-heading text-lg font-bold text-[#102A43]">
                      Technical Specifications
                    </h3>
                    <div className="divide-y divide-slate-100 border border-[#D9E2EC] rounded-xl overflow-hidden">
                      {Object.entries(product.specifications).map(([key, val]) => (
                        <div key={key} className="grid grid-cols-3 p-3 text-xs">
                          <span className="font-bold text-[#102A43]">{key}</span>
                          <span className="col-span-2 text-[#486581]">{val}</span>
                        </div>
                      ))}
                      <div className="grid grid-cols-3 p-3 text-xs bg-slate-50">
                        <span className="font-bold text-[#102A43]">Warranty</span>
                        <span className="col-span-2 text-[#486581] font-semibold">{product.warranty}</span>
                      </div>
                      <div className="grid grid-cols-3 p-3 text-xs">
                        <span className="font-bold text-[#102A43]">Lead Time</span>
                        <span className="col-span-2 text-[#486581]">{product.leadTime}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-3 text-xs sm:text-sm text-[#486581] leading-relaxed">
                    <h3 className="font-heading text-lg font-bold text-[#102A43]">
                      Institutional Shipping & Assembly
                    </h3>
                    <p>
                      Decent School Furniture provides nationwide logistics across Pakistan. Bulk consignments are delivered directly to your campus grounds using our dedicated commercial fleet.
                    </p>
                    <p>
                      Our assembly crew unloads, unboxes, positions, and levels the furniture in designated classrooms. Defective components or transit damage are replaced under our zero-hassle factory guarantee.
                    </p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4 text-xs sm:text-sm text-[#486581]">
                    <h3 className="font-heading text-lg font-bold text-[#102A43]">
                      Verified Institutional Reviews
                    </h3>
                    <p>
                      Reviews are collected from verified procurement officers and school administrators following project completion.
                    </p>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <p className="italic text-[#243B53]">
                        "Supplied 250 units for our senior campus. The welds, paint durability and ergonomic chairs are exceptional."
                      </p>
                      <span className="block mt-2 text-xs font-bold text-[#102A43]">
                        — Procurement Director, Beaconhouse Lahore
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Details Column: Colors, Material, Dimensions (Exact Mockup Match) */}
              <div className="lg:col-span-4 space-y-6 lg:border-l lg:border-slate-100 lg:pl-6">
                {/* Available Colors */}
                <div>
                  <h4 className="text-xs font-bold text-[#102A43] uppercase tracking-wider mb-3">
                    Available Colors
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                          selectedVariant.id === variant.id
                            ? 'scale-110 border-[#102A43] ring-2 ring-[#102A43]/20'
                            : 'border-white shadow-xs'
                        }`}
                        style={{ backgroundColor: variant.colorHex }}
                        title={variant.colorName}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-[#627D98] mt-2">
                    Selected: <strong>{selectedVariant.colorName}</strong>
                  </p>
                </div>

                {/* Material */}
                <div>
                  <h4 className="text-xs font-bold text-[#102A43] uppercase tracking-wider mb-2">
                    Material
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-[#243B53]">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-[#D9E2EC]">
                      <Layers className="w-4 h-4 text-[#486581]" />
                      <span>{product.material}</span>
                    </div>
                  </div>
                </div>

                {/* Dimensions */}
                <div>
                  <h4 className="text-xs font-bold text-[#102A43] uppercase tracking-wider mb-2">
                    Dimensions (Approx.)
                  </h4>
                  <div className="space-y-1.5 text-xs text-[#243B53]">
                    {product.dimensions.desk && (
                      <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-[#D9E2EC]">
                        <Ruler className="w-4 h-4 text-[#486581] shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-[#102A43]">Desk:</strong>
                          <span>{product.dimensions.desk}</span>
                        </div>
                      </div>
                    )}
                    {product.dimensions.chair && (
                      <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-[#D9E2EC]">
                        <Ruler className="w-4 h-4 text-[#486581] shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-[#102A43]">Chair:</strong>
                          <span>{product.dimensions.chair}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#102A43]">
              Related Products
            </h2>
            <p className="text-xs sm:text-sm text-[#486581]">
              You may also like these similar educational furniture products.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/collections/all')}
            className="text-xs font-bold text-[#102A43] hover:text-[#F59E0B] inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* Have Questions Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#102A43] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#243B53]">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-heading text-xl sm:text-2xl font-bold">
              Have Questions About This Product?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Our team is here to help. Get in touch for more details, pricing and customization options.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/pages/contact')}
            className="px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-xs sm:text-sm rounded-lg shadow-md transition-all cursor-pointer"
          >
            Contact Us →
          </button>
        </div>
      </section>
    </div>
  );
};
