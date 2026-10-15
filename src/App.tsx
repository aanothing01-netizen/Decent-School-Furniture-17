import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { StoreProvider } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuotationModal } from './components/QuotationModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ThemeInspectorModal } from './components/ThemeInspectorModal';
import { SupabaseSyncModal } from './components/SupabaseSyncModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Toast } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { CataloguePage } from './pages/CataloguePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CustomOrdersPage } from './pages/CustomOrdersPage';
import { AboutPage } from './pages/AboutPage';
import { FaqsPage } from './pages/FaqsPage';
import { ContactPage } from './pages/ContactPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { CustomerAccountPage } from './pages/CustomerAccountPage';
import { PRODUCTS } from './data/products';

// Helper to extract base path (e.g. "/Decent-School-Furniture-12") on subpath deployments like GitHub Pages
export function getRepoBase(): string {
  if (typeof window === 'undefined') return '';
  const pathname = window.location.pathname || '';
  const appRoutes = ['/collections', '/products', '/pages', '/policies', '/cart', '/account'];
  const match = pathname.match(/^(\/[^/]+)/);
  if (match) {
    const firstSegment = match[1];
    if (firstSegment && !appRoutes.includes(firstSegment)) {
      return firstSegment;
    }
  }
  return '';
}

export function getNormalizedPath(): string {
  if (typeof window === 'undefined') return '/';
  if (window.location.hash) {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash.startsWith('/')) return hash;
    return '/' + hash;
  }
  const rawPath = window.location.pathname || '/';
  const base = getRepoBase();
  if (base && rawPath.startsWith(base)) {
    const stripped = rawPath.slice(base.length);
    return stripped.startsWith('/') ? stripped : '/' + stripped;
  }
  return rawPath || '/';
}

export function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return getNormalizedPath();
  });

  const navigate = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : '/' + path;
    const base = getRepoBase();
    const targetUrl = base ? `${base}${cleanPath}` : cleanPath;

    setCurrentPath(cleanPath);
    try {
      window.history.pushState({}, '', targetUrl);
    } catch {
      window.location.hash = cleanPath;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getNormalizedPath());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Determine which page to render
  const renderPage = () => {
    const path = currentPath.length > 1 && currentPath.endsWith('/')
      ? currentPath.slice(0, -1)
      : currentPath;

    // 1. Home
    if (path === '/' || path === '') {
      return <HomePage onNavigate={navigate} />;
    }

    // 2. Catalogue (All Products)
    if (path === '/collections/all' || path === '/collections' || path === '/products') {
      return <CataloguePage initialCategory="all" onNavigate={navigate} />;
    }

    // 3. Category Specific Collections
    if (path.startsWith('/collections/')) {
      const categoryHandle = path.replace('/collections/', '');
      return <CataloguePage initialCategory={categoryHandle} onNavigate={navigate} />;
    }

    // 4. Product Details
    if (path.startsWith('/products/')) {
      const handle = path.replace('/products/', '');
      const product = PRODUCTS.find((p) => p.handle === handle) || PRODUCTS[0];
      return <ProductDetailPage product={product} onNavigate={navigate} />;
    }

    // 5. About Us
    if (path === '/pages/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    // 6. Projects & Gallery
    if (path === '/pages/projects') {
      return <ProjectsPage onNavigate={navigate} />;
    }

    // 7. Custom Orders
    if (path === '/pages/custom-orders') {
      return <CustomOrdersPage onNavigate={navigate} />;
    }

    // 8. FAQs
    if (path === '/pages/faqs') {
      return <FaqsPage onNavigate={navigate} />;
    }

    // 9. Contact Us
    if (path === '/pages/contact') {
      return <ContactPage onNavigate={navigate} />;
    }

    // 10. Privacy Policy
    if (path === '/policies/privacy-policy') {
      return <PoliciesPage initialTab="privacy" onNavigate={navigate} />;
    }

    // 11. Terms and Conditions
    if (path === '/policies/terms-of-service') {
      return <PoliciesPage initialTab="terms" onNavigate={navigate} />;
    }

    // 12. Cart Page
    if (path === '/cart') {
      return <CartPage onNavigate={navigate} />;
    }

    // 13. Customer Authentication & Account Portal
    if (path === '/account/login') {
      return <LoginPage onNavigate={navigate} />;
    }
    if (path === '/account/register') {
      return <RegisterPage onNavigate={navigate} />;
    }
    if (path === '/account/recover' || path === '/account/forgot-password') {
      return <ForgotPasswordPage onNavigate={navigate} />;
    }
    if (
      path === '/account' ||
      path === '/account/orders' ||
      path === '/account/quotations'
    ) {
      return <CustomerAccountPage onNavigate={navigate} />;
    }

    // Fallback: 404
    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#243B53]">
      {/* Top Announcement Bar */}
      <AnnouncementBar onNavigate={navigate} />

      {/* Main Header */}
      <Header currentPath={currentPath} onNavigate={navigate} />

      {/* Main Body */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Modals & Overlays */}
      <QuotationModal />
      <CartDrawer onNavigate={navigate} />
      <SearchModal onNavigate={navigate} />
      <ThemeInspectorModal />
      <SupabaseSyncModal />
      <FloatingWhatsApp />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </HelmetProvider>
  );
}
