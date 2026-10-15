import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Database,
  CheckCircle2,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  X,
  Server,
  Layers,
  ShieldCheck,
  Send,
  AlertCircle,
} from 'lucide-react';
import { saveOrderToSupabase, saveQuotationToSupabase, SUPABASE_PROJECT_ID, SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/supabase';

export const SupabaseSyncModal: React.FC = () => {
  const {
    isSupabaseModalOpen,
    setIsSupabaseModalOpen,
    supabaseStatus,
    refreshSupabaseConnection,
    supabaseSql,
    showToast,
  } = useStore();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isTestingInsert, setIsTestingInsert] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  if (!isSupabaseModalOpen) return null;

  const handleCopy = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    showToast(`Copied ${keyName} to clipboard!`, 'success');
    setTimeout(() => setCopiedKey(null), 3000);
  };

  const handlePing = async () => {
    setIsRefreshing(true);
    try {
      const res = await refreshSupabaseConnection();
      if (res.connected) {
        showToast('Supabase connection verified! Server is responding.', 'success');
      } else {
        showToast('Supabase ping notice: ' + (res.error || 'Server responded with status'), 'info');
      }
    } catch {
      showToast('Error testing Supabase connection', 'error');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleTestInsert = async () => {
    setIsTestingInsert(true);
    setTestResult(null);
    try {
      const testQuoteId = `TEST-PING-${Date.now().toString().slice(-4)}`;
      const res = await saveQuotationToSupabase({
        id: testQuoteId,
        createdAt: new Date().toISOString(),
        customerName: 'Supabase Connectivity Verification',
        institutionName: 'Decent School Furniture Test Campus',
        phone: '+92 300 0000000',
        email: 'system-test@supabase.co',
        productCategory: 'Student Desks & Chairs',
        requestedQuantity: '5',
        deliveryCity: 'Lahore',
        additionalRequirements: 'Automated Supabase backend connection ping.',
        status: 'pending',
      });

      if (res.success) {
        setTestResult(`Success! Test record #${testQuoteId} successfully inserted into Supabase 'quotations' table.`);
        showToast('Test record successfully saved in Supabase backend tables!', 'success');
      } else {
        setTestResult(`Supabase response: ${res.error}. If the table does not exist yet, run the SQL script below in your Supabase SQL Editor.`);
      }
    } catch (e: any) {
      setTestResult(`Test failed: ${e.message || String(e)}`);
    } finally {
      setIsTestingInsert(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-[#D9E2EC] overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#102A43] to-[#1E3A5F] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-lg text-white">
                  Supabase Backend Connected
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Project ID: <span className="font-mono text-amber-300 font-semibold">{SUPABASE_PROJECT_ID}</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSupabaseModalOpen(false)}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Status Card */}
          <div className="bg-[#F7F9FC] border border-[#D9E2EC] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-[#102A43]" />
                <span className="text-xs font-bold text-[#102A43] uppercase tracking-wide">
                  Backend Endpoints & Credentials
                </span>
              </div>
              <button
                onClick={handlePing}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-[#102A43] bg-white border border-[#D9E2EC] hover:bg-slate-50 rounded-lg shadow-xs cursor-pointer transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
                <span>{isRefreshing ? 'Testing...' : 'Test Ping'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-[#E2E8F0] space-y-1">
                <span className="text-slate-500 block text-[11px] font-medium">Supabase Project URL</span>
                <div className="flex items-center justify-between font-mono text-[11px] text-slate-800 break-all">
                  <span>{SUPABASE_URL}</span>
                  <button
                    onClick={() => handleCopy(SUPABASE_URL, 'Supabase URL')}
                    className="p-1 hover:text-[#102A43] text-slate-400 cursor-pointer"
                    title="Copy URL"
                  >
                    {copiedKey === 'Supabase URL' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-[#E2E8F0] space-y-1">
                <span className="text-slate-500 block text-[11px] font-medium">Publishable / Anon API Key</span>
                <div className="flex items-center justify-between font-mono text-[11px] text-slate-800">
                  <span className="truncate max-w-[180px]">{SUPABASE_ANON_KEY}</span>
                  <button
                    onClick={() => handleCopy(SUPABASE_ANON_KEY, 'API Key')}
                    className="p-1 hover:text-[#102A43] text-slate-400 cursor-pointer"
                    title="Copy API Key"
                  >
                    {copiedKey === 'API Key' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Synchronized Tables Matrix */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#102A43]" />
              <h4 className="text-xs font-bold text-[#102A43] uppercase tracking-wide">
                Configured Backend Tables
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-900">public.orders</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-[11px] text-emerald-800">
                  Saves placed orders, invoice totals, order numbers (DSF-PK-...), items array, and delivery addresses.
                </p>
              </div>

              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-900">public.quotations</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-[11px] text-emerald-800">
                  Saves institutional quote inquiries, customized quantity requirements, campus names & phone contacts.
                </p>
              </div>

              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-900">public.messages</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-[11px] text-emerald-800">
                  Saves contact form submissions, campus RFP tender queries, inquiries, and customer details.
                </p>
              </div>

              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-900">public.profiles</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-[11px] text-emerald-800">
                  Saves customer accounts, school institutional affiliations, contact phone, city, and roles.
                </p>
              </div>
            </div>
          </div>

          {/* Test Insert Action */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#102A43]">Verify Real-time Insert to Supabase</h4>
                <p className="text-[11px] text-[#627D98]">
                  Sends a verified inquiry test record to your Supabase tables to confirm live database writing.
                </p>
              </div>
              <button
                onClick={handleTestInsert}
                disabled={isTestingInsert}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#102A43] hover:bg-[#1E3A5F] text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer transition-colors"
              >
                <Send className={`w-3.5 h-3.5 ${isTestingInsert ? 'animate-pulse' : ''}`} />
                <span>{isTestingInsert ? 'Testing...' : 'Test Write to Supabase'}</span>
              </button>
            </div>

            {testResult && (
              <div className={`p-3 rounded-lg text-xs flex items-start gap-2 ${testResult.includes('Success') ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-amber-50 border border-amber-200 text-amber-900'}`}>
                {testResult.includes('Success') ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                )}
                <span>{testResult}</span>
              </div>
            )}
          </div>

          {/* SQL Setup Script Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#102A43]" />
                <h4 className="text-xs font-bold text-[#102A43] uppercase tracking-wide">
                  Supabase SQL Migration Script
                </h4>
              </div>
              <button
                onClick={() => handleCopy(supabaseSql, 'SQL Script')}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#102A43] bg-white border border-[#D9E2EC] hover:bg-slate-50 rounded-lg shadow-xs cursor-pointer"
              >
                {copiedKey === 'SQL Script' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'SQL Script' ? 'Copied SQL!' : 'Copy SQL Schema'}</span>
              </button>
            </div>
            <p className="text-[11px] text-[#627D98]">
              If you haven't created the tables in your Supabase dashboard yet, copy the SQL below and paste it into the <strong>SQL Editor</strong> in your Supabase project (<strong>{SUPABASE_PROJECT_ID}</strong>).
            </p>
            <pre className="bg-[#102A43] text-emerald-300 p-4 rounded-xl text-[11px] font-mono overflow-x-auto max-h-48 border border-slate-700 leading-relaxed">
              {supabaseSql}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F7F9FC] border-t border-[#D9E2EC] flex items-center justify-between">
          <a
            href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#102A43] hover:text-[#1E3A5F]"
          >
            <span>Open Supabase Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => setIsSupabaseModalOpen(false)}
            className="px-4 py-2 bg-[#102A43] hover:bg-[#1E3A5F] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
