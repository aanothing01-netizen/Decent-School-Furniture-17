import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import { Logo } from './Logo';
import {
  GraduationCap,
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Phone,
  User as UserIcon,
  LogOut,
  Sliders,
} from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const {
    user,
    cartCount,
    setIsCartDrawerOpen,
    wishlist,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setIsSearchOpen,
    openQuoteModal,
    setIsThemeInspectorOpen,
    themeSettings,
    logoutUser,
  } = useStore();

  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/pages/about' },
    { name: 'Projects', path: '/pages/projects' },
    { name: 'Custom Orders', path: '/pages/custom-orders' },
    { name: 'FAQs', path: '/pages/faqs' },
    { name: 'Contact', path: '/pages/contact' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
    setIsProductsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#D9E2EC] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Brand Logo */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center text-left group focus:outline-none focus:ring-2 focus:ring-[#102A43] rounded-lg p-1 transition-transform group-hover:scale-102 cursor-pointer"
          >
            <Logo variant="light" size="md" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => handleNavClick('/')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                currentPath === '/' ? 'text-[#F59E0B]' : 'text-[#243B53] hover:text-[#102A43]'
              }`}
            >
              Home
            </button>

            {/* Products Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                onMouseEnter={() => setIsProductsDropdownOpen(true)}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors cursor-pointer py-2 ${
                  currentPath.startsWith('/collections') || currentPath.startsWith('/products')
                    ? 'text-[#F59E0B]'
                    : 'text-[#243B53] hover:text-[#102A43]'
                }`}
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isProductsDropdownOpen ? 'rotate-180 text-[#F59E0B]' : 'text-[#627D98]'
                  }`}
                />
              </button>

              {/* Mega Dropdown Menu */}
              {isProductsDropdownOpen && (
                <div
                  onMouseLeave={() => setIsProductsDropdownOpen(false)}
                  className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-[#D9E2EC] p-3 animate-fade-in z-50"
                >
                  <div className="text-[11px] font-bold text-[#627D98] uppercase tracking-wider px-3 py-1.5">
                    Product Categories
                  </div>
                  <div className="space-y-1">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleNavClick(`/collections/${cat.handle}`)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F7F9FC] flex items-center justify-between text-sm text-[#243B53] hover:text-[#102A43] font-medium transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                          {cat.name}
                        </span>
                        <span className="text-xs text-[#627D98] bg-slate-100 px-2 py-0.5 rounded-full">
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-[#D9E2EC]">
                    <button
                      onClick={() => handleNavClick('/collections/all')}
                      className="w-full py-2 px-3 text-center text-xs font-bold text-[#102A43] bg-[#F7F9FC] hover:bg-[#102A43] hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Explore All Products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`text-sm font-semibold transition-colors cursor-pointer ${
                  currentPath === link.path ? 'text-[#F59E0B]' : 'text-[#243B53] hover:text-[#102A43]'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Inspector / Customizer toggle */}
            <button
              onClick={() => setIsThemeInspectorOpen(true)}
              className="p-2 text-[#486581] hover:text-[#102A43] hover:bg-[#F7F9FC] rounded-lg transition-colors cursor-pointer"
              title="Shopify Theme Customizer Simulator"
              aria-label="Customize Theme"
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-[#243B53] hover:text-[#102A43] hover:bg-[#F7F9FC] rounded-lg transition-colors cursor-pointer"
              title="Search products"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <button
              onClick={() => handleNavClick('/collections/all')}
              className="p-2.5 text-[#243B53] hover:text-[#102A43] hover:bg-[#F7F9FC] rounded-lg relative transition-colors cursor-pointer hidden sm:block"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#F59E0B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-2.5 text-[#243B53] hover:text-[#102A43] hover:bg-[#F7F9FC] rounded-lg relative transition-colors cursor-pointer"
              title="Shopping Cart & Quotation List"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-[#F59E0B] text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Sign In with Firebase */}
            {user ? (
              <div className="flex items-center gap-1.5 pl-1">
                <button
                  onClick={() => onNavigate('/account')}
                  className="flex items-center gap-2 p-1 hover:bg-[#F7F9FC] rounded-lg transition-colors cursor-pointer group"
                  title="View Customer Dashboard"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-7 h-7 rounded-full border border-[#D9E2EC]"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#102A43] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                      {(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <span className="hidden lg:inline text-xs font-semibold text-[#102A43] group-hover:text-[#F59E0B] transition-colors max-w-[100px] truncate">
                    {user.displayName?.split(' ')[0] || 'Account'}
                  </span>
                </button>
                <button
                  onClick={logoutUser}
                  className="p-1.5 text-slate-400 hover:text-red-500 rounded-md transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('/account/login')}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#102A43] hover:bg-[#F7F9FC] border border-[#D9E2EC] rounded-lg transition-colors cursor-pointer hover:border-[#102A43]"
                title="Customer Login / Register"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Sign In</span>
              </button>
            )}

            {/* Primary CTA: "Get a Quote" */}
            <button
              onClick={() => openQuoteModal()}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer transform active:scale-95"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#243B53] hover:bg-[#F7F9FC] rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#D9E2EC] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('/')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#243B53] hover:bg-[#F7F9FC]"
            >
              Home
            </button>
            <div className="py-2 px-3">
              <div className="text-xs font-bold text-[#627D98] uppercase tracking-wider mb-2">
                Products & Categories
              </div>
              <div className="pl-2 space-y-1 border-l-2 border-[#D9E2EC]">
                <button
                  onClick={() => handleNavClick('/collections/all')}
                  className="w-full text-left py-1 text-sm font-bold text-[#102A43]"
                >
                  All Products
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleNavClick(`/collections/${c.handle}`)}
                    className="w-full text-left py-1 text-xs text-[#486581] hover:text-[#102A43]"
                  >
                    {c.name} ({c.count})
                  </button>
                ))}
              </div>
            </div>
            {navLinks.slice(1).map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#243B53] hover:bg-[#F7F9FC]"
              >
                {link.name}
              </button>
            ))}
            {user ? (
              <button
                onClick={() => handleNavClick('/account')}
                className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#102A43] bg-slate-100/70 hover:bg-[#F7F9FC] flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-[#F59E0B]" />
                  <span>My Account ({user.displayName?.split(' ')[0] || 'User'})</span>
                </span>
                <span className="text-xs text-[#829AB1]">Dashboard →</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('/account/login')}
                className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#102A43] bg-slate-100/70 hover:bg-[#F7F9FC] flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-[#F59E0B]" />
                  <span>Customer Login / Register</span>
                </span>
                <span className="text-xs text-[#829AB1]">Sign In →</span>
              </button>
            )}
          </div>
          <div className="pt-3 border-t border-[#D9E2EC] space-y-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openQuoteModal();
              }}
              className="w-full py-3 bg-[#F59E0B] text-white font-bold rounded-lg text-center shadow-md flex items-center justify-center gap-2"
            >
              <span>Get an Institutional Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`tel:${themeSettings.phone}`}
              className="w-full py-2 text-center text-xs font-bold text-[#486581] flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {themeSettings.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
