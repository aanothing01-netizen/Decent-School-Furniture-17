import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, X, Send } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { themeSettings, getWhatsAppUrl } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [customQuery, setCustomQuery] = useState('');

  const quickMessages = [
    'I need a quotation for student desks & chairs.',
    'What is the delivery time to our city in Pakistan?',
    'Can we schedule a call to discuss custom school furniture?',
  ];

  const handleSend = (text: string) => {
    const url = getWhatsAppUrl(text);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setCustomQuery('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-[#D9E2EC] overflow-hidden animate-fade-in text-[#243B53]">
          <div className="bg-[#102A43] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#16803C] flex items-center justify-center text-white shadow-sm">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Decent School Furniture</h4>
                <p className="text-[11px] text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Institutional Desk Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-[#F7F9FC] text-xs text-[#486581] border-b border-[#D9E2EC]">
            Hello! Have a question about school furniture, bulk institutional orders, or custom dimensions? Chat directly with our manufacturing desk.
          </div>

          <div className="p-4 space-y-2">
            <div className="text-[11px] font-bold text-[#627D98] uppercase tracking-wider">
              Quick Questions:
            </div>
            {quickMessages.map((msg, i) => (
              <button
                key={i}
                onClick={() => handleSend(msg)}
                className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs text-[#243B53] transition-colors flex items-center justify-between group cursor-pointer"
              >
                <span className="line-clamp-1">{msg}</span>
                <Send className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 shrink-0 ml-1" />
              </button>
            ))}

            <div className="pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customQuery.trim()) {
                      handleSend(customQuery);
                    }
                  }}
                  className="flex-grow px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#16803C]"
                />
                <button
                  onClick={() => customQuery.trim() && handleSend(customQuery)}
                  className="px-3 py-2 bg-[#16803C] hover:bg-[#157134] text-white rounded-lg text-xs font-bold transition-colors shrink-0 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-slate-100 text-center text-[10px] text-slate-500 border-t border-slate-200">
            Connected to <strong>+{themeSettings.whatsapp}</strong>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#16803C] hover:bg-[#157134] text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="text-sm tracking-wide hidden sm:inline">WhatsApp Inquiries</span>
      </button>
    </div>
  );
};
