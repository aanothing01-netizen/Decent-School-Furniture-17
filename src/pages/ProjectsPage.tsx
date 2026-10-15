import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PROJECTS, TESTIMONIALS } from '../data/projects';
import { ProjectItem } from '../types';
import { SEO } from '../components/SEO';
import {
  ChevronRight,
  Building2,
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
  Eye,
  X,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const { openQuoteModal } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const categories = [
    'All',
    'Classrooms',
    'Libraries',
    'Computer Labs',
    'School Benches',
    'Staff Rooms',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-12 pb-16">
      <SEO
        title="Completed School Projects & Gallery - Decent School Furniture"
        description="Explore completed classroom furniture projects, campus libraries, computer labs, and staff faculties across Pakistan including Beaconhouse, APSACS, and The City School."
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
            <span className="text-[#F59E0B] font-semibold">Projects & Gallery</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
                Our Work
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Projects & Gallery
              </h1>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Explore our completed school furniture projects and see how we create better learning spaces in schools, colleges and educational institutions across Pakistan.
              </p>
            </div>
            <div className="hidden lg:block text-right">
              <span className="font-heading text-3xl font-black text-amber-300/40 italic">
                Real Spaces. Real Impact.
              </span>
            </div>
          </div>

          {/* 4 Feature Highlights */}
          <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <div>
                <strong className="block text-white font-bold">Real Installations</strong>
                <span className="text-slate-300">From Our Verified Projects</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <div>
                <strong className="block text-white font-bold">Quality Craftsmanship</strong>
                <span className="text-slate-300">In Every Single Setup</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <div>
                <strong className="block text-white font-bold">Institutions Served</strong>
                <span className="text-slate-300">Schools, Colleges & Unis</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <div>
                <strong className="block text-white font-bold">Custom Solutions</strong>
                <span className="text-slate-300">For Every Unique Layout</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#102A43] text-white shadow-md'
                  : 'bg-white text-[#486581] hover:bg-slate-50 border border-[#D9E2EC]'
              }`}
            >
              {cat === 'All' ? 'All Projects' : cat}
            </button>
          ))}
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
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-[#102A43] text-white">
                    {project.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-4 py-2 bg-white/95 rounded-lg text-xs font-bold text-[#102A43] flex items-center gap-2 shadow-lg">
                    <Eye className="w-4 h-4" />
                    <span>View Case Study</span>
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-heading text-lg font-bold text-[#102A43] group-hover:text-[#F59E0B] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-[#627D98] mt-1 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="block font-bold text-[#102A43]">{project.client}</span>
                    <span className="text-[11px] text-[#627D98]">{project.location}</span>
                  </div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-[#102A43] hover:text-[#F59E0B] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Stats Highlights (Matching mockup) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#D9E2EC] p-8 shadow-xs grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center space-y-1">
            <Building2 className="w-8 h-8 text-[#102A43] mx-auto" />
            <h4 className="font-heading text-xl font-black text-[#102A43]">500+</h4>
            <p className="text-xs font-bold text-[#102A43]">Multiple Projects Completed</p>
            <p className="text-[11px] text-[#627D98]">Across schools & institutions</p>
          </div>
          <div className="text-center space-y-1">
            <ShieldCheck className="w-8 h-8 text-[#102A43] mx-auto" />
            <h4 className="font-heading text-xl font-black text-[#102A43]">100%</h4>
            <p className="text-xs font-bold text-[#102A43]">Quality & Durability</p>
            <p className="text-[11px] text-[#627D98]">Built to last for decades</p>
          </div>
          <div className="text-center space-y-1">
            <Users className="w-8 h-8 text-[#102A43] mx-auto" />
            <h4 className="font-heading text-xl font-black text-[#102A43]">100,000+</h4>
            <p className="text-xs font-bold text-[#102A43]">Happy Students & Teachers</p>
            <p className="text-[11px] text-[#627D98]">Better spaces, better learning</p>
          </div>
          <div className="text-center space-y-1">
            <Award className="w-8 h-8 text-[#102A43] mx-auto" />
            <h4 className="font-heading text-xl font-black text-[#102A43]">100%</h4>
            <p className="text-xs font-bold text-[#102A43]">Custom Solutions</p>
            <p className="text-[11px] text-[#627D98]">Tailored to your needs</p>
          </div>
        </div>
      </section>

      {/* Need Custom Furniture Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#102A43] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
              Let's Build Your Next Project
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight">
              Need Custom Furniture for Your School or Institution?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We offer personalized furniture solutions, bulk order discounts and custom designs to meet your specific requirements.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => openQuoteModal()}
                className="px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('/pages/contact')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center space-y-1">
              <span className="text-xs font-bold text-[#F59E0B] block">Custom Sizes</span>
              <span className="text-[11px] text-slate-300">As per your requirements</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center space-y-1">
              <span className="text-xs font-bold text-[#F59E0B] block">Bulk Discounts</span>
              <span className="text-[11px] text-slate-300">For schools & institutions</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center space-y-1">
              <span className="text-xs font-bold text-[#F59E0B] block">Expert Support</span>
              <span className="text-[11px] text-slate-300">From planning to delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Card with Navigation (matching mockup) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#D9E2EC] p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
              What Our Clients Say
            </span>
            <h3 className="font-heading text-2xl font-bold text-[#102A43]">
              Trusted by Educational Institutions
            </h3>
            <p className="text-xs text-[#627D98]">
              We are proud to be a part of many successful projects. Here's what our clients have to say about our work.
            </p>
          </div>
          <div className="max-w-xl w-full bg-[#F7F9FC] p-6 rounded-2xl border border-[#D9E2EC] space-y-4">
            <p className="text-sm text-[#243B53] italic leading-relaxed">
              "{TESTIMONIALS[testimonialIndex].quote}"
            </p>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <img
                  src={TESTIMONIALS[testimonialIndex].avatar}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h5 className="text-xs font-bold text-[#102A43]">
                    {TESTIMONIALS[testimonialIndex].author}
                  </h5>
                  <p className="text-[11px] text-[#627D98]">
                    {TESTIMONIALS[testimonialIndex].role} • {TESTIMONIALS[testimonialIndex].institution}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setTestimonialIndex((prev) =>
                      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
                    )
                  }
                  className="p-2 rounded-full border border-[#D9E2EC] bg-white hover:bg-slate-50 text-[#102A43] cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setTestimonialIndex((prev) =>
                      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="p-2 rounded-full border border-[#D9E2EC] bg-white hover:bg-slate-50 text-[#102A43] cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Lightbox & Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#D9E2EC] relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-16/9 bg-slate-900 relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#F59E0B] text-white">
                  {selectedProject.category}
                </span>
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-heading text-2xl font-bold text-[#102A43]">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-[#627D98] mt-1">
                  Client: <strong>{selectedProject.client}</strong> • Location: <strong>{selectedProject.location}</strong> • Year: {selectedProject.year}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#102A43] uppercase tracking-wider">
                  Project Scope
                </h4>
                <p className="text-xs sm:text-sm text-[#486581] leading-relaxed">
                  {selectedProject.scope}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#102A43] uppercase tracking-wider">
                  Furniture Models Supplied
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.furnitureSupplied.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 border border-[#D9E2EC] rounded-xl text-xs font-medium text-[#243B53] flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#16803C] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    openQuoteModal();
                  }}
                  className="px-6 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Request Similar Project Setup
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 text-xs font-bold text-[#486581] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
