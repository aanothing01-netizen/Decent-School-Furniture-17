import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, RotateCcw, Sliders, Info, Database } from 'lucide-react';

export const ThemeInspectorModal: React.FC = () => {
  const {
    isThemeInspectorOpen,
    setIsThemeInspectorOpen,
    themeSettings,
    updateThemeSettings,
    resetThemeSettings,
    setIsSupabaseModalOpen,
  } = useStore();

  if (!isThemeInspectorOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-[#D9E2EC] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-[#102A43] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="font-heading font-black text-lg">
              Shopify Theme Editor Simulation
            </h3>
          </div>
          <button
            onClick={() => setIsThemeInspectorOpen(false)}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 bg-amber-50 border-b border-amber-200 text-xs text-amber-900 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            These settings correspond directly to <code>config/settings_schema.json</code> in the Shopify Online Store 2.0 theme. Modifying them updates the live storefront instantly.
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Announcement Bar */}
          <div className="space-y-3 pb-4 border-b border-slate-200">
            <h4 className="text-xs font-bold text-[#102A43] uppercase tracking-wider">
              Announcement Bar
            </h4>
            <label className="flex items-center gap-2 text-xs font-semibold text-[#243B53] cursor-pointer">
              <input
                type="checkbox"
                checked={themeSettings.showAnnouncement}
                onChange={(e) => updateThemeSettings({ showAnnouncement: e.target.checked })}
                className="w-4 h-4 rounded text-[#102A43]"
              />
              <span>Enable Announcement Bar</span>
            </label>
            <div>
              <label className="block text-xs text-[#627D98] mb-1">
                Announcement Text
              </label>
              <input
                type="text"
                value={themeSettings.announcementText}
                onChange={(e) => updateThemeSettings({ announcementText: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 pb-4 border-b border-slate-200">
            <h4 className="text-xs font-bold text-[#102A43] uppercase tracking-wider">
              Institutional Contact Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#627D98] mb-1">
                  Phone Display
                </label>
                <input
                  type="text"
                  value={themeSettings.phone}
                  onChange={(e) => updateThemeSettings({ phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs text-[#627D98] mb-1">
                  WhatsApp Number (International)
                </label>
                <input
                  type="text"
                  value={themeSettings.whatsapp}
                  onChange={(e) => updateThemeSettings({ whatsapp: e.target.value })}
                  placeholder="e.g. 923001234567"
                  className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#627D98] mb-1">
                Business Address
              </label>
              <input
                type="text"
                value={themeSettings.address}
                onChange={(e) => updateThemeSettings({ address: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[#D9E2EC] rounded-lg"
              />
            </div>
          </div>

          {/* Supabase Connection Quick Access */}
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-700 flex items-center justify-center shrink-0">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <span>Supabase Backend Tables</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </p>
                <p className="text-[11px] text-emerald-800 font-mono">
                  xbtxawcadgnmoxtjhwuc
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsThemeInspectorOpen(false);
                setIsSupabaseModalOpen(true);
              }}
              className="px-3 py-1.5 bg-[#102A43] hover:bg-[#1E3A5F] text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer transition-colors"
            >
              Sync & Tables
            </button>
          </div>

          {/* Reset */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={resetThemeSettings}
              className="text-xs text-slate-500 hover:text-[#B42318] flex items-center gap-1 font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Brand Defaults</span>
            </button>
            <button
              onClick={() => setIsThemeInspectorOpen(false)}
              className="px-5 py-2 bg-[#102A43] hover:bg-[#243B53] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
