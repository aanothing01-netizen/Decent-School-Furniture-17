import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  ChevronRight,
  ShieldCheck,
  Award,
  Factory,
} from 'lucide-react';
import { SEO } from '../components/SEO';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { openQuoteModal } = useStore();

  const values = [
    {
      title: 'Structural Durability',
      desc: 'All frames fabricated from 14-16 gauge cold-rolled steel tubing treated with automated multi-stage anti-corrosion phosphating.',
      icon: ShieldCheck,
    },
    {
      title: 'Pedagogical Ergonomics',
      desc: 'Carefully measured desktop angles, lumbar radii, and rounded edge contours engineered to prevent student fatigue and physical injury.',
      icon: Award,
    },
    {
      title: 'Institutional Accountability',
      desc: 'Commercial warranties, registered STRN/NTN invoicing, and transparent manufacturing lead times trusted by top Pakistani school chains.',
      icon: Factory,
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      <SEO
        title="About Us - 20+ Years Educational Furniture Manufacturing - Decent School Furniture"
        description="Learn about Decent School Furniture's heritage in Lahore, Pakistan. Over 500,000 students seated across 1,200+ campuses with certified ergonomic classroom furniture."
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#243B53] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-4">
            <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#F59E0B] font-semibold">About Us</span>
          </nav>
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
              Established 2004 • Lahore, Pakistan
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
              Crafting Durable Furniture for Pakistan's Future Leaders
            </h1>
            <p className="text-base text-slate-200 leading-relaxed font-normal">
              For over two decades, Decent School Furniture has stood at the forefront of educational infrastructure manufacturing. We combine industrial metallurgical engineering with posture-centric child design to transform traditional classrooms into comfortable spaces of academic excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Factory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
              Our Heritage & Quality
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-[#102A43]">
              From a Specialized Metal Workshop to Nationwide Educational Provider
            </h2>
            <p className="text-sm text-[#486581] leading-relaxed">
              Founded in Lahore, Decent School Furniture was born out of a simple observation: imported educational furniture often failed to survive the rigorous climate and heavy daily demands of Pakistani schools, while localized alternatives lacked posture ergonomics and safety edge finishing.
            </p>
            <p className="text-sm text-[#486581] leading-relaxed">
              We invested in precision tube bending, automated robotic welding, 7-tank phosphating wash lines, and electrostatic powder coating ovens. Today, our 35,000 sq.ft. facility produces thousands of classroom units every month, serving Beaconhouse, Army Public Schools, The City School, provincial boards, and progressive universities.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-3">
              <div className="p-4 bg-slate-50 border border-[#D9E2EC] rounded-xl">
                <span className="block font-heading text-3xl font-black text-[#102A43]">500,000+</span>
                <span className="text-xs text-[#627D98] font-semibold">Students Seated Daily</span>
              </div>
              <div className="p-4 bg-slate-50 border border-[#D9E2EC] rounded-xl">
                <span className="block font-heading text-3xl font-black text-[#102A43]">1,200+</span>
                <span className="text-xs text-[#627D98] font-semibold">Campuses Furnished</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden border-2 border-[#D9E2EC] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1000&q=80"
                alt="School furniture manufacturing factory"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 py-16 border-y border-[#D9E2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl font-extrabold text-[#102A43]">
              The Decent School Furniture Standard
            </h2>
            <p className="text-sm text-[#486581] mt-2">
              Three uncompromised pillars behind every desk, chair, and bench shipped from our factory.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-[#D9E2EC] p-8 shadow-xs space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#102A43]">{val.title}</h3>
                  <p className="text-xs text-[#627D98] leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#102A43] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold">
              Planning a New Campus or Classroom Renovation?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Speak with our educational layout specialists to request factory samples or customized tenders.
            </p>
          </div>
          <button
            onClick={() => openQuoteModal()}
            className="px-8 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-sm rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
          >
            Request Quotation
          </button>
        </div>
      </section>
    </div>
  );
};
