import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useStore();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-fade-in max-w-sm">
      <div
        className={`px-4 py-3 rounded-xl shadow-xl border flex items-center gap-3 ${
          toast.type === 'error'
            ? 'bg-red-900 text-white border-red-700'
            : toast.type === 'info'
            ? 'bg-[#102A43] text-white border-[#243B53]'
            : 'bg-[#102A43] text-white border-[#243B53]'
        }`}
      >
        {toast.type === 'error' ? (
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
        ) : toast.type === 'info' ? (
          <Info className="w-5 h-5 text-blue-400 shrink-0" />
        ) : (
          <CheckCircle className="w-5 h-5 text-[#F59E0B] shrink-0" />
        )}
        <div className="text-xs sm:text-sm font-medium leading-snug flex-grow">
          {toast.message}
        </div>
        <button
          onClick={hideToast}
          className="text-slate-400 hover:text-white p-1 rounded-md cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
