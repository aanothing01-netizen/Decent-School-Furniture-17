import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FAQS } from '../data/faqs';
import { ChevronRight, ChevronDown, Search, MessageCircle } from 'lucide-react';
import { SEO } from '../components/SEO';

interface FaqsPageProps {
  onNavigate: (path: string) => void;
}

export const FaqsPage: React.FC<FaqsPageProps> = ({ onNavigate }) => {
  const { openQuoteModal, getWhatsAppUrl } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);

  const categories = ['All', 'Orders & Quotes', 'Delivery & Shipping', 'Customization', 'Materials & Warranty', 'Billing & Payment', 'Lead Times'];

  const filteredFaqs = FAQS.filter((faq) => {
    if (activeCategory !== 'All' && faq.category !== activeCategory) return false;
    if (
      searchTerm.trim() &&
      !faq.question.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  return (
    <div className="space-y-12 pb-16">
      <SEO
        title="Frequently Asked Questions - Decent School Furniture"
        description="Get answers about educational furniture orders, bulk minimum quantities, 3-5 year structural warranties, and nationwide delivery to schools across Pakistan."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
        }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#243B53] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-300 mb-2">
            <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#F59E0B] font-semibold">FAQs</span>
          </nav>
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
            Help & Knowledge Base
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Find immediate answers regarding school furniture tenders, bulk discounts, custom sizes, lead times and nationwide delivery across Pakistan.
          </p>
          <div className="pt-4 max-w-lg mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by keyword (e.g. MOQ, delivery, warranty, custom)..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-slate-800 text-sm focus:outline-none shadow-lg placeholder-slate-400"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === c
                  ? 'bg-[#102A43] text-white shadow-sm'
                  : 'bg-white text-[#486581] hover:bg-slate-100 border border-[#D9E2EC]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* FAQs List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#D9E2EC] p-8 text-center text-sm text-[#486581]">
              No questions found matching your search term. Feel free to contact our support team directly.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-[#D9E2EC] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-[#102A43] hover:text-[#F59E0B] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#F59E0B]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#486581] leading-relaxed border-t border-slate-100 bg-[#F7F9FC]/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Need Assistance Banner */}
        <div className="bg-white rounded-2xl border border-[#D9E2EC] p-8 text-center space-y-4 shadow-sm">
          <h3 className="font-heading text-xl font-bold text-[#102A43]">
            Still Have Questions?
          </h3>
          <p className="text-xs text-[#627D98] max-w-md mx-auto">
            Our procurement team is ready to evaluate your layout blueprints, provide sample chairs, or prepare an itemized tender quotation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => openQuoteModal()}
              className="px-6 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-xs rounded-lg shadow-sm cursor-pointer"
            >
              Request a Quote
            </button>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 bg-[#16803C] hover:bg-[#157134] text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
