import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import {
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building,
  Phone,
  Mail,
  User,
  MapPin,
  MessageCircle,
} from 'lucide-react';

export const QuotationModal: React.FC = () => {
  const {
    isQuoteModalOpen,
    closeQuoteModal,
    activeQuoteProduct,
    activeQuoteQuantity,
    submitQuotation,
    getWhatsAppUrl,
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [quantity, setQuantity] = useState<number>(10);
  const [deliveryCity, setDeliveryCity] = useState('Lahore');
  const [customDimensions, setCustomDimensions] = useState('');
  const [materialPreference, setMaterialPreference] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  useEffect(() => {
    if (activeQuoteProduct) {
      setSelectedProduct(activeQuoteProduct.title);
      setProductCategory(activeQuoteProduct.categoryName);
      setQuantity(activeQuoteQuantity || activeQuoteProduct.minOrderQuantity || 10);
    } else {
      setSelectedProduct('Student Desk & Chair Set');
      setProductCategory('Student Desks & Chairs');
      setQuantity(10);
    }
    setSubmittedId(null);
    setErrors({});
  }, [activeQuoteProduct, activeQuoteQuantity, isQuoteModalOpen]);

  if (!isQuoteModalOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) errs.customerName = 'Contact person name is required';
    if (!institutionName.trim()) errs.institutionName = 'School / Institution name is required';
    if (!phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (phone.length < 9) {
      errs.phone = 'Please enter a valid phone number (e.g. 0300 1234567)';
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email format';
    }
    if (!quantity || quantity < 1) {
      errs.quantity = 'Please enter a valid quantity of at least 1 unit';
    }
    if (!agreedToTerms) {
      errs.agreedToTerms = 'You must agree to our quotation privacy policy';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await submitQuotation({
        customerName,
        institutionName,
        phone,
        email,
        productCategory,
        preferredProduct: selectedProduct,
        requestedQuantity: quantity,
        deliveryCity,
        customDimensions,
        materialPreference,
        additionalRequirements,
      });
      setSubmittedId(res.id);
    } catch {
      setErrors({ form: 'An error occurred while submitting your quotation. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCustomWhatsAppQuoteLink = () => {
    const quoteMsg = `*Official Quotation Inquiry [${submittedId || 'NEW'}]*\n*Institution:* ${institutionName}\n*Contact Person:* ${customerName}\n*Phone:* ${phone}\n*Product:* ${selectedProduct}\n*Quantity:* ${quantity} units\n*City:* ${deliveryCity}\n${customDimensions ? `*Dimensions:* ${customDimensions}\n` : ''}${materialPreference ? `*Material:* ${materialPreference}\n` : ''}${additionalRequirements ? `*Notes:* ${additionalRequirements}` : ''}`;
    return getWhatsAppUrl(quoteMsg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#D9E2EC] animate-fade-in relative">
        {/* Header */}
        <div className="sticky top-0 bg-[#102A43] text-white p-6 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#F59E0B]" />
              <h2 className="text-xl font-heading font-black">
                Request an Institutional Quotation
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Direct manufacturer rates for schools, colleges, academies & universities.
            </p>
          </div>
          <button
            onClick={closeQuoteModal}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedId ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-[#16803C] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-[#102A43]">
                Quotation Request Received!
              </h3>
              <p className="text-sm text-[#486581]">
                Thank you, <strong>{customerName}</strong>. Your inquiry reference is:
              </p>
              <div className="inline-block px-4 py-2 bg-slate-100 rounded-lg text-lg font-mono font-bold text-[#102A43] border border-[#D9E2EC]">
                {submittedId}
              </div>
            </div>
            <p className="text-xs text-[#627D98] max-w-md mx-auto leading-relaxed">
              Our institutional furniture sales team has logged your request for <strong>{quantity} units</strong> of <strong>{selectedProduct}</strong> for <strong>{institutionName}</strong> in <strong>{deliveryCity}</strong>. An official quotation will be dispatched to your phone/email shortly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={getCustomWhatsAppQuoteLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-[#16803C] hover:bg-[#157134] text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send via WhatsApp for Instant Response</span>
              </a>
              <button
                onClick={closeQuoteModal}
                className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-[#243B53] font-bold rounded-lg text-sm transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Quotation Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {errors.form && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-sm text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}

            {/* Row 1: Contact Person & School Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#243B53] mb-1">
                  Contact Person Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Principal Tariq Mehmood"
                    className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43] ${
                      errors.customerName ? 'border-red-400 bg-red-50/30' : 'border-[#D9E2EC]'
                    }`}
                  />
                </div>
                {errors.customerName && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.customerName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#243B53] mb-1">
                  School / Institution Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="e.g. Beaconhouse High School"
                    className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43] ${
                      errors.institutionName ? 'border-red-400 bg-red-50/30' : 'border-[#D9E2EC]'
                    }`}
                  />
                </div>
                {errors.institutionName && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.institutionName}</p>
                )}
              </div>
            </div>

            {/* Row 2: Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#243B53] mb-1">
                  Phone / WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43] ${
                      errors.phone ? 'border-red-400 bg-red-50/30' : 'border-[#D9E2EC]'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#243B53] mb-1">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="procurement@school.edu.pk"
                    className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43] ${
                      errors.email ? 'border-red-400 bg-red-50/30' : 'border-[#D9E2EC]'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Row 3: Product & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#243B53] mb-1">
                  Selected Furniture Item
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => {
                    setSelectedProduct(e.target.value);
                    const found = PRODUCTS.find((p) => p.title === e.target.value);
                    if (found) setProductCategory(found.categoryName);
                  }}
                  className="w-full px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                >
                  {PRODUCTS.map((prod) => (
                    <option key={prod.id} value={prod.title}>
                      {prod.title} ({prod.categoryName})
                    </option>
                  ))}
                  <option value="Custom Project Furniture">Custom / Multiple Furniture Setup</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#243B53] mb-1">
                  Approximate Quantity Needed <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  placeholder="e.g. 50"
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43] ${
                    errors.quantity ? 'border-red-400 bg-red-50/30' : 'border-[#D9E2EC]'
                  }`}
                />
                {errors.quantity && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.quantity}</p>
                )}
              </div>
            </div>

            {/* Row 4: Delivery City & Custom Dimensions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#243B53] mb-1">
                  Preferred Delivery City
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Gujranwala">Gujranwala</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Other City in Pakistan">Other City in Pakistan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#243B53] mb-1">
                  Custom Dimensions / Grade Tier (Optional)
                </label>
                <input
                  type="text"
                  value={customDimensions}
                  onChange={(e) => setCustomDimensions(e.target.value)}
                  placeholder="e.g. Height 65cm for Primary students"
                  className="w-full px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-xs font-bold text-[#243B53] mb-1">
                Material, Colors & Special Requirements
              </label>
              <textarea
                rows={3}
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                placeholder="Specify preferred powder-coat paint color, wood laminate finish, delivery deadline, or installation details..."
                className="w-full px-3 py-2 text-sm border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
              />
            </div>

            {/* Privacy Checkbox */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#486581]">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 rounded text-[#102A43] focus:ring-[#102A43]"
                />
                <span>
                  I agree to the quotation policy and confirm this is a bona fide institutional inquiry.
                </span>
              </label>
              {errors.agreedToTerms && (
                <p className="text-[11px] text-red-600 mt-1">{errors.agreedToTerms}</p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeQuoteModal}
                className="px-5 py-2.5 text-sm font-semibold text-[#486581] hover:text-[#102A43] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Quotation Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
