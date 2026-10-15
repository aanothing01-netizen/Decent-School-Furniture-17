import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { PROJECTS, TESTIMONIALS } from '../data/projects';
import { FAQS } from '../data/faqs';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Armchair,
  CheckCircle2,
  Users,
  ChevronDown,
  Phone,
  MessageCircle,
  Truck,
  Award,
  Clock,
  Eye,
  Wrench,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { openQuoteModal, setLightboxImage, getWhatsAppUrl } = useStore();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeProjectTab, setActiveProjectTab] = useState<string>('All');

  const featuredProducts = PRODUCTS.slice(0, 6);

  const trustHighlights = [
    {
      icon: ShieldCheck,
      title: 'Durable Materials',
      description: 'Built for long-lasting use with 16-gauge steel and laminated tops.',
    },
    {
      icon: Armchair,
      title: 'Comfortable Designs',
      description: 'Supports better posture, active learning, and classroom focus.',
    },
    {
      icon: Users,
      title: 'Bulk Order Inquiries',
      description: 'Direct factory pricing for schools, colleges & institutions.',
    },
    {
      icon: Wrench,
      title: 'Custom Furniture Options',
      description: 'Tailored dimensions, colors, and spatial lab setups.',
    },
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: '20+ Years Manufacturing Excellence',
      description: 'Over two decades equipping primary schools, elite private institutions, and state universities across Pakistan.',
    },
    {
      icon: ShieldCheck,
      title: 'Child-Safe & Ergonomic Standards',
      description: 'Smooth rounded PVC corners, lead-free non-toxic electrostatic paints, and posture-friendly seat contours.',
    },
    {
      icon: Clock,
      title: 'Timely Turnkey Delivery',
      description: 'Dependable production schedules ensuring classrooms are fully installed and leveled before the school term begins.',
    },
    {
      icon: Truck,
      title: 'Nationwide Logistics & Setup',
      description: 'End-to-end transport, offloading, and on-site positioning by our specialized technicians in all cities.',
    },
  ];

  const filteredProjects =
    activeProjectTab === 'All'
      ? PROJECTS.slice(0, 6)
      : PROJECTS.filter((p) => p.category === activeProjectTab);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <SEO
        title="Decent School Furniture - Quality Furniture. Better Learning."
        description="Premium school, college, and institutional classroom furniture in Pakistan. Ergonomic student desks, chairs, benches, teacher tables, and bulk orders."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: 'Decent School Furniture',
          url: 'https://decentschoolfurniture.com',
          logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80',
          description:
            'Manufacturer of school, college, and educational institutional furniture. Durable student desks, chairs, classroom benches, teacher tables, lab workstations, and custom bulk quotation orders.',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Industrial Area, Kot Lakhpat',
            addressLocality: 'Lahore',
            addressRegion: 'Punjab',
            addressCountry: 'PK',
          },
        }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#102A43] via-[#102A43] to-[#243B53] text-white pt-12 pb-24 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#F59E0B]">
                <Sparkles className="w-4 h-4" />
                <span>Premier Educational Furniture Manufacturer</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Creating Better <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-amber-200">
                  Learning Spaces
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Engineered for schools, colleges, educational institutions, offices, and bulk buyers. We manufacture durable, ergonomic student desks, classroom benches, and custom furniture built to withstand years of active daily learning.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate('/collections/all')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openQuoteModal()}
                  className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request a Quote</span>
                </button>
              </div>

              {/* Sub-features list */}
              <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />
                  100% Cold-Rolled Steel
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />
                  Direct Factory Pricing
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />
                  All-Pakistan Delivery
                </span>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#F59E0B] to-blue-500 opacity-20 blur-xl" />
                <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-[#102A43]">
                  <img
                    src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80"
                    alt="Decent School Furniture Modern Classroom Setup"
                    className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#102A43] via-[#102A43]/80 to-transparent">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-[#F59E0B] font-bold">
                          Featured Classroom Setup
                        </div>
                        <div className="text-base font-bold text-white">
                          Student Desk & Chair Model SF-2026
                        </div>
                      </div>
                      <button
                        onClick={() => onNavigate('/products/student-desk-chair-set')}
                        className="p-2.5 rounded-full bg-[#F59E0B] text-white hover:bg-[#D97706] transition-colors cursor-pointer"
                        title="View featured product"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Highlights Section */}
      <section className="-mt-16 sm:-mt-20 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-[#D9E2EC] p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-[#D9E2EC]">
            {trustHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`flex items-start gap-4 ${index !== 0 ? 'lg:pl-6' : ''}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] flex items-center justify-center text-[#102A43] shrink-0">
                    <Icon className="w-6 h-6 text-[#102A43]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#102A43]">{item.title}</h3>
                    <p className="text-xs text-[#627D98] mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] mb-2">
            Comprehensive Catalogue
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#102A43]">
            Explore Product Categories
          </h2>
          <p className="text-sm text-[#486581] mt-2">
            Engineered furniture configurations designed for every educational space, from junior classrooms to university auditoriums.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate(`/collections/${cat.handle}`)}
              className="group bg-white rounded-2xl border border-[#D9E2EC] overflow-hidden hover:border-[#102A43]/40 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <h3 className="font-heading text-lg font-bold group-hover:text-[#F59E0B] transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-xs text-slate-300 font-medium">
                      {cat.count} Furniture Models
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#F59E0B] transition-colors">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4 flex-grow flex items-center justify-between text-xs text-[#627D98]">
                <p className="line-clamp-2">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] mb-2">
              Top Institutional Choices
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-[#102A43]">
              Featured Furniture Sets
            </h2>
            <p className="text-xs sm:text-sm text-[#486581] mt-1">
              Field-tested for high-traffic classrooms, lecture halls, staff faculties and computer labs.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/collections/all')}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#102A43] hover:text-[#F59E0B] transition-colors cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#102A43] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
              Manufacturing Prowess
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Why Institutions Trust Decent School Furniture
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              We operate dedicated manufacturing facilities in Pakistan, controlling every weld, powder coat, and edge lamination for certified longevity.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 hover:border-[#F59E0B]/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white flex items-center justify-center mb-4 shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Gallery Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] mb-2">
              Real Spaces. Real Impact.
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-[#102A43]">
              Completed Projects & Installations
            </h2>
            <p className="text-xs sm:text-sm text-[#486581] mt-1">
              Explore how we equip dynamic learning spaces in schools, colleges and universities across Pakistan.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/pages/projects')}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#102A43] hover:text-[#F59E0B] transition-colors cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', 'Classrooms', 'Libraries', 'Computer Labs', 'School Benches', 'Staff Rooms'].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveProjectTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeProjectTab === tab
                    ? 'bg-[#102A43] text-white shadow-sm'
                    : 'bg-white text-[#486581] hover:bg-slate-100 border border-[#D9E2EC]'
                }`}
              >
                {tab === 'All' ? 'All Projects' : tab}
              </button>
            )
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl border border-[#D9E2EC] overflow-hidden hover:border-[#102A43]/40 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div
                className="relative aspect-16/10 overflow-hidden cursor-pointer"
                onClick={() => setLightboxImage({ url: project.image, title: project.title })}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-[#102A43] text-white">
                    {project.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-[#102A43] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-heading text-lg font-bold text-[#102A43] group-hover:text-[#F59E0B] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-[#627D98] mt-1 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[#486581] font-semibold">{project.client}</span>
                  <button
                    onClick={() => onNavigate('/pages/projects')}
                    className="text-[#102A43] hover:text-[#F59E0B] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Furniture Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#102A43] to-[#243B53] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
              Bespoke Manufacturing & Large Tenders
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight">
              Need Custom Furniture for Your School or Institution?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We offer personalized furniture solutions, bulk order discounts, and custom designs tailored to meet your institutional space, budget, and curriculum needs.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('/pages/custom-orders')}
                className="px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Request a Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('/pages/contact')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-sm rounded-xl transition-all cursor-pointer"
              >
                Contact Our Engineers
              </button>
            </div>
          </div>
          <div className="hidden lg:block absolute right-8 -bottom-6 w-80 opacity-90">
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80"
              alt="Classroom furniture production"
              className="rounded-2xl border-2 border-white/20 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] mb-2">
            Verified Feedback
          </div>
          <h2 className="font-heading text-3xl font-extrabold text-[#102A43]">
            Trusted by Educational Institutions
          </h2>
          <p className="text-xs sm:text-sm text-[#486581] mt-1">
            We are proud to be the trusted partner of premier schools, colleges, and university campuses.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl border border-[#D9E2EC] p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="text-amber-500 flex gap-1">
                  {'★'.repeat(test.rating)}
                </div>
                <p className="text-sm text-[#243B53] leading-relaxed italic">
                  "{test.quote}"
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={test.avatar}
                  alt={test.author}
                  className="w-11 h-11 rounded-full object-cover border border-[#D9E2EC]"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#102A43]">{test.author}</h4>
                  <p className="text-[11px] text-[#627D98]">{test.role}</p>
                  <p className="text-[10px] text-[#F59E0B] font-semibold">{test.institution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] mb-2">
            Got Questions?
          </div>
          <h2 className="font-heading text-3xl font-extrabold text-[#102A43]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#486581] mt-1">
            Learn more about our school furniture manufacturing, warranties, MOQs and nationwide delivery.
          </p>
        </div>
        <div className="space-y-3">
          {FAQS.slice(0, 5).map((faq, idx) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl border border-[#D9E2EC] overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-[#102A43] hover:text-[#F59E0B] transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    openFaqIndex === idx ? 'rotate-180 text-[#F59E0B]' : ''
                  }`}
                />
              </button>
              {openFaqIndex === idx && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#486581] leading-relaxed border-t border-slate-100 bg-[#F7F9FC]/50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button
            onClick={() => onNavigate('/pages/faqs')}
            className="text-xs font-bold text-[#102A43] hover:text-[#F59E0B] inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All FAQs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Have Questions / Contact CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#102A43] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#243B53]">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#F59E0B] text-white flex items-center justify-center shrink-0 hidden sm:flex">
              <Phone className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold">
                Have Questions About School Furniture?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Our institutional specialists are here to assist with layouts, tender specs, and quantity pricing.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('/pages/contact')}
              className="px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-xs sm:text-sm rounded-lg shadow-md transition-all cursor-pointer"
            >
              Contact Us
            </button>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 bg-[#16803C] hover:bg-[#157134] text-white font-bold text-xs sm:text-sm rounded-lg shadow-md transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
