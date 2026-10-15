import React, { useState } from 'react';
import { ChevronRight, FileText, Lock } from 'lucide-react';
import { SEO } from '../components/SEO';

interface PoliciesPageProps {
  initialTab?: 'privacy' | 'terms';
  onNavigate: (path: string) => void;
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({
  initialTab = 'privacy',
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  return (
    <div className="space-y-12 pb-16">
      <SEO
        title={activeTab === 'privacy' ? 'Privacy Policy - Decent School Furniture' : 'Terms of Service & Warranty - Decent School Furniture'}
        description="Official commercial terms, 3-5 year structural warranty conditions, quotation validity rules, and data privacy policies of Decent School Furniture."
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#243B53] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-300 mb-2">
            <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#F59E0B] font-semibold">Institutional Policies</span>
          </nav>
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white">
            {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Official commercial policies for educational institutions, schools, colleges, and bulk buyers.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#D9E2EC] p-6 sm:p-10 shadow-xs space-y-8">
          {/* Policy Switcher Tabs */}
          <div className="flex border-b border-[#D9E2EC] gap-6 text-sm font-bold">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`pb-3 flex items-center gap-2 cursor-pointer transition-colors ${
                activeTab === 'privacy'
                  ? 'text-[#F59E0B] border-b-2 border-[#F59E0B]'
                  : 'text-[#627D98] hover:text-[#102A43]'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`pb-3 flex items-center gap-2 cursor-pointer transition-colors ${
                activeTab === 'terms'
                  ? 'text-[#F59E0B] border-b-2 border-[#F59E0B]'
                  : 'text-[#627D98] hover:text-[#102A43]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Terms of Service & Warranty</span>
            </button>
          </div>

          {activeTab === 'privacy' ? (
            <div className="space-y-6 text-xs sm:text-sm text-[#486581] leading-relaxed">
              <section className="space-y-2">
                <h3 className="font-heading text-base font-bold text-[#102A43]">
                  1. Information We Collect
                </h3>
                <p>
                  Decent School Furniture collects institutional procurement information provided voluntarily through our quotation forms, WhatsApp communication, and direct telephone contact. This includes the contact person's name, designation, institution name, official email, phone number, and delivery city.
                </p>
              </section>
              <section className="space-y-2">
                <h3 className="font-heading text-base font-bold text-[#102A43]">
                  2. Use of Information
                </h3>
                <p>
                  All information submitted is used exclusively to prepare accurate itemized quotations, coordinate manufacturing specifications, coordinate logistics and campus delivery, and provide after-sales warranty service. We do not sell, rent, or distribute institutional data to third parties.
                </p>
              </section>
              <section className="space-y-2">
                <h3 className="font-heading text-base font-bold text-[#102A43]">
                  3. Quotation Confidentiality
                </h3>
                <p>
                  Custom engineering designs, architectural floorplans, and tendered price schedules are treated with commercial confidentiality. School logos and badges supplied for silkscreening or embossing are used solely on authorized production batches.
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-6 text-xs sm:text-sm text-[#486581] leading-relaxed">
              <section className="space-y-2">
                <h3 className="font-heading text-base font-bold text-[#102A43]">
                  1. Quotations, Pricing & Tenders
                </h3>
                <p>
                  Quotations issued by Decent School Furniture are valid for 30 calendar days from the date of issue. Prices quoted are in Pakistani Rupees (PKR) and specify whether General Sales Tax (GST) is inclusive or exclusive.
                </p>
              </section>
              <section className="space-y-2">
                <h3 className="font-heading text-base font-bold text-[#102A43]">
                  2. Production Lead Times & Sample Orders
                </h3>
                <p>
                  Manufacturing begins upon receipt of a confirmed purchase order (PO) and agreed mobilization advance. Production lead times for custom classroom batches are typically 10 to 20 working days. Demo sample units can be produced for institutional evaluation prior to mass fabrication.
                </p>
              </section>
              <section className="space-y-2">
                <h3 className="font-heading text-base font-bold text-[#102A43]">
                  3. Commercial Structural Warranty
                </h3>
                <p>
                  All steel tubular frames and welded assemblies carry a 3 to 5-Year commercial structural warranty. This covers weld integrity and frame breakage under standard educational classroom usage. It excludes intentional student vandalism, acid spills in non-chemical designated furniture, or severe flooding.
                </p>
              </section>
              <section className="space-y-2">
                <h3 className="font-heading text-base font-bold text-[#102A43]">
                  4. Nationwide Delivery & Inspection
                </h3>
                <p>
                  Goods must be inspected by the school representative upon delivery. Any transit damage recorded on the delivery challan will be repaired or replaced by Decent School Furniture at zero additional cost.
                </p>
              </section>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
