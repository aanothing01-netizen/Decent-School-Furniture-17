import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import { SEO } from '../components/SEO';
import {
  CheckCircle2,
  Send,
  Upload,
  ArrowRight,
  ShieldCheck,
  Building2,
  Truck,
  Wrench,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';

interface CustomOrdersPageProps {
  onNavigate: (path: string) => void;
}

export const CustomOrdersPage: React.FC<CustomOrdersPageProps> = ({ onNavigate }) => {
  const { submitQuotation, showToast } = useStore();
  const [customerName, setCustomerName] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [productCategory, setProductCategory] = useState('Student Desks & Chairs');
  const [quantity, setQuantity] = useState('50');
  const [customRequirements, setCustomRequirements] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Lahore');
  const [fileName, setFileName] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      showToast(`Attached file "${e.target.files[0].name}"`, 'info');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !institutionName || !phone) {
      showToast('Please fill in required fields (Name, School Name, Phone)', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await submitQuotation({
        customerName,
        institutionName,
        phone: `+92 ${phone}`,
        email,
        productCategory,
        preferredProduct: `Custom Request: ${productCategory}`,
        requestedQuantity: quantity || 50,
        deliveryCity,
        additionalRequirements: `${customRequirements} ${fileName ? `[File attached: ${fileName}]` : ''}`,
      });
      setSubmittedId(res.id);
    } catch {
      showToast('Error submitting custom inquiry', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const spaces = [
    {
      title: 'Classrooms',
      subtitle: 'Flexible layouts & smart design',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Libraries',
      subtitle: 'Functional & organized spaces',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Computer Labs',
      subtitle: 'Ergonomic & modern setups',
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Science Labs',
      subtitle: 'Durable & safe furniture',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Staff Rooms',
      subtitle: 'Comfortable & professional',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Special Designs',
      subtitle: 'Unique solutions for your needs',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const processSteps = [
    { num: 1, title: 'Share Your Requirements', desc: 'Tell us what you need.' },
    { num: 2, title: 'Design & Quotation', desc: 'We create a design and quote.' },
    { num: 3, title: 'Production', desc: 'High-quality manufacturing.' },
    { num: 4, title: 'Delivery', desc: 'On-time and safe delivery.' },
    { num: 5, title: 'Installation', desc: 'Setup at your location.' },
  ];

  return (
    <div className="space-y-16 pb-16">
      <SEO
        title="Custom School Furniture & Bulk Tenders - Decent School Furniture"
        description="Design and manufacture custom school furniture for specific classroom layouts, STEM spaces, and bulk tenders. Fast turnaround and direct factory pricing in Pakistan."
      />
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#243B53] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-4">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#F59E0B] font-semibold">Custom Orders</span>
          </nav>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
                Custom Furniture Solutions
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Need a Custom Furniture Solution?
              </h1>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                We design and manufacture school furniture as per your specific requirements. From unique classroom layouts to bulk orders, we're here to help you build the perfect learning environment.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('custom-form');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Request a Custom Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/pages/projects')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                >
                  View Our Projects
                </button>
              </div>
            </div>
            <div className="hidden lg:block text-right">
              <span className="font-heading text-3xl font-black text-amber-300/40 italic">
                Your Vision. Our Design. <br />Better Learning.
              </span>
            </div>
          </div>

          {/* 4 Feature Highlights */}
          <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-2.5">
              <Wrench className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <div>
                <strong className="block text-white font-bold">Custom Designs</strong>
                <span className="text-slate-300">Made as per your requirements</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <div>
                <strong className="block text-white font-bold">High Quality Materials</strong>
                <span className="text-slate-300">Durable & long-lasting</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <div>
                <strong className="block text-white font-bold">Bulk Order Support</strong>
                <span className="text-slate-300">For schools & institutions</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <div>
                <strong className="block text-white font-bold">On-Time Delivery</strong>
                <span className="text-slate-300">Across Pakistan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Section: Form on Left, Spaces on Right (Matching mockup) */}
      <section id="custom-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#D9E2EC] p-6 sm:p-8 shadow-xs">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-black text-[#102A43]">
                Tell Us About Your Custom Requirements
              </h2>
              <p className="text-xs text-[#627D98] mt-1 leading-relaxed">
                Fill out the form below and our team will get in touch with you shortly to discuss your requirements and provide a detailed quote.
              </p>
            </div>

            {submittedId ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <CheckCircle2 className="w-12 h-12 text-[#16803C] mx-auto" />
                <h3 className="text-xl font-bold text-[#102A43]">
                  Custom Order Inquiry Submitted!
                </h3>
                <p className="text-xs text-[#486581]">
                  Reference ID: <strong>{submittedId}</strong>. Our senior production engineer will contact you on +92 {phone} with structural sketches and direct factory pricing.
                </p>
                <button
                  onClick={() => setSubmittedId(null)}
                  className="px-5 py-2 bg-[#102A43] hover:bg-[#243B53] text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#243B53] mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#243B53] mb-1">
                      Institution Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={institutionName}
                      onChange={(e) => setInstitutionName(e.target.value)}
                      placeholder="Enter school / college name"
                      className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#243B53] mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-xs bg-slate-100 border border-r-0 border-[#D9E2EC] rounded-l-lg text-slate-600 font-bold">
                        +92
                      </span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="300 1234567"
                        className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#243B53] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email (optional)"
                      className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#243B53] mb-1">
                      Product Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                      <option value="Complete Campus Turnkey">Complete Campus Turnkey Fit-Out</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#243B53] mb-1">
                      Quantity (Approx.)
                    </label>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Enter quantity"
                      className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#243B53] mb-1">
                    Custom Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={customRequirements}
                    onChange={(e) => setCustomRequirements(e.target.value)}
                    placeholder="Tell us about your specific needs (dimensions, design, materials, colors, grade levels, etc.)..."
                    className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-bold text-[#243B53] mb-1">
                      Preferred Delivery City <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={deliveryCity}
                      onChange={(e) => setDeliveryCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                    >
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Gujranwala">Gujranwala</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Quetta">Quetta</option>
                      <option value="Other City in Pakistan">Other City</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#243B53] mb-1">
                      Attach File (Optional)
                    </label>
                    <label className="flex items-center gap-2 p-2 border border-[#D9E2EC] rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer text-xs text-slate-600">
                      <Upload className="w-3.5 h-3.5 text-[#102A43]" />
                      <span className="truncate">
                        {fileName ? fileName : 'Choose blueprint or layout'}
                      </span>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg,.dwg"
                      />
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 text-xs text-[#627D98] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-4 h-4 rounded text-[#102A43]"
                    />
                    <span>I agree to the privacy policy and terms & conditions.</span>
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Request...' : 'Send Custom Request'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Custom Solutions for Every Space */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="font-heading text-2xl font-black text-[#102A43]">
                Custom Solutions for Every Space
              </h2>
              <p className="text-xs text-[#627D98] mt-1 leading-relaxed">
                We create furniture solutions tailored to your space, style and budget.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {spaces.map((sp, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-[#D9E2EC] overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
                  onClick={() => {
                    setProductCategory(sp.title);
                    const el = document.getElementById('custom-form');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="aspect-16/10 overflow-hidden bg-slate-100">
                    <img
                      src={sp.image}
                      alt={sp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-bold text-[#102A43] group-hover:text-[#F59E0B] transition-colors flex items-center gap-1">
                      <span>{sp.title}</span>
                      <ArrowRight className="w-3 h-3 text-[#F59E0B]" />
                    </h4>
                    <p className="text-[10px] text-[#627D98] mt-0.5 line-clamp-1">
                      {sp.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Have a Unique Idea Card */}
            <div className="bg-[#F7F9FC] border border-[#D9E2EC] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[#F59E0B] shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#102A43]">
                    Have a Unique Idea?
                  </h4>
                  <p className="text-[11px] text-[#627D98] mt-0.5">
                    Share your concept with us. Our design team will help you turn it into a practical and high-quality furniture solution.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('custom-form');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 border border-[#102A43] text-[#102A43] hover:bg-[#102A43] hover:text-white rounded-lg text-xs font-bold transition-colors shrink-0 cursor-pointer"
              >
                Discuss Your Idea →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Process (Matching mockup) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#102A43]">
            How Our Custom Order Process Works
          </h2>
          <p className="text-xs sm:text-sm text-[#486581] mt-1">
            From idea to installation — we make the process simple, transparent and efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
          {processSteps.map((step, idx) => (
            <div
              key={step.num}
              className="bg-white rounded-xl border border-[#D9E2EC] p-5 text-center relative flex flex-col items-center justify-between shadow-xs"
            >
              <div className="w-9 h-9 rounded-full bg-[#F59E0B] text-white font-black text-sm flex items-center justify-center mb-3 shadow-sm">
                {step.num}
              </div>
              <h4 className="font-heading text-xs font-bold text-[#102A43]">
                {step.title}
              </h4>
              <p className="text-[11px] text-[#627D98] mt-1">
                {step.desc}
              </p>
              {idx < processSteps.length - 1 && (
                <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
