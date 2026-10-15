import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

interface AnnouncementBarProps {
  onNavigate: (path: string) => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onNavigate }) => {
  const { themeSettings } = useStore();

  if (!themeSettings.showAnnouncement) return null;

  return (
    <div className="bg-[#102A43] text-white border-b border-[#243B53]/40 text-xs sm:text-sm py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left font-medium text-slate-200">
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 hidden sm:inline" />
          <span>
            <strong className="text-white">Better Classrooms. Brighter Futures.</strong>
            <span className="mx-2 text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-300">{themeSettings.announcementText}</span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold shrink-0">
          <button
            onClick={() => onNavigate('/pages/custom-orders')}
            className="text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Custom Orders
          </button>
          <span className="text-slate-500">|</span>
          <button
            onClick={() => onNavigate('/pages/custom-orders')}
            className="text-[#F59E0B] hover:text-[#FBBF24] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
