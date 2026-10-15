import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { saveMessageToSupabase } from '../lib/supabase';
import { SEO } from '../components/SEO';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { themeSettings, getWhatsAppUrl, showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [subject, setSubject] = useState('School Furniture Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      showToast('Please fill in your name, phone and message', 'error');
      return;
    }
    setIsSubmitting(true);
    const messageId = `MSG-${Date.now().toString().slice(-6)}`;
    const pathForWrite = `messages/${messageId}`;
    // Save to Supabase messages table
    saveMessageToSupabase({
      id: messageId,
      name: name.slice(0, 128),
      phone: phone.slice(0, 32),
      message: message.slice(0, 2000),
      institution: institution ? institution.slice(0, 128) : '',
      email: email ? email.slice(0, 128) : '',
      subject: subject.slice(0, 128),
      createdAt: new Date().toISOString(),
    }).catch((e) => console.warn('[Supabase Contact Save]:', e));

    try {
      await setDoc(doc(db, 'messages', messageId), {
        name: name.slice(0, 128),
        phone: phone.slice(0, 32),
        message: message.slice(0, 2000),
        institution: institution ? institution.slice(0, 128) : '',
        email: email ? email.slice(0, 128) : '',
        subject: subject.slice(0, 128),
        createdAt: new Date().toISOString(),
      });
      setIsSent(true);
      showToast('Your message has been sent. Our team will contact you shortly!');
    } catch (error) {
      console.warn('Firestore write warning:', error);
      try {
        handleFirestoreError(error, OperationType.WRITE, pathForWrite);
      } catch (err) {
        console.error(err);
      }
      setIsSent(true);
      showToast('Your message has been recorded. Our team will contact you shortly!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      <SEO
        title="Contact Us & Factory Showroom - Decent School Furniture"
        description="Connect with our school furniture manufacturing team in Kot Lakhpat, Lahore. Inquire via WhatsApp, phone, or send your campus RFP tender specifications."
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#243B53] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-4">
            <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#F59E0B] font-semibold">Contact Us</span>
          </nav>
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
              Get In Touch With Our Team
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
              We're Here to Support Your School Project
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Whether you need tender pricing, physical factory samples, custom desk measurements, or nationwide delivery schedules, our team is ready to assist.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Verified Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-[#D9E2EC] p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h3 className="font-heading text-xl font-bold text-[#102A43]">
                  Decent School Furniture
                </h3>
                <p className="text-xs text-[#627D98] mt-1">
                  Manufacturer of School, College & Educational Furniture
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#243B53]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-[#F59E0B] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#102A43]">Phone & Tenders</strong>
                    <a href={`tel:${themeSettings.phone}`} className="hover:text-[#F59E0B] font-semibold">
                      {themeSettings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#16803C] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#102A43]">WhatsApp Desk</strong>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#16803C] font-semibold"
                    >
                      +{themeSettings.whatsapp} (Direct Chat)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1D4ED8] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#102A43]">Official Email</strong>
                    <a href={`mailto:${themeSettings.email}`} className="hover:text-[#1D4ED8] break-all">
                      {themeSettings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 text-[#486581] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#102A43]">Factory & Showroom</strong>
                    <span className="text-[#627D98]">{themeSettings.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 text-[#486581] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#102A43]">Operating Hours</strong>
                    <span className="text-[#627D98]">Monday – Saturday: 9:00 AM – 6:30 PM (PKT)</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-2">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-[#16803C] hover:bg-[#157134] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start WhatsApp Conversation</span>
                </a>
              </div>
            </div>

            {/* Factory Map Representation */}
            <div className="bg-white rounded-2xl border border-[#D9E2EC] p-4 overflow-hidden shadow-xs">
              <div className="relative rounded-xl overflow-hidden aspect-16/9 bg-slate-100 border border-slate-200 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80"
                  alt="Industrial Area Factory"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#102A43]/60 flex flex-col items-center justify-center text-white p-4 text-center">
                  <MapPin className="w-8 h-8 text-[#F59E0B] mb-2 animate-bounce" />
                  <span className="font-bold text-sm">Industrial Area, Kot Lakhpat, Lahore</span>
                  <span className="text-xs text-slate-300">Central Manufacturing Plant & Dispatch Depot</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#D9E2EC] p-6 sm:p-8 shadow-xs">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-black text-[#102A43]">
                Send Us an Institutional Message
              </h2>
              <p className="text-xs text-[#627D98] mt-1">
                Fill out this form and our senior client manager will respond within 4 hours.
              </p>
            </div>

            {isSent ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <CheckCircle2 className="w-12 h-12 text-[#16803C] mx-auto" />
                <h3 className="text-xl font-bold text-[#102A43]">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-xs text-[#486581]">
                  We have received your message regarding <strong>{subject}</strong>. A representative will contact you via phone or email shortly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-5 py-2 bg-[#102A43] text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#243B53] mb-1">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Asad Ullah"
                      className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#243B53] mb-1">
                      School / Institution
                    </label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. City Public School"
                      className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#243B53] mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0300 1234567"
                      className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#243B53] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. info@school.edu.pk"
                      className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#243B53] mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                  >
                    <option value="School Furniture Quotation">School Furniture Quotation</option>
                    <option value="Custom Size & Grade Level Request">Custom Size & Grade Level Request</option>
                    <option value="Tender / Government Procurement">Tender / Institutional Procurement</option>
                    <option value="Physical Sample Inspection">Request Physical Sample / Demo Unit</option>
                    <option value="Delivery & Order Status">Delivery & Order Status</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#243B53] mb-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about furniture types, approximate quantities, city of delivery, and timeframe..."
                    className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
