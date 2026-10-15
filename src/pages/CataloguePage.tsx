import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';
import {
  Search,
  ChevronRight,
  ShieldCheck,
  Armchair,
  Wrench,
  Grid3X3,
  List,
  RotateCcw,
  ArrowRight,
  Check,
} from 'lucide-react';

interface CataloguePageProps {
  initialCategory?: string;
  onNavigate: (path: string) => void;
}

export const CataloguePage: React.FC<CataloguePageProps> = ({
  initialCategory,
  onNavigate,
}) => {
  const { openQuoteModal } = useStore();
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'all'
  );
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  const currentCategoryData = CATEGORIES.find((c) => c.handle === selectedCategory);
  const materialsList = ['Wood', 'Metal', 'Plastic', 'MDF', 'Combination'];
  const colorsList = [
    { name: 'Royal Blue', hex: '#1D4ED8' },
    { name: 'Charcoal Black', hex: '#1E293B' },
    { name: 'Silver Grey', hex: '#CBD5E1' },
    { name: 'Light Birch', hex: '#FDE68A' },
    { name: 'Amber Orange', hex: '#F59E0B' },
  ];

  const handleClearFilters = () => {
    setSearchFilter('');
    setSelectedCategory('all');
    setSelectedMaterial('all');
    setSelectedColor('all');
    setAvailabilityFilter('all');
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search
      if (
        searchFilter.trim() &&
        !p.title.toLowerCase().includes(searchFilter.toLowerCase()) &&
        !p.shortDescription.toLowerCase().includes(searchFilter.toLowerCase()) &&
        !p.categoryName.toLowerCase().includes(searchFilter.toLowerCase())
      ) {
        return false;
      }
      // Material
      if (selectedMaterial !== 'all') {
        if (!p.material.toLowerCase().includes(selectedMaterial.toLowerCase())) {
          return false;
        }
      }
      // Color
      if (selectedColor !== 'all') {
        const hasColor = p.variants.some((v) =>
          v.colorName.toLowerCase().includes(selectedColor.toLowerCase())
        );
        if (!hasColor) return false;
      }
      // Availability
      if (availabilityFilter === 'quote-only' && !p.isQuoteOnly) return false;
      if (availabilityFilter === 'in-stock' && p.isQuoteOnly) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [
    selectedCategory,
    searchFilter,
    selectedMaterial,
    selectedColor,
    availabilityFilter,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-10 pb-16">
      <SEO
        title={currentCategoryData ? `${currentCategoryData.name} - School Furniture Catalogue` : 'Products Catalogue - School Desks, Chairs & Benches'}
        description={currentCategoryData ? currentCategoryData.description : 'Explore our comprehensive school furniture catalogue: student desks, classroom tables, steel benches, lab workstations, and teacher desks in Pakistan.'}
      />
      {/* Catalogue Header & Classroom Banner */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#243B53] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-4">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => {
                setSelectedCategory('all');
                onNavigate('/collections/all');
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Products
            </button>
            {selectedCategory !== 'all' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[#F59E0B] font-semibold">
                  {currentCategoryData?.name || selectedCategory}
                </span>
              </>
            )}
          </nav>

          <div className="max-w-3xl space-y-3">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {currentCategoryData ? currentCategoryData.name : 'Products Catalogue'}
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {currentCategoryData
                ? currentCategoryData.description
                : 'Explore our wide range of high-quality school furniture designed for comfort, durability and better learning environments across Pakistan.'}
            </p>
          </div>

          {/* Value Props Bar */}
          <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#F59E0B]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-white font-bold">Durable Materials</strong>
                <span className="text-slate-300">Built for long-lasting heavy school use</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#F59E0B]">
                <Armchair className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-white font-bold">Ergonomic Designs</strong>
                <span className="text-slate-300">Supports active learning and posture</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#F59E0B]">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-white font-bold">Custom Options</strong>
                <span className="text-slate-300">Tailored to your campus specifications</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalogue Layout: Sidebar + Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#D9E2EC] p-6 shadow-xs space-y-6">
              {/* Search Products */}
              <div>
                <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => {
                      setSearchFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search for products..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#102A43] uppercase tracking-wider">
                    Categories
                  </span>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center justify-between text-xs cursor-pointer p-1.5 rounded hover:bg-slate-50">
                    <span className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === 'all'}
                        onChange={() => {
                          setSelectedCategory('all');
                          setCurrentPage(1);
                        }}
                        className="text-[#102A43] focus:ring-[#102A43]"
                      />
                      <span className={selectedCategory === 'all' ? 'font-bold text-[#102A43]' : 'text-[#486581]'}>
                        All Products
                      </span>
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      ({PRODUCTS.length})
                    </span>
                  </label>
                  {CATEGORIES.map((c) => (
                    <label
                      key={c.id}
                      className="flex items-center justify-between text-xs cursor-pointer p-1.5 rounded hover:bg-slate-50"
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === c.handle}
                          onChange={() => {
                            setSelectedCategory(c.handle);
                            setCurrentPage(1);
                          }}
                          className="text-[#102A43] focus:ring-[#102A43]"
                        />
                        <span
                          className={
                            selectedCategory === c.handle
                              ? 'font-bold text-[#102A43]'
                              : 'text-[#486581]'
                          }
                        >
                          {c.name}
                        </span>
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">
                        ({c.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Swatches */}
              <div className="pt-4 border-t border-slate-100">
                <span className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-2">
                  Color Options
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSelectedColor('all');
                      setCurrentPage(1);
                    }}
                    className={`w-7 h-7 rounded-full text-[10px] font-bold border transition-all flex items-center justify-center cursor-pointer ${
                      selectedColor === 'all'
                        ? 'border-[#102A43] bg-[#102A43] text-white'
                        : 'border-[#D9E2EC] bg-slate-100 text-[#486581]'
                    }`}
                    title="All Colors"
                  >
                    All
                  </button>
                  {colorsList.map((col) => (
                    <button
                      key={col.name}
                      onClick={() => {
                        setSelectedColor(selectedColor === col.name ? 'all' : col.name);
                        setCurrentPage(1);
                      }}
                      className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center border-2 cursor-pointer ${
                        selectedColor === col.name ? 'scale-110 border-[#102A43]' : 'border-white shadow-xs'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {selectedColor === col.name && (
                        <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div className="pt-4 border-t border-slate-100">
                <span className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-2">
                  Material
                </span>
                <div className="space-y-1.5">
                  {materialsList.map((mat) => (
                    <label
                      key={mat}
                      className="flex items-center gap-2 text-xs text-[#486581] cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="material"
                        checked={selectedMaterial === mat}
                        onChange={() => {
                          setSelectedMaterial(selectedMaterial === mat ? 'all' : mat);
                          setCurrentPage(1);
                        }}
                        className="text-[#102A43] focus:ring-[#102A43]"
                      />
                      <span>{mat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="pt-4 border-t border-slate-100">
                <span className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-2">
                  Availability
                </span>
                <div className="space-y-1.5 text-xs text-[#486581]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="avail"
                      checked={availabilityFilter === 'all'}
                      onChange={() => setAvailabilityFilter('all')}
                      className="text-[#102A43]"
                    />
                    <span>All Items</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="avail"
                      checked={availabilityFilter === 'quote-only'}
                      onChange={() => setAvailabilityFilter('quote-only')}
                      className="text-[#102A43]"
                    />
                    <span>Quote Only</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters Button */}
              <div className="pt-2">
                <button
                  onClick={handleClearFilters}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-[#243B53] text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Filters</span>
                </button>
              </div>
            </div>

            {/* Custom Solution Callout */}
            <div className="bg-gradient-to-br from-[#102A43] to-[#243B53] rounded-2xl p-6 text-white space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#F59E0B]">
                Tailored Dimensions
              </span>
              <h4 className="font-heading font-bold text-base">
                Need a Custom Solution?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We create customized furniture that fits your specific classroom space, grade levels and institutional layout.
              </p>
              <button
                onClick={() => onNavigate('/pages/custom-orders')}
                className="w-full py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Request a Custom Quote
              </button>
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Control Bar: Result count & Sort & View toggle */}
            <div className="bg-white rounded-2xl border border-[#D9E2EC] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="text-xs font-semibold text-[#486581]">
                Showing{' '}
                <strong className="text-[#102A43]">
                  {filteredProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}–
                  {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
                </strong>{' '}
                of <strong className="text-[#102A43]">{filteredProducts.length}</strong> products
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-1.5 border border-[#D9E2EC] rounded-lg text-xs font-semibold text-[#243B53] focus:outline-none focus:ring-1 focus:ring-[#102A43]"
                  >
                    <option value="featured">Featured</option>
                    <option value="name">Product Name (A-Z)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                  </select>
                </div>
                <div className="flex items-center border border-[#D9E2EC] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 cursor-pointer ${viewMode === 'grid' ? 'bg-[#102A43] text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                    title="Grid View"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 cursor-pointer ${viewMode === 'list' ? 'bg-[#102A43] text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Listing */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#D9E2EC] p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#102A43]">
                  No products matched your criteria
                </h3>
                <p className="text-xs text-[#627D98] max-w-md mx-auto">
                  Try clearing your search query or selecting a different category from the sidebar. You can also request custom institutional furniture manufacturing.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-5 py-2.5 bg-[#102A43] hover:bg-[#243B53] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} onNavigate={onNavigate} />
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {paginatedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white rounded-2xl border border-[#D9E2EC] p-4 flex flex-col sm:flex-row gap-5 hover:shadow-md transition-shadow"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.title}
                      className="w-full sm:w-48 h-36 object-cover rounded-xl border border-[#D9E2EC] shrink-0"
                    />
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#F59E0B] bg-amber-50 px-2 py-0.5 rounded">
                            {prod.categoryName}
                          </span>
                          {prod.badge && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                              {prod.badge}
                            </span>
                          )}
                        </div>
                        <h3
                          onClick={() => onNavigate(`/products/${prod.handle}`)}
                          className="font-heading text-lg font-bold text-[#102A43] hover:text-[#F59E0B] transition-colors mt-1 cursor-pointer"
                        >
                          {prod.title}
                        </h3>
                        <p className="text-xs text-[#627D98] mt-1 leading-relaxed line-clamp-2">
                          {prod.description}
                        </p>
                        <p className="text-xs text-[#486581] font-medium mt-1">
                          Material: {prod.material}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                        <span className="font-heading font-black text-base text-[#102A43]">
                          {prod.isQuoteOnly ? 'PKR 0 (Quote Only)' : `PKR ${prod.price.toLocaleString()}`}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openQuoteModal(prod)}
                            className="px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            Inquire Now
                          </button>
                          <button
                            onClick={() => onNavigate(`/products/${prod.handle}`)}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#102A43] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-6 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-[#F59E0B] text-white shadow-sm'
                          : 'bg-white text-[#243B53] border border-[#D9E2EC] hover:bg-slate-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#102A43] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#243B53]">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-heading text-2xl font-bold">
              Need Custom Furniture or Bulk Order?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Get a personalized quotation and 3D layout recommendations for your school, college, or university campus.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/pages/custom-orders')}
            className="px-8 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
